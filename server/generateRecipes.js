import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.post('/api/generate-recipes', async (req, res) => {
  try {
    const { ingredients = [], tastePreferences = [], freeTextPreference = '' } = req.body;

    if (ingredients.length === 0) {
      return res.status(400).json({ error: 'Please select at least one ingredient.' });
    }

    const ingredientNames = ingredients.map((i) => `${i.name} (${i.quantity || 100}${i.unit || 'g'})`).join(', ');

    if (GROQ_API_KEY && GROQ_API_KEY !== 'your_groq_api_key_here') {
      const prompt = `You are a world-class executive chef. Produce a deeply detailed JSON recipe response for these available kitchen ingredients:
Available Ingredients: ${ingredientNames}
Taste Preferences: ${tastePreferences.join(', ')}
Special Cravings/Intent: ${freeTextPreference}

IMPORTANT: Respond ONLY with a valid, parsed JSON object matching this structure (no markdown code blocks, no conversational preamble):
{
  "perfectMatches": [
    {
      "id": "pm1",
      "name": "Exact Recipe Name",
      "description": "Comprehensive explanation of flavor profile, texture, and why this recipe fits their craving.",
      "difficulty": "easy",
      "prepTimeMinutes": 10,
      "cookTimeMinutes": 15,
      "servings": 2,
      "caloriesPerServing": 350,
      "flavorProfile": ["Crispy", "Savory", "Tangy"],
      "usedIngredients": ["potato", "onion"],
      "ingredients": [
        {"name": "Potato", "quantity": 300, "unit": "g", "optional": false},
        {"name": "Onion", "quantity": 1, "unit": "pcs", "optional": false}
      ],
      "steps": [
        {
          "id": 1,
          "title": "Prep & Chop",
          "instruction": "Detailed instruction step 1.",
          "details": ["Specific technique tip", "Safety or moisture removal advice"],
          "heatLevel": "Medium Flame",
          "timerSeconds": 120,
          "tip": "Chef tip for ideal crispiness."
        }
      ],
      "swaps": [
        {"ingredient": "Onion", "alternatives": ["Shallots", "Leeks", "Spring Onion"]}
      ],
      "suggestedRecipes": [
        {
          "id": "sug1",
          "name": "Complementary Side Dish Name",
          "description": "Quick description of why to try this next",
          "prepTimeMinutes": 8
        }
      ]
    }
  ],
  "oneIngredientAway": [],
  "twoIngredientsAway": []
}`;

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-20b',
          messages: [{ role: 'user', content: prompt }],
          response_format: { type: 'json_object' },
        }),
      });

      if (!response.ok) {
        throw new Error(`Groq API returned status ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      return res.json(JSON.parse(content));
    }

    // Detailed Mock Response (when offline or fallback)
    const primaryIngredient = ingredients[0]?.name || 'Veggie';
    const secondaryIngredient = ingredients[1]?.name || 'Onion';

    const mockResponse = {
      perfectMatches: [
        {
          id: 'pm-1',
          name: `Crispy ${primaryIngredient} & ${secondaryIngredient} Skillet`,
          description: `A masterfully seasoned, golden-crisp skillet dish featuring fresh ${ingredientNames}. The combination delivers a satisfying crunch on the outside with a soft, rich interior, perfectly balanced by tangy spices.`,
          difficulty: 'easy',
          prepTimeMinutes: 10,
          cookTimeMinutes: 15,
          servings: 2,
          caloriesPerServing: 320,
          flavorProfile: tastePreferences.length > 0 ? tastePreferences : ['Crispy', 'Savory', 'Aromatic'],
          usedIngredients: ingredients.map((i) => i.name.toLowerCase()),
          ingredients: ingredients.map((i) => ({
            name: i.name,
            quantity: i.quantity || 150,
            unit: i.unit || 'g',
          })),
          steps: [
            {
              id: 1,
              title: `Precision Cut & Wash`,
              instruction: `Wash ${primaryIngredient} thoroughly. Dice into uniform 1/2-inch cubes to ensure even cooking throughout.`,
              details: [
                'Keep cube sizes consistent so they crisp at the exact same rate.',
                'Pat dry thoroughly with a paper towel; moisture prevents a golden crust from forming.'
              ],
              heatLevel: 'Prep Stage',
              timerSeconds: 180,
              tip: 'Dry ingredients sear faster and absorb less oil.'
            },
            {
              id: 2,
              title: 'Sauté & Temper Spices',
              instruction: `Heat 1 tbsp oil in a heavy-bottomed skillet over medium heat. Sauté ${secondaryIngredient} until translucent, then toss in spices.`,
              details: [
                'Stir continuously for 60 seconds to release aromatic essential oils.',
                'Do not let garlic or delicate spices burn.'
              ],
              heatLevel: 'Medium Heat',
              timerSeconds: 240,
              tip: 'A heavy skillet retains heat evenly for consistent searing.'
            },
            {
              id: 3,
              title: 'Sear & Crisp to Perfection',
              instruction: `Add ${primaryIngredient} cubes in a single layer. Let sizzle undisturbed for 3-4 minutes before flipping to achieve a crunchy golden exterior.`,
              details: [
                'Resist moving the pan constantly so a crust develops.',
                'Finish with a pinch of sea salt and fresh herbs.'
              ],
              heatLevel: 'Medium-High Heat',
              timerSeconds: 300,
              tip: 'Undisturbed contact with hot iron builds caramelization.'
            }
          ],
          swaps: [
            {
              ingredient: secondaryIngredient,
              alternatives: ['Shallots', 'Leeks', 'Spring Onions']
            },
            {
              ingredient: 'Oil',
              alternatives: ['Butter', 'Ghee', 'Avocado Oil']
            }
          ],
          suggestedRecipes: [
            {
              id: 'sug-1',
              name: `Garlic Roasted ${primaryIngredient} Bites`,
              description: 'Oven-roasted with crushed garlic and rosemary for a rustic side.',
              prepTimeMinutes: 8
            },
            {
              id: 'sug-2',
              name: `Spicy ${primaryIngredient} Pan Fry`,
              description: 'Tossed in chili oil and lime juice for an energetic kick.',
              prepTimeMinutes: 12
            }
          ]
        }
      ],
      oneIngredientAway: [
        {
          id: 'one-1',
          name: `Cheesy Melted ${primaryIngredient} Bake`,
          description: `An indulgent oven-baked casserole featuring ${ingredientNames} smothered under a layer of golden melted cheese.`,
          difficulty: 'medium',
          prepTimeMinutes: 12,
          cookTimeMinutes: 20,
          servings: 2,
          caloriesPerServing: 450,
          flavorProfile: ['Creamy', 'Cheesy', 'Comforting'],
          usedIngredients: ingredients.map((i) => i.name.toLowerCase()),
          missingIngredients: [{ name: 'Cheese', quantity: 100, unit: 'g', reason: 'Provides a rich, creamy melted crust' }],
          ingredients: [
            ...ingredients.map((i) => ({ name: i.name, quantity: i.quantity || 150, unit: i.unit || 'g' })),
            { name: 'Cheese', quantity: 100, unit: 'g' }
          ],
          steps: [
            { id: 1, title: 'Preheat & Layer', instruction: 'Preheat oven to 200°C (400°F). Layer vegetables in a shallow baking dish.' },
            { id: 2, title: 'Bake & Melt', instruction: 'Top generously with shredded cheese and bake for 15 minutes until bubbly.' }
          ],
          suggestedRecipes: [
            {
              id: 'sug-3',
              name: `Creamy Herb ${primaryIngredient} Bake`,
              description: 'Infused with heavy cream and fresh thyme.',
              prepTimeMinutes: 10
            }
          ]
        }
      ],
      twoIngredientsAway: []
    };

    return res.json(mockResponse);
  } catch (error) {
    console.error('Error in /api/generate-recipes:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Tell Express to serve the built static production folder from Vite
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route to redirect users back to index.html if they click around tabs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


// ==========================================
// ⚙️ 3. LEAVE THE APP LISTEN FUNCTION AT THE END
// ==========================================
app.listen(PORT, () => {
  console.log(`AI Chef Quest Server running on port ${PORT}`);
});
