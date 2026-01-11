
import { Card } from '../../components/Card';

export type AppMode = 'LANDING' | 'FILTER' | 'DECISION' | 'TEACH';

interface LandingViewProps {
    onSelectMode: (mode: AppMode) => void;
}

export function LandingView({ onSelectMode }: LandingViewProps) {
    return (
        <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)' }}>
            <header className="text-center">
                <div style={{
                    display: 'inline-block',
                    padding: 'var(--spacing-2) var(--spacing-4)',
                    backgroundColor: 'var(--color-accent-soft)',
                    color: 'var(--color-accent)',
                    borderRadius: '20px',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-weight-bold)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: 'var(--spacing-6)'
                }}>
                    The Art of Focus
                </div>
                <h1 style={{
                    fontSize: 'clamp(var(--text-3xl), 8vw, var(--text-4xl))',
                    fontWeight: 'var(--font-weight-bold)',
                    lineHeight: '1.1',
                    marginBottom: 'var(--spacing-4)',
                    color: 'var(--color-text-primary)'
                }}>
                    Structure reduces <br /> mental noise.
                </h1>
                <p style={{
                    color: 'var(--color-text-secondary)',
                    maxWidth: '500px',
                    margin: '0 auto',
                    fontSize: 'var(--text-lg)'
                }}>
                    Three simple ways to clear your path and focus on what truly matters.
                </p>
            </header>

            <div style={{
                display: 'grid',
                gap: 'var(--spacing-6)',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                paddingBottom: 'var(--spacing-12)'
            }}>
                <Card
                    className="mode-card animate-slide-up"
                    style={{ animationDelay: '100ms', cursor: 'pointer' }}
                    onClick={() => onSelectMode('FILTER')}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', height: '100%' }}>
                        <div style={{ fontSize: 'var(--text-2xl)' }}>🧘‍♂️</div>
                        <div>
                            <h2 className="text-xl font-bold">What Actually Matters?</h2>
                            <p className="text-secondary" style={{ lineHeight: '1.6' }}>
                                Overwhelmed by tasks or worries? Filter them down to the essential few.
                            </p>
                        </div>
                    </div>
                </Card>

                <Card
                    className="mode-card animate-slide-up"
                    style={{ animationDelay: '200ms', cursor: 'pointer' }}
                    onClick={() => onSelectMode('DECISION')}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', height: '100%' }}>
                        <div style={{ fontSize: 'var(--text-2xl)' }}>⚖️</div>
                        <div>
                            <h2 className="text-xl font-bold">Decision Decomposer</h2>
                            <p className="text-secondary" style={{ lineHeight: '1.6' }}>
                                Break down complex choices into clear criteria and options.
                            </p>
                        </div>
                    </div>
                </Card>

                <Card
                    className="mode-card animate-slide-up"
                    style={{ animationDelay: '300ms', cursor: 'pointer' }}
                    onClick={() => onSelectMode('TEACH')}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', height: '100%' }}>
                        <div style={{ fontSize: 'var(--text-2xl)' }}>📖</div>
                        <div>
                            <h2 className="text-xl font-bold">Teach It Back</h2>
                            <p className="text-secondary" style={{ lineHeight: '1.6' }}>
                                The Feynman Technique. Understand anything deeply by explaining it simply.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>


        </div>
    );
}
