import { validateRecipeResponse } from './validateRecipe';
import { normalizeRecipeData } from './normalizeData';

/**
 * Frontend API client to talk to the backend proxy.
 */
export async function generateRecipesApi(payload, signal) {
  const response = await fetch('/api/generate-recipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    signal,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
  }

  const rawJson = await response.json();
  
  // Step 1: Validate Schema
  const validated = validateRecipeResponse(rawJson);
  
  // Step 2: Normalize
  return normalizeRecipeData(validated);
}
