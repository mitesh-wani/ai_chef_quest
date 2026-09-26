import { useState, useRef } from 'react';
import { generateRecipesApi } from '../lib/api';

export function useRecipeGeneration() {
  const [recipeData, setRecipeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // requestId guard to prevent race conditions & stale responses (Section 16.6)
  const requestIdRef = useRef(0);
  const abortControllerRef = useRef(null);

  const generateRecipes = async (ingredients, tastePreferences, freeTextPreference) => {
    // Increment request ID
    const currentRequestId = ++requestIdRef.current;

    // Abort previous pending request if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setLoading(true);
    setError(null);

    try {
      const payload = {
        ingredients: ingredients.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          unit: item.unit,
        })),
        tastePreferences,
        freeTextPreference,
      };

      const result = await generateRecipesApi(payload, abortController.signal);

      // Verify request ID match before mutating state
      if (currentRequestId === requestIdRef.current) {
        setRecipeData(result);
        setLoading(false);
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        // Silently discard aborted requests
        return;
      }
      if (currentRequestId === requestIdRef.current) {
        setError(err.message || 'We could not generate recipes right now.');
        setLoading(false);
      }
    }
  };

  const resetRecipeData = () => {
    setRecipeData(null);
    setError(null);
    setLoading(false);
  };

  return {
    recipeData,
    loading,
    error,
    generateRecipes,
    resetRecipeData,
  };
}
