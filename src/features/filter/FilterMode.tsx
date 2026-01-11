import { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

type Phase = 'INPUT' | 'SELECT' | 'RESULT';

export function FilterMode({ onBack }: { onBack: () => void }) {
    const [phase, setPhase] = useState<Phase>('INPUT');
    const [items, setItems] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleAdd = () => {
        if (inputValue.trim()) {
            setItems([...items, inputValue.trim()]);
            setInputValue('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const toggleSelection = (item: string) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter(i => i !== item));
        } else {
            if (selectedItems.length < 3) {
                setSelectedItems([...selectedItems, item]);
            }
        }
    };

    return (
        <div className="layout-container animate-slide-up" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <header className="mb-8 text-center">
                <Button variant="ghost" onClick={onBack} className="mb-4">← Back</Button>
                <h2 className="text-3xl font-bold mb-2">
                    {phase === 'INPUT' && "Capture your thoughts"}
                    {phase === 'SELECT' && "What actually matters?"}
                    {phase === 'RESULT' && "Your Focus"}
                </h2>
                <div style={{ background: 'var(--color-bg-glass)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--spacing-6)', border: '1px solid var(--color-border)' }}>
                    <p className="text-secondary text-sm">
                        {phase === 'INPUT' && "Get everything out of your head. Don't worry about order yet."}
                        {phase === 'SELECT' && "Select the 3 items that will truly move the needle today."}
                        {phase === 'RESULT' && "This is your contract with yourself. Ignore the rest."}
                    </p>
                </div>
            </header>

            {phase === 'INPUT' && (
                <>
                    <div className="flex-col mb-8">
                        <div style={{ display: 'flex', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-6)' }}>
                            <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Add a task, worry, or idea..."
                                autoFocus
                                style={{ fontSize: 'var(--text-lg)', padding: 'var(--spacing-4)' }}
                            />
                            <Button onClick={handleAdd} disabled={!inputValue.trim()}>Add</Button>
                        </div>

                        {items.map((item, idx) => (
                            <div key={idx} className="animate-slide-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                                <Card className="flex justify-between items-center" style={{ padding: 'var(--spacing-4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span className="text-lg">{item}</span>
                                    <button
                                        onClick={() => removeItem(idx)}
                                        style={{
                                            color: 'var(--color-text-tertiary)',
                                            cursor: 'pointer',
                                            padding: 'var(--spacing-2)'
                                        }}
                                        className="hover:text-primary"
                                        aria-label="Remove item"
                                    >
                                        ✕
                                    </button>
                                </Card>
                            </div>
                        ))}
                    </div>
                    {items.length > 0 && (
                        <div className="text-center animate-slide-up" style={{ animationDelay: '0.2s', marginTop: 'var(--spacing-8)' }}>
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => setPhase('SELECT')}
                                disabled={items.length === 0}
                            >
                                Next: Prioritize
                            </Button>
                        </div>
                    )}
                </>
            )}

            {phase === 'SELECT' && (
                <div className="flex-col">
                    <div className="mb-4 text-center">
                        <span style={{
                            background: selectedItems.length === 3 ? 'var(--color-text-primary)' : 'var(--color-bg-subtle)',
                            color: selectedItems.length === 3 ? 'white' : 'var(--color-text-secondary)',
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'bold',
                            transition: 'all 0.3s'
                        }}>
                            {selectedItems.length}/3 Selected
                        </span>
                    </div>
                    {items.map((item, idx) => {
                        const isSelected = selectedItems.includes(item);
                        return (
                            <div key={idx} onClick={() => toggleSelection(item)}>
                                <Card
                                    className="cursor-pointer transition-all"
                                    style={{
                                        padding: 'var(--spacing-4)',
                                        border: isSelected ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                                        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                                        background: isSelected ? 'var(--color-bg-surface)' : 'var(--color-bg-glass)',
                                        opacity: (selectedItems.length === 3 && !isSelected) ? 0.5 : 1
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span className="text-lg font-medium">{item}</span>
                                        {isSelected && <span style={{ color: 'var(--color-accent)' }}>●</span>}
                                    </div>
                                </Card>
                            </div>
                        );
                    })}

                    <div className="text-center mt-8 animate-slide-up">
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => setPhase('RESULT')}
                            disabled={selectedItems.length === 0}
                        >
                            {selectedItems.length === 3 ? "Lock Focus" : `Select ${3 - selectedItems.length} more`}
                        </Button>
                    </div>
                </div>
            )}

            {phase === 'RESULT' && (
                <div className="flex-col">
                    {selectedItems.map((item, idx) => (
                        <Card
                            key={idx}
                            style={{
                                padding: 'var(--spacing-6)',
                                borderLeft: '4px solid var(--color-text-primary)',
                                background: 'var(--color-bg-surface)',
                                animation: `slideUp 0.4s ease-out forwards ${idx * 0.1}s`,
                                opacity: 0,
                                transform: 'translateY(20px)'
                            }}
                        >
                            <span style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)' }}>{item}</span>
                        </Card>
                    ))}
                    <div className="text-center mt-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                        <Button variant="secondary" onClick={() => window.location.reload()}>Start Over</Button>
                    </div>
                </div>
            )}
        </div>
    );
}
