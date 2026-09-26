import React, { useState } from 'react';
import { useIngredients } from './hooks/useIngredients';
import { useRecipeGeneration } from './hooks/useRecipeGeneration';

import { IngredientGallery } from './components/IngredientGallery';
import { IngredientBasket } from './components/IngredientBasket';
import { PreferenceChips } from './components/PreferenceChips';
import { PreferenceInput } from './components/PreferenceInput';
import { RecipeSection } from './components/RecipeSection';
import { RecipeDetail } from './components/RecipeDetail';
import { CookingMode } from './components/CookingMode';
import { CompletionScreen } from './components/CompletionScreen';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';

export default function App() {
  // Navigation View State: 'select' | 'discovery' | 'detail' | 'cooking' | 'completion'
  const [currentView, setCurrentView] = useState('select');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [finalXp, setFinalXp] = useState(0);

  const {
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
    availableTastes,
  } = useIngredients();

  const { recipeData, loading, error, generateRecipes, resetRecipeData } = useRecipeGeneration();

  const handleDragStart = (e, ingredient) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(ingredient));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    try {
      const ingredient = JSON.parse(e.dataTransfer.getData('text/plain'));
      if (ingredient && !selectedIngredients.some((i) => i.id === ingredient.id)) {
        toggleIngredient(ingredient);
      }
    } catch (err) {
      // Ignore invalid drag data
    }
  };

  const handleGenerateRecipes = async () => {
    await generateRecipes(selectedIngredients, tastePreferences, freeTextPreference);
    setCurrentView('discovery');
  };

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setCurrentView('detail');
  };

  const handleStartCooking = () => {
    setCurrentView('cooking');
  };

  const handleFinishCooking = (xpEarned) => {
    setFinalXp(xpEarned);
    setCurrentView('completion');
  };

  const handleResetAll = () => {
    resetRecipeData();
    setSelectedRecipe(null);
    setCurrentView('select');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar Header */}
      <header
        style={{
          background: 'var(--bg-card)',
          borderBottom: '1px solid var(--border-color)',
          padding: '14px 20px',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={handleResetAll}>
            <span style={{ fontSize: '28px' }}>🍳</span>
            <div>
              <h1 style={{ fontSize: '20px', lineHeight: '1' }}>AI Chef Quest</h1>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Fridge-to-Recipe Experience</span>
            </div>
          </div>

          {currentView !== 'select' && (
            <button
              onClick={handleResetAll}
              style={{
                fontSize: '13px',
                fontWeight: '600',
                padding: '6px 14px',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-main)',
              }}
            >
              🔄 Start Over
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '20px 16px' }}>
        {/* VIEW 1: INGREDIENT SELECTION */}
        {currentView === 'select' && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '24px' }}>What's in your kitchen?</h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Select ingredients, adjust weights, pick your cravings, and generate recipes!
              </p>
            </div>

            {/* Responsive Layout Container */}
            <div className="main-layout-container" style={{ display: 'flex', gap: '28px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
              {/* Left Column (Main Gallery & Inputs) */}
              <div style={{ flex: '1 1 550px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <PreferenceChips
                  availableTastes={availableTastes}
                  selectedTastes={tastePreferences}
                  onToggle={toggleTastePreference}
                />

                <PreferenceInput
                  value={freeTextPreference}
                  onChange={setFreeTextPreference}
                />

                <IngredientGallery
                  filteredCatalog={filteredCatalog}
                  selectedIngredients={selectedIngredients}
                  onToggle={toggleIngredient}
                  onAddCustom={addCustomIngredient}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  onDragStart={handleDragStart}
                />
              </div>

              {/* Right Column (Basket Sticky Sidebar) */}
              <div className="basket-sidebar" style={{ width: '350px', flexShrink: 0, position: 'sticky', top: '80px' }}>
                <IngredientBasket
                  selectedIngredients={selectedIngredients}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeIngredient}
                  onDrop={handleDrop}
                  onGenerate={handleGenerateRecipes}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: RECIPE DISCOVERY */}
        {currentView === 'discovery' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setCurrentView('select')}
                style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-muted)' }}
              >
                ← Edit Ingredients
              </button>
              <span style={{ color: 'var(--border-color)' }}>|</span>
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                Showing recipes for {selectedIngredients.length} ingredients
              </span>
            </div>

            {loading && <LoadingState />}

            {error && <ErrorState error={error} onRetry={handleGenerateRecipes} />}

            {!loading && !error && recipeData && (
              <div>
                <RecipeSection
                  title="✨ Perfect Match"
                  subtitle="Recipes you can make right now with your selected ingredients"
                  recipes={recipeData.perfectMatches}
                  onSelectRecipe={handleSelectRecipe}
                  badgeText="Perfect Match"
                />

                <RecipeSection
                  title="🛒 Add 1 Ingredient"
                  subtitle="Unlock more recipes with just one extra ingredient"
                  recipes={recipeData.oneIngredientAway}
                  onSelectRecipe={handleSelectRecipe}
                  badgeText="+1 Ingredient"
                />

                <RecipeSection
                  title="💡 Add 2 Ingredients"
                  subtitle="Secondary options requiring two additional items"
                  recipes={recipeData.twoIngredientsAway}
                  onSelectRecipe={handleSelectRecipe}
                  badgeText="+2 Ingredients"
                />
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: RECIPE DETAIL */}
        {currentView === 'detail' && selectedRecipe && (
          <RecipeDetail
            recipe={selectedRecipe}
            onBack={() => setCurrentView('discovery')}
            onStartCooking={handleStartCooking}
            onSelectSuggested={(sugRecipe) => {
              setSelectedRecipe({
                ...selectedRecipe,
                id: sugRecipe.id,
                name: sugRecipe.name,
                description: sugRecipe.description || selectedRecipe.description,
              });
            }}
          />
        )}

        {/* VIEW 4: COOKING MODE */}
        {currentView === 'cooking' && selectedRecipe && (
          <CookingMode
            recipe={selectedRecipe}
            onCompleteAll={handleFinishCooking}
          />
        )}

        {/* VIEW 5: COMPLETION */}
        {currentView === 'completion' && selectedRecipe && (
          <CompletionScreen
            totalXp={finalXp}
            recipeName={selectedRecipe.name}
            onCookAgain={() => setCurrentView('cooking')}
            onNewRecipe={handleResetAll}
          />
        )}
      </main>
    </div>
  );
}
