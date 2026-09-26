import { z } from 'zod';

export const RecipeSummarySchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string().min(1),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  prepTimeMinutes: z.number().nonnegative(),
  cookTimeMinutes: z.number().nonnegative(),
  servings: z.number().positive(),
  caloriesPerServing: z.number().optional(),
  usedIngredients: z.array(z.string()),
  missingIngredients: z.array(
    z.object({
      name: z.string(),
      quantity: z.number().optional(),
      unit: z.string().optional(),
      reason: z.string().optional()
    })
  ).optional(),
  flavorProfile: z.array(z.string()).optional(),
  tasteProfile: z.array(z.string()).optional(),
  ingredients: z.array(
    z.object({
      name: z.string(),
      quantity: z.number().optional(),
      unit: z.string().optional(),
      optional: z.boolean().optional()
    })
  ).optional(),
  steps: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      instruction: z.string(),
      details: z.array(z.string()).optional(),
      heatLevel: z.string().optional(),
      timerSeconds: z.number().optional(),
      tip: z.string().optional()
    })
  ).optional(),
  swaps: z.array(
    z.object({
      ingredient: z.string(),
      alternatives: z.array(z.string())
    })
  ).optional(),
  suggestedRecipes: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string().optional(),
      prepTimeMinutes: z.number().optional()
    })
  ).optional()
});

export const GenerateRecipesResponseSchema = z.object({
  perfectMatches: z.array(RecipeSummarySchema),
  oneIngredientAway: z.array(RecipeSummarySchema).default([]),
  twoIngredientsAway: z.array(RecipeSummarySchema).default([])
});

export function validateRecipeResponse(rawData) {
  if (!rawData || typeof rawData !== 'object') {
    throw new Error('Invalid or empty response object from server');
  }
  return GenerateRecipesResponseSchema.parse(rawData);
}
