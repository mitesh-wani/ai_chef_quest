import React, { useState } from 'react';
import { CookingStep } from './CookingStep';
import { ProgressBar } from './ProgressBar';

export function CookingMode({ recipe, onCompleteAll }) {
  const steps = recipe.steps || [
    { title: 'Prepare Ingredients', instruction: 'Wash, chop, and organize all ingredients.' },
    { title: 'Cook', instruction: 'Follow basic heat instructions until cooked through.' },
    { title: 'Serve', instruction: 'Plate up and enjoy your dish!' },
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [xp, setXp] = useState(0);

  const handleCompleteStep = (index) => {
    if (!completedSteps.includes(index)) {
      const newCompleted = [...completedSteps, index];
      setCompletedSteps(newCompleted);
      setXp((prev) => prev + 20);

      if (index + 1 < steps.length) {
        setCurrentStepIndex(index + 1);
      } else {
        // Complete full recipe!
        onCompleteAll(xp + 120);
      }
    }
  };

  const progressPercent = Math.round((completedSteps.length / steps.length) * 100);

  return (
    <div style={{ maxWidth: '650px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--accent)', textTransform: 'uppercase' }}>
            Cooking Mode
          </span>
          <h2 style={{ fontSize: '22px' }}>{recipe.name}</h2>
        </div>
        <div style={{ background: 'var(--accent-light)', padding: '6px 14px', borderRadius: 'var(--radius-pill)', color: 'var(--accent)', fontWeight: 'bold', fontSize: '14px' }}>
          ⭐ {xp} XP
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <ProgressBar progress={progressPercent} label={`Step ${completedSteps.length} of ${steps.length} completed`} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {steps.map((step, idx) => (
          <CookingStep
            key={idx}
            step={step}
            index={idx}
            isActive={currentStepIndex === idx}
            isCompleted={completedSteps.includes(idx)}
            onCompleteStep={handleCompleteStep}
          />
        ))}
      </div>
    </div>
  );
}
