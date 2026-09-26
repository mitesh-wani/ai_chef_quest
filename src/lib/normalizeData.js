/**
 * Normalizes raw recipe data after validation to sanitize strings and defaults
 */
export function normalizeRecipeData(data) {
  if (!data) return { perfectMatches: [], oneIngredientAway: [], twoIngredientsAway: [] };

  const normalizeList = (list) =>
    (list || []).map((recipe, index) => ({
      ...recipe,
      id: recipe.id || `recipe-${index}-${Date.now()}`,
      usedIngredients: (recipe.usedIngredients || []).map(i => i.toLowerCase().trim()),
      tasteProfile: (recipe.tasteProfile || []).map(t => t.toLowerCase().trim()),
      difficulty: recipe.difficulty || 'medium',
      servings: Number(recipe.servings) || 2,
      prepTimeMinutes: Number(recipe.prepTimeMinutes) || 10,
      cookTimeMinutes: Number(recipe.cookTimeMinutes) || 15,
    }));

  return {
    perfectMatches: normalizeList(data.perfectMatches),
    oneIngredientAway: normalizeList(data.oneIngredientAway),
    twoIngredientsAway: normalizeList(data.twoIngredientsAway),
  };
}
