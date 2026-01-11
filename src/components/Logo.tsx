import { type HTMLAttributes } from 'react';

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
    onClick?: () => void;
}

export function Logo({ onClick, className, ...props }: LogoProps) {
    return (
        <div
            className={`flex items-center gap-2 ${className || ''}`}
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-3)',
                cursor: onClick ? 'pointer' : 'default',
                ...props.style
            }}
            {...props}
        >
            <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, var(--color-text-primary), var(--color-text-secondary))',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-bg-app)',
                fontWeight: 'bold',
                fontSize: '18px'
            }}>
                C
            </div>
            <span style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-weight-bold)',
                letterSpacing: '-0.02em',
                color: 'var(--color-text-primary)'
            }}>
                Clarity
            </span>
        </div>
    );
}
