import React, { useState } from 'react';

export function IngredientList({ ingredients, baseServings, currentServings }) {
  const [checkedMap, setCheckedMap] = useState({});

  const scaleFactor = currentServings / (baseServings || 1);

  const toggleCheck = (idx) => {
    setCheckedMap((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div style={{ marginBottom: '24px' }}>
      <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>Ingredients</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {ingredients.map((ing, idx) => {
          const scaledQty = ing.quantity ? Math.round(ing.quantity * scaleFactor * 10) / 10 : null;
          const isChecked = checkedMap[idx];

          return (
            <label
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                background: isChecked ? 'var(--bg-main)' : 'var(--bg-card)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                opacity: isChecked ? 0.6 : 1,
                textDecoration: isChecked ? 'line-through' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  checked={!!isChecked}
                  onChange={() => toggleCheck(idx)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--accent)' }}
                />
                <span style={{ fontWeight: '500', fontSize: '14px' }}>{ing.name}</span>
              </div>
              {scaledQty && (
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--accent)' }}>
                  {scaledQty} {ing.unit}
                </span>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}
