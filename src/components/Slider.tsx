import { type InputHTMLAttributes } from 'react';

interface SliderProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    valueDisplay?: string | number;
}

export function Slider({ label, valueDisplay, className = '', ...props }: SliderProps) {
    return (
        <div className={`flex-col ${className}`} style={{ gap: 'var(--spacing-2)' }}>
            {label && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                    <span>{label}</span>
                    <span>{valueDisplay}</span>
                </div>
            )}
            <input
                type="range"
                className="slider" // Need to style this
                style={{ width: '100%', accentColor: 'var(--color-accent)' }}
                {...props}
            />
        </div>
    );
}
