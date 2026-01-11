import { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'md' | 'lg';
}

export function Button({ variant = 'primary', size = 'md', className = '', ...props }: ButtonProps) {
    const base = 'btn';
    const v = `btn-${variant}`;
    const s = size === 'lg' ? 'btn-lg' : '';

    return <button className={`${base} ${v} ${s} ${className}`} {...props} />;
}
