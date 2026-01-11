import { type ReactNode, type HTMLAttributes } from 'react';

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export function Layout({ children, ...props }: LayoutProps) {
    return <div className="layout-container" {...props}>{children}</div>;
}
