import React, { useState } from 'react';
import { IngredientCard } from './IngredientCard';
import { INGREDIENT_CATEGORIES } from '../data/ingredients';
import './IngredientGallery.css';

export function IngredientGallery({
  filteredCatalog,
  selectedIngredients,
  onToggle,
  onAddCustom,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onDragStart,
}) {
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  // Duplicate catalog items for infinite smooth marquee looping
  const marqueeItems = [...filteredCatalog, ...filteredCatalog];

  const handleAddFromSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onAddCustom(searchQuery.trim());
      onSearchChange('');
    }
  };

  return (
    <div className="ingredient-gallery-container">
      {/* Category Rail */}
      <div className="category-rail">
        {INGREDIENT_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`category-btn ${isActive ? 'active' : ''}`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Search Bar & Dynamic "Add to Basket" Action Button positioned directly above Marquee */}
      <form onSubmit={handleAddFromSearch} style={{ display: 'flex', gap: '8px', width: '100%' }}>
        <input
          type="text"
          placeholder="🔍 Search or type ingredient (e.g. Potato, Truffle Oil, Avocado)..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
          style={{ flex: 1 }}
        />
        {searchQuery.trim() !== '' && (
          <button
            type="submit"
            style={{
              background: 'var(--accent)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '13px',
              padding: '10px 18px',
              borderRadius: 'var(--radius-pill)',
              whiteSpace: 'nowrap',
              boxShadow: 'var(--shadow-accent)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            ➕ Add "{searchQuery.trim()}" to Basket
          </button>
        )}
      </form>

      {/* Moving Marquee Container */}
      <div
        className={`marquee-wrapper ${isMarqueePaused ? 'paused' : ''}`}
        onMouseEnter={() => setIsMarqueePaused(true)}
        onMouseLeave={() => setIsMarqueePaused(false)}
      >
        <div className="marquee-track">
          {marqueeItems.map((item, index) => {
            const isSelected = selectedIngredients.some((i) => i.id === item.id);
            return (
              <IngredientCard
                key={`${item.id}-${index}`}
                ingredient={item}
                isSelected={isSelected}
                onToggle={onToggle}
                onDragStart={onDragStart}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
