import React from 'react';

export function CompletionScreen({ totalXp, recipeName, onCookAgain, onNewRecipe }) {
  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', textAlign: 'center', background: 'var(--bg-card)', padding: '32px', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>
      <div style={{ fontSize: '64px', marginBottom: '12px' }}>🏆</div>
      <h1 style={{ fontSize: '26px', marginBottom: '8px' }}>Recipe Completed!</h1>
      <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px' }}>
        You successfully cooked <strong>{recipeName}</strong>!
      </p>

      <div style={{ background: 'var(--accent-light)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '24px' }}>
        <div style={{ fontSize: '14px', color: 'var(--accent)', fontWeight: 'bold' }}>EARNED REWARD</div>
        <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--accent)' }}>+{totalXp} XP</div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>🔥 Master Chef Bonus Active</div>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={onCookAgain}
          style={{ flex: 1, padding: '12px', borderRadius: 'var(--radius-pill)', border: '1.5px solid var(--border-color)', background: 'var(--bg-main)', fontWeight: 'bold' }}
        >
          Cook Again
        </button>
        <button
          onClick={onNewRecipe}
          style={{ flex: 1, padding: '12px', borderRadius: 'var(--radius-pill)', background: 'var(--accent)', color: 'white', fontWeight: 'bold', boxShadow: 'var(--shadow-accent)' }}
        >
          New Recipe
        </button>
      </div>
    </div>
  );
}
