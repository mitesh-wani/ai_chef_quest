import React, { useState, useEffect } from 'react';
import './CookingStep.css';

export function CookingStep({ step, index, isActive, isCompleted, onCompleteStep }) {
  const [expanded, setExpanded] = useState(isActive);
  const [timeLeft, setTimeLeft] = useState(step.timerSeconds || 0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={`cooking-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: isCompleted ? '#22c55e' : isActive ? 'var(--accent)' : 'var(--border-color)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isCompleted ? '✓' : index + 1}
          </span>
          <h4 style={{ fontSize: '15px', fontWeight: '600' }}>{step.title}</h4>
        </div>
        <span>{expanded ? '▲' : '▼'}</span>
      </div>

      {expanded && (
        <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
          <p style={{ fontSize: '14px', marginBottom: '8px', color: 'var(--text-main)' }}>
            {step.instruction}
          </p>

          {step.details && step.details.length > 0 && (
            <ul style={{ fontSize: '13px', color: 'var(--text-muted)', paddingLeft: '20px', marginBottom: '12px' }}>
              {step.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          )}

          {step.tip && (
            <div style={{ fontSize: '12px', background: 'var(--accent-light)', color: 'var(--accent)', padding: '8px 12px', borderRadius: 'var(--radius-sm)', marginBottom: '12px' }}>
              💡 <strong>Tip:</strong> {step.tip}
            </div>
          )}

          {step.timerSeconds && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'monospace' }}>
                ⏱️ {formatTime(timeLeft)}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setTimerRunning(!timerRunning);
                }}
                style={{
                  background: timerRunning ? '#ef4444' : 'var(--accent)',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                {timerRunning ? 'Pause Timer' : 'Start Timer'}
              </button>
            </div>
          )}

          {!isCompleted && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCompleteStep(index);
              }}
              style={{
                width: '100%',
                background: 'var(--accent)',
                color: 'white',
                padding: '10px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '14px',
                fontWeight: 'bold',
                boxShadow: 'var(--shadow-accent)',
              }}
            >
              ✓ Complete Step (+20 XP)
            </button>
          )}
        </div>
      )}
    </div>
  );
}
