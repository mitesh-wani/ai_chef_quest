import React from 'react';
import { RecipeCard } from './RecipeCard';

export function RecipeSection({ title, subtitle, recipes, onSelectRecipe, badgeText }) {
  if (!recipes || recipes.length === 0) return null;

  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '20px', color: 'var(--text-main)' }}>{title}</h2>
        {subtitle && <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{subtitle}</p>}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '16px',
        }}
      >
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onSelect={onSelectRecipe}
            badgeText={badgeText}
          />
        ))}
      </div>
    </div>
  );
}
