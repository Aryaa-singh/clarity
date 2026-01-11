import { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

type Stage = 'TOPIC' | 'SIMPLE' | 'PRACTICAL' | 'EXPERT' | 'REFLECTION';

export function TeachMode({ onBack }: { onBack: () => void }) {
    const [stage, setStage] = useState<Stage>('TOPIC');
    const [topic, setTopic] = useState('');
    const [explanations, setExplanations] = useState({
        simple: '',
        practical: '',
        expert: ''
    });

    const handleNext = () => {
        if (stage === 'TOPIC' && topic.trim()) setStage('SIMPLE');
        else if (stage === 'SIMPLE' && explanations.simple.trim()) setStage('PRACTICAL');
        else if (stage === 'PRACTICAL' && explanations.practical.trim()) setStage('EXPERT');
        else if (stage === 'EXPERT' && explanations.expert.trim()) setStage('REFLECTION');
    };

    const updateExplanation = (key: keyof typeof explanations, value: string) => {
        setExplanations({ ...explanations, [key]: value });
    };

    return (
        <div className="layout-container animate-slide-up" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <header className="mb-12 text-center">
                <Button variant="ghost" onClick={onBack} className="mb-4">← Back</Button>
                <h2 className="text-3xl font-bold mb-2">
                    Teach It Back
                </h2>
                <div style={{ background: 'var(--color-bg-glass)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--spacing-6)', border: '1px solid var(--color-border)' }}>
                    <p className="text-secondary text-sm">
                        Writing clarifies your thinking. If you can't explain it simply, you don't understand it well enough.
                    </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
                    {['TOPIC', 'SIMPLE', 'PRACTICAL', 'EXPERT', 'REFLECTION'].map((step, idx) => {
                        const currentIdx = ['TOPIC', 'SIMPLE', 'PRACTICAL', 'EXPERT', 'REFLECTION'].indexOf(stage);
                        const isActive = idx <= currentIdx;
                        return (
                            <div
                                key={step}
                                style={{
                                    width: '40px',
                                    height: '4px',
                                    borderRadius: '2px',
                                    background: isActive ? 'var(--color-accent)' : 'var(--color-border)',
                                    transition: 'background 0.3s ease'
                                }}
                            />
                        );
                    })}
                </div>
            </header>

            {stage === 'TOPIC' && (
                <div className="flex-col animate-slide-up text-center">
                    <h3 className="text-2xl font-bold mb-4">What do you want to clarify?</h3>
                    <Input
                        placeholder="e.g. Quantum Mechanics, or Why I'm stressed..."
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                        style={{ fontSize: 'var(--text-2xl)', padding: 'var(--spacing-6)', textAlign: 'center' }}
                    />
                    <div className="text-center mt-8">
                        <Button variant="primary" size="lg" disabled={!topic.trim()} onClick={handleNext}>Start Thinking</Button>
                    </div>
                </div>
            )}

            {(stage === 'SIMPLE' || stage === 'PRACTICAL' || stage === 'EXPERT') && (
                <div className="flex-col animate-slide-up">
                    <Card style={{ padding: 'var(--spacing-8)' }}>
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold mb-2">
                                {stage === 'SIMPLE' && "Level 1: The Layman"}
                                {stage === 'PRACTICAL' && "Level 2: The Practitioner"}
                                {stage === 'EXPERT' && "Level 3: The Master"}
                            </h3>
                            <p className="text-secondary text-lg">
                                {stage === 'SIMPLE' && `Explain "${topic}" to a 5-year-old. Use simple words.`}
                                {stage === 'PRACTICAL' && `Explain how "${topic}" actually works in the real world.`}
                                {stage === 'EXPERT' && `Explain the edge cases and nuance of "${topic}".`}
                            </p>
                        </div>
                        <textarea
                            className="input"
                            style={{
                                minHeight: '300px',
                                resize: 'vertical',
                                fontSize: 'var(--text-lg)',
                                lineHeight: '1.6',
                                border: 'none',
                                background: 'transparent',
                                padding: 0
                            }}
                            placeholder="Start typing..."
                            value={stage === 'SIMPLE' ? explanations.simple : stage === 'PRACTICAL' ? explanations.practical : explanations.expert}
                            onChange={(e) => updateExplanation(stage.toLowerCase() as any, e.target.value)}
                            autoFocus
                        />
                    </Card>
                    <div className="text-center mt-8">
                        <Button variant="primary" size="lg" onClick={handleNext}>
                            {stage === 'EXPERT' ? "Finish & Reflect" : "Next Level"}
                        </Button>
                    </div>
                </div>
            )}

            {stage === 'REFLECTION' && (
                <div className="flex-col animate-slide-up">
                    <h2 className="text-2xl font-bold text-center mb-8">Your Understanding of "{topic}"</h2>

                    <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <h3 className="font-bold mb-2 text-secondary uppercase tracking-wider text-sm">Level 1: Simple</h3>
                        <Card style={{ padding: 'var(--spacing-6)', background: 'var(--color-bg-subtle)' }}>
                            <p style={{ lineHeight: '1.6', fontSize: 'var(--text-lg)' }}>{explanations.simple}</p>
                        </Card>
                    </div>

                    <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <h3 className="font-bold mb-2 text-secondary uppercase tracking-wider text-sm">Level 2: Practical</h3>
                        <Card style={{ padding: 'var(--spacing-6)', background: 'var(--color-bg-subtle)' }}>
                            <p style={{ lineHeight: '1.6', fontSize: 'var(--text-lg)' }}>{explanations.practical}</p>
                        </Card>
                    </div>

                    <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        <h3 className="font-bold mb-2 text-secondary uppercase tracking-wider text-sm">Level 3: Expert</h3>
                        <Card style={{ padding: 'var(--spacing-6)', background: 'var(--color-bg-subtle)' }}>
                            <p style={{ lineHeight: '1.6', fontSize: 'var(--text-lg)' }}>{explanations.expert}</p>
                        </Card>
                    </div>

                    <div className="text-center mt-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                        <p className="text-secondary mb-4">Do you see gaps in your knowledge? If so, go back and research.</p>
                        <Button variant="secondary" onClick={() => window.location.reload()}>Finish</Button>
                    </div>
                </div>
            )}
        </div>
    );
}
