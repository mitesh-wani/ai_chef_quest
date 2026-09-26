import React, { useState } from 'react';
import { IngredientList } from './IngredientList';
import { ServingScaler } from './ServingScaler';
import { SwapSelector } from './SwapSelector';

export function RecipeDetail({ recipe, onBack, onStartCooking, onSelectSuggested }) {
  const [servings, setServings] = useState(recipe.servings || 2);

  // Derive detailed ingredients
  const detailIngredients = recipe.ingredients || (recipe.usedIngredients || []).map((name) => ({
    name,
    quantity: 100,
    unit: 'g',
  }));

  const flavorTags = recipe.flavorProfile || recipe.tasteProfile || ['Crispy', 'Delicious', 'Homemade'];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Back Button */}
      <button
        onClick={onBack}
        style={{
          alignSelf: 'flex-start',
          fontSize: '14px',
          fontWeight: '600',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'var(--bg-card)',
          padding: '6px 14px',
          borderRadius: 'var(--radius-pill)',
          border: '1px solid var(--border-color)',
        }}
      >
        ← Back to Discovery
      </button>

      {/* Hero Food Image Showcase */}
      <div
        style={{
          position: 'relative',
          height: '260px',
          borderRadius: 'var(--radius-lg)',
          background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '80px',
          boxShadow: 'var(--shadow-md)',
          overflow: 'hidden',
        }}
      >
        <span>🍱</span>
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            display: 'flex',
            gap: '8px',
          }}
        >
          {flavorTags.map((tag, idx) => (
            <span
              key={idx}
              style={{
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold',
                padding: '4px 12px',
                borderRadius: 'var(--radius-pill)',
                backdropFilter: 'blur(4px)',
              }}
            >
              ✨ {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Title & Servings Scaler */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '28px', marginBottom: '8px', color: 'var(--text-main)' }}>{recipe.name}</h1>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: 'var(--text-muted)' }}>{recipe.description}</p>
        </div>
        <ServingScaler servings={servings} onServingsChange={setServings} />
      </div>

      {/* Key Stats Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '12px',
          background: 'var(--bg-card)',
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          border: '1.5px solid var(--border-color)',
          textAlign: 'center',
        }}
      >
        <div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>PREP TIME</span>
          <div style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '2px' }}>⏱️ {recipe.prepTimeMinutes || 10} mins</div>
        </div>
        <div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>COOK TIME</span>
          <div style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '2px' }}>🔥 {recipe.cookTimeMinutes || 15} mins</div>
        </div>
        <div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>DIFFICULTY</span>
          <div style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '2px', textTransform: 'capitalize' }}>⭐ {recipe.difficulty || 'Easy'}</div>
        </div>
        <div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>CALORIES</span>
          <div style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '2px' }}>⚡ {recipe.caloriesPerServing || 350} kcal</div>
        </div>
      </div>

      {/* Detailed Ingredients Checklist */}
      <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-color)' }}>
        <IngredientList
          ingredients={detailIngredients}
          baseServings={recipe.servings || 2}
          currentServings={servings}
        />
      </div>

      {/* Detailed Cooking Steps Breakdown */}
      {recipe.steps && recipe.steps.length > 0 && (
        <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>📖 Detailed Cooking Procedure</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recipe.steps.map((step, idx) => (
              <div
                key={idx}
                style={{
                  padding: '14px',
                  background: 'var(--bg-main)',
                  borderRadius: 'var(--radius-sm)',
                  borderLeft: '4px solid var(--accent)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 'bold' }}>
                    Step {idx + 1}: {step.title}
                  </h4>
                  {step.heatLevel && (
                    <span style={{ fontSize: '12px', background: 'var(--accent-light)', color: 'var(--accent)', padding: '2px 8px', borderRadius: 'var(--radius-pill)', fontWeight: 'bold' }}>
                      🔥 {step.heatLevel}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '14px', marginBottom: '8px', color: 'var(--text-main)' }}>{step.instruction}</p>
                {step.details && (
                  <ul style={{ fontSize: '13px', color: 'var(--text-muted)', paddingLeft: '20px', marginBottom: '8px' }}>
                    {step.details.map((d, dIdx) => (
                      <li key={dIdx}>{d}</li>
                    ))}
                  </ul>
                )}
                {step.tip && (
                  <div style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: '600' }}>
                    💡 <strong>Chef Tip:</strong> {step.tip}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ingredient Swaps */}
      {recipe.swaps && <SwapSelector swaps={recipe.swaps} />}

      {/* Start Cooking CTA Button */}
      <div>
        <button
          onClick={onStartCooking}
          style={{
            width: '100%',
            background: 'var(--accent)',
            color: 'white',
            fontWeight: '800',
            fontSize: '17px',
            padding: '16px',
            borderRadius: 'var(--radius-pill)',
            boxShadow: 'var(--shadow-accent)',
          }}
        >
          🚀 Start Interactive Cooking Mode
        </button>
      </div>

      {/* Suggested Other Recipes Section */}
      {recipe.suggestedRecipes && recipe.suggestedRecipes.length > 0 && (
        <div style={{ marginTop: '16px', background: 'var(--bg-card)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '4px' }}>💡 You Might Also Like</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Try these complementary variations crafted for your ingredient list:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
            {recipe.suggestedRecipes.map((sug, idx) => (
              <div
                key={idx}
                onClick={() => onSelectSuggested && onSelectSuggested(sug)}
                style={{
                  padding: '14px',
                  background: 'var(--bg-main)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, border-color 0.2s ease',
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '6px' }}>🍳</div>
                <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>{sug.name}</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {sug.description}
                </p>
                <span style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 'bold' }}>
                  Explore Recipe →
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
