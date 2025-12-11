import { ReactNode } from "react";

interface PageShellProps {
        children: ReactNode;
        className?: string;
}

export function PageShell({ children, className = "" }: PageShellProps) {
        return (
                <div className={`mx-auto w-full max-w-6xl px-4 sm:px-8 lg:px-10 ${className}`}>
                        {children}
                </div>
        );
}
