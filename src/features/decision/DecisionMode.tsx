import { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Slider } from '../../components/Slider';

type Phase = 'SETUP' | 'CRITERIA' | 'RATE' | 'RESULT';

interface Criteria {
    id: string;
    name: string;
    weight: number; // 1-10
}

interface Option {
    id: string;
    name: string;
    scores: Record<string, number>; // criteriaId -> score (1-10)
}

export function DecisionMode({ onBack }: { onBack: () => void }) {
    const [phase, setPhase] = useState<Phase>('SETUP');
    const [decisionName, setDecisionName] = useState('');
    const [options, setOptions] = useState<Option[]>([]);
    const [criteria, setCriteria] = useState<Criteria[]>([]);

    // Inputs
    const [tempOption, setTempOption] = useState('');
    const [tempCriteria, setTempCriteria] = useState('');

    const addOption = () => {
        if (tempOption.trim()) {
            setOptions([...options, { id: Date.now().toString(), name: tempOption.trim(), scores: {} }]);
            setTempOption('');
        }
    };

    const addCriteria = () => {
        if (tempCriteria.trim()) {
            setCriteria([...criteria, { id: Date.now().toString(), name: tempCriteria.trim(), weight: 5 }]);
            setTempCriteria('');
        }
    };

    const updateWeight = (id: string, weight: number) => {
        setCriteria(criteria.map(c => c.id === id ? { ...c, weight } : c));
    };

    const updateScore = (optionId: string, criteriaId: string, score: number) => {
        setOptions(options.map(o => {
            if (o.id === optionId) {
                return { ...o, scores: { ...o.scores, [criteriaId]: score } };
            }
            return o;
        }));
    };

    // Calculate results
    const calculateScore = (option: Option) => {
        return criteria.reduce((sum, c) => {
            const score = option.scores[c.id] || 0;
            return sum + (score * c.weight);
        }, 0);
    };

    const sortedOptions = [...options].sort((a, b) => calculateScore(b) - calculateScore(a));
    const maxScore = criteria.reduce((sum, c) => sum + (10 * c.weight), 0); // Max possible score

    return (
        <div className="layout-container animate-slide-up" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <header className="mb-8 text-center">
                <Button variant="ghost" onClick={onBack} className="mb-4">← Back</Button>
                <h2 className="text-3xl font-bold mb-2">
                    {phase === 'SETUP' && "Decompose the Decision"}
                    {phase === 'CRITERIA' && "What matters?"}
                    {phase === 'RATE' && "Evaluate Options"}
                    {phase === 'RESULT' && "The Clear Choice"}
                </h2>
                <div style={{ background: 'var(--color-bg-glass)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--spacing-6)', border: '1px solid var(--color-border)' }}>
                    <p className="text-secondary text-sm">
                        {phase === 'SETUP' && "List your options. We'll decompose them in the next step."}
                        {phase === 'CRITERIA' && "What factors are driving this choice?"}
                        {phase === 'RATE' && "Honest inputs lead to clear outputs."}
                        {phase === 'RESULT' && "The highest score reflects your stated values."}
                    </p>
                </div>
                <div style={{ height: '4px', width: '100%', background: 'var(--color-border)', borderRadius: '2px', overflow: 'hidden', marginTop: 'var(--spacing-4)' }}>
                    <div
                        style={{
                            height: '100%',
                            background: 'var(--color-text-primary)',
                            width: phase === 'SETUP' ? '25%' : phase === 'CRITERIA' ? '50%' : phase === 'RATE' ? '75%' : '100%',
                            transition: 'width 0.5s ease-out'
                        }}
                    />
                </div>
            </header>

            {phase === 'SETUP' && (
                <div className="flex-col animate-slide-up">
                    <label className="text-sm font-bold text-secondary uppercase tracking-wider">The Decision</label>
                    <Input
                        placeholder="e.g. Which job to take?"
                        value={decisionName}
                        onChange={(e) => setDecisionName(e.target.value)}
                        className="mb-8"
                        style={{ fontSize: 'var(--text-xl)', padding: 'var(--spacing-4)' }}
                        autoFocus
                    />

                    <label className="text-sm font-bold text-secondary uppercase tracking-wider">The Options</label>
                    <div className="flex-col">
                        {options.map((opt) => (
                            <Card key={opt.id} style={{ padding: 'var(--spacing-4)', display: 'flex', alignItems: 'center' }}>
                                <span className="text-lg">{opt.name}</span>
                            </Card>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Add an option (e.g. Startup A)..."
                            value={tempOption}
                            onChange={(e) => setTempOption(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addOption()}
                        />
                        <Button onClick={addOption} disabled={!tempOption.trim()}>Add</Button>
                    </div>

                    <div className="text-center mt-12">
                        <Button
                            variant="primary"
                            size="lg"
                            disabled={!decisionName.trim() || options.length < 2}
                            onClick={() => setPhase('CRITERIA')}
                        >
                            Next: Define Criteria
                        </Button>
                    </div>
                </div>
            )}

            {phase === 'CRITERIA' && (
                <div className="flex-col animate-slide-up">
                    <p className="text-secondary mb-4 text-center text-lg">
                        List the factors that include this decision, then drag to weigh their importance.
                    </p>

                    <div className="flex gap-2 mb-8">
                        <Input
                            placeholder="Add criteria (e.g. Salary, Flexible Hours)..."
                            value={tempCriteria}
                            onChange={(e) => setTempCriteria(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addCriteria()}
                        />
                        <Button onClick={addCriteria} disabled={!tempCriteria.trim()}>Add</Button>
                    </div>

                    {criteria.map((c) => (
                        <Card key={c.id} style={{ padding: 'var(--spacing-6)' }}>
                            <div className="mb-4 flex justify-between items-end">
                                <span className="text-lg font-bold">{c.name}</span>
                                <span className="text-sm text-secondary">Weight: {c.weight}</span>
                            </div>
                            <Slider
                                min={1} max={10}
                                value={c.weight}
                                onChange={(e) => updateWeight(c.id, Number(e.target.value))}
                            />
                        </Card>
                    ))}

                    <div className="text-center mt-12">
                        <Button
                            variant="primary"
                            size="lg"
                            disabled={criteria.length < 1}
                            onClick={() => setPhase('RATE')}
                        >
                            Next: Evaluate Options
                        </Button>
                    </div>
                </div>
            )}

            {phase === 'RATE' && (
                <div className="flex-col animate-slide-up">
                    <p className="text-secondary mb-8 text-center text-lg">Rate how well each option satisfies each criteria.</p>

                    {options.map((opt) => (
                        <Card key={opt.id} className="mb-8" style={{ borderLeft: '4px solid var(--color-accent)' }}>
                            <h3 className="text-2xl font-bold mb-6">{opt.name}</h3>
                            <div className="flex-col" style={{ gap: 'var(--spacing-6)' }}>
                                {criteria.map((c) => (
                                    <div key={c.id}>
                                        <div className="flex justify-between mb-2">
                                            <span className="font-medium">{c.name}</span>
                                            <span className="text-secondary text-sm">{opt.scores[c.id] || 0}/10</span>
                                        </div>
                                        <Slider
                                            min={0} max={10}
                                            value={opt.scores[c.id] || 0}
                                            onChange={(e) => updateScore(opt.id, c.id, Number(e.target.value))}
                                        />
                                    </div>
                                ))}
                            </div>
                        </Card>
                    ))}

                    <div className="text-center mt-12">
                        <Button variant="primary" size="lg" onClick={() => setPhase('RESULT')}>Reveal Decision</Button>
                    </div>
                </div>
            )}

            {phase === 'RESULT' && (
                <div className="flex-col animate-slide-up">
                    {sortedOptions.map((opt, idx) => {
                        const score = calculateScore(opt);
                        const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
                        const isWinner = idx === 0;

                        return (
                            <Card
                                key={opt.id}
                                style={{
                                    padding: 'var(--spacing-6)',
                                    border: isWinner ? '2px solid var(--color-text-primary)' : '1px solid var(--color-border)',
                                    transform: isWinner ? 'scale(1.02)' : 'scale(1)',
                                    opacity: 0,
                                    animation: `slideUp 0.5s ease-out forwards ${idx * 0.15}s`
                                }}
                            >
                                <div className="flex justify-between mb-2 items-end">
                                    <span className={isWinner ? 'text-xl font-bold' : 'text-lg font-medium'}>
                                        {isWinner && <span className="mr-2">🏆</span>}
                                        {opt.name}
                                    </span>
                                    <span className="text-lg font-bold">{Math.round(percentage)}%</span>
                                </div>
                                <div style={{ height: '12px', background: 'var(--color-bg-subtle)', borderRadius: '6px', overflow: 'hidden' }}>
                                    <div
                                        style={{
                                            height: '100%',
                                            width: '0%',
                                            background: isWinner ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
                                            transition: 'width 1s ease-out',
                                            animation: `fillBar 1s ease-out forwards ${0.5 + idx * 0.1}s`,
                                            '--target-width': `${percentage}%`
                                        } as any}
                                    />
                                </div>
                                <style>{`
                                    @keyframes fillBar {
                                        to { width: var(--target-width); }
                                    }
                                `}</style>
                            </Card>
                        );
                    })}
                    <div className="text-center mt-12 animate-slide-up" style={{ animationDelay: '0.8s' }}>
                        <Button variant="secondary" onClick={() => window.location.reload()}>Start Over</Button>
                    </div>
                </div>
            )}
        </div>
    );
}
