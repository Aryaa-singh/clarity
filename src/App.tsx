import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';

import { LandingView, type AppMode } from './features/landing/LandingView';
import { FilterMode } from './features/filter/FilterMode';
import { DecisionMode } from './features/decision/DecisionMode';
import { TeachMode } from './features/teach/TeachMode';

function useStickyState<T>(defaultValue: T, key: string): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default function App() {
  const [mode, setMode] = useStickyState<AppMode>('LANDING', 'clarity-mode');

  return (
    <Layout>
      <div style={{ padding: 'var(--spacing-8) 0' }}>
        <main style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: mode === 'LANDING' ? 'center' : 'flex-start' }}>
          {mode === 'LANDING' && (
            <LandingView onSelectMode={setMode} />
          )}

          {mode === 'FILTER' && (
            <FilterMode onBack={() => setMode('LANDING')} />
          )}

          {mode === 'DECISION' && (
            <DecisionMode onBack={() => setMode('LANDING')} />
          )}

          {mode === 'TEACH' && (
            <TeachMode onBack={() => setMode('LANDING')} />
          )}
        </main>

        <footer className="animate-slide-up" style={{
          textAlign: 'center',
          padding: 'var(--spacing-8) 0',
          opacity: 0.4,
          fontSize: 'var(--text-xs)',
          borderTop: '1px solid var(--color-border)',
          marginTop: 'var(--spacing-8)'
        }}>
          <p>100% Private. Data stored locally on your device. Open Source.</p>
        </footer>
      </div>
    </Layout>
  );
}
