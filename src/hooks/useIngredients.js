import { useState } from 'react';
import { INGREDIENTS_CATALOG, TASTE_PREFERENCES } from '../data/ingredients';

export function useIngredients() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [tastePreferences, setTastePreferences] = useState([]);
  const [freeTextPreference, setFreeTextPreference] = useState('');

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients((prev) => {
      const exists = prev.find((item) => item.id === ingredient.id);
      if (exists) {
        return prev.filter((item) => item.id !== ingredient.id);
      } else {
        return [
          ...prev,
          {
            id: ingredient.id,
            name: ingredient.name,
            quantity: ingredient.defaultQty || 100,
            unit: ingredient.defaultUnit || 'g',
            emoji: ingredient.emoji || '✨',
            isCustom: ingredient.isCustom || false,
          },
        ];
      }
    });
  };

  const addCustomIngredient = (customName) => {
    if (!customName || !customName.trim()) return;
    const trimmed = customName.trim();
    const customId = `custom-${trimmed.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;

    // Check if already in selected
    if (selectedIngredients.some((i) => i.name.toLowerCase() === trimmed.toLowerCase())) return;

    setSelectedIngredients((prev) => [
      ...prev,
      {
        id: customId,
        name: trimmed,
        quantity: 100,
        unit: 'g',
        emoji: '✨',
        isCustom: true,
      },
    ]);
  };

  const updateQuantity = (id, newQty, unit) => {
    if (newQty < 0) return;
    setSelectedIngredients((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty, unit: unit || item.unit } : item
      )
    );
  };

  const removeIngredient = (id) => {
    setSelectedIngredients((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleTastePreference = (tasteId) => {
    setTastePreferences((prev) =>
      prev.includes(tasteId)
        ? prev.filter((t) => t !== tasteId)
        : [...prev, tasteId]
    );
  };

  const filteredCatalog = INGREDIENTS_CATALOG.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return {
    selectedIngredients,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    tastePreferences,
    freeTextPreference,
    setFreeTextPreference,
    toggleIngredient,
    addCustomIngredient,
    updateQuantity,
    removeIngredient,
    toggleTastePreference,
    filteredCatalog,
    catalog: INGREDIENTS_CATALOG,
    availableTastes: TASTE_PREFERENCES,
  };
}
