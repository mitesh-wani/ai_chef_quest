import React, { useState } from 'react';
import './IngredientCard.css';

export function IngredientCard({ ingredient, isSelected, onToggle, onDragStart }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`ingredient-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onToggle(ingredient)}
      draggable
      onDragStart={(e) => onDragStart(e, ingredient)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onToggle(ingredient)}
    >
      {/* Full card background image overlay on hover */}
      {!imgError && ingredient.image ? (
        <img
          src={ingredient.image}
          alt={ingredient.name}
          className="full-card-img"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      ) : null}

      <div className="card-content">
        <div className="card-image-wrapper">
          {!imgError && ingredient.image ? (
            <img src={ingredient.image} alt={ingredient.name} className="ingredient-thumb" />
          ) : (
            <span className="ingredient-emoji">{ingredient.emoji || '🥗'}</span>
          )}
        </div>
        <div className="card-info">
          <h4 className="ingredient-name">{ingredient.name}</h4>
          <span className="ingredient-category">{ingredient.category}</span>
        </div>
        <button className="add-btn" aria-label={`Add ${ingredient.name}`}>
          {isSelected ? '✓ Added' : '+ Add'}
        </button>
      </div>

      {isSelected && <div className="selected-badge">✓</div>}
    </div>
  );
}
