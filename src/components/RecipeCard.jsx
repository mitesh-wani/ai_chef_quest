import React from 'react';

export function RecipeCard({ recipe, onSelect, badgeText }) {
  return (
    <div
      onClick={() => onSelect(recipe)}
      style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-md)',
        border: '1.5px solid var(--border-color)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          height: '140px',
          background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '48px',
          position: 'relative',
        }}
      >
        <span>🍲</span>
        {badgeText && (
          <span
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'var(--accent)',
              color: 'white',
              fontSize: '11px',
              fontWeight: 'bold',
              padding: '4px 8px',
              borderRadius: 'var(--radius-pill)',
            }}
          >
            {badgeText}
          </span>
        )}
      </div>

      <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '16px', marginBottom: '6px' }}>{recipe.name}</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {recipe.description}
          </p>
        </div>

        <div>
          <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
            <span>⏱️ {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins</span>
            <span style={{ textTransform: 'capitalize' }}>⭐ {recipe.difficulty}</span>
            <span>👥 {recipe.servings} servings</span>
          </div>

          {recipe.missingIngredients && recipe.missingIngredients.length > 0 && (
            <div style={{ fontSize: '12px', color: 'var(--accent)', background: 'var(--accent-light)', padding: '6px 10px', borderRadius: 'var(--radius-sm)', marginBottom: '10px' }}>
              Missing: {recipe.missingIngredients.map(m => m.name).join(', ')}
            </div>
          )}

          <button
            style={{
              width: '100%',
              background: 'var(--bg-main)',
              border: '1px solid var(--border-color)',
              padding: '8px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '13px',
              fontWeight: '600',
              color: 'var(--text-main)',
            }}
          >
            View Recipe →
          </button>
        </div>
      </div>
    </div>
  );
}
