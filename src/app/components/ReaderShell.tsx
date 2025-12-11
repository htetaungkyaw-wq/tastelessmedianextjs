import { ReactNode } from "react";

interface ReaderShellProps {
        header: ReactNode;
        children: ReactNode;
        footer?: ReactNode;
}

export function ReaderShell({ header, children, footer }: ReaderShellProps) {
        return (
                <div className="flex min-h-screen flex-col bg-[#050816]">
                        {header}
                        <div className="flex flex-1 flex-col items-center justify-center px-4 py-6 sm:px-8 lg:px-10">
                                <div className="gradient-ring w-full rounded-3xl border border-slate-800/70 bg-slate-900/50 p-4 sm:p-6">
                                        <div className="flex items-center justify-center">{children}</div>
                                </div>
                        </div>
                        {footer}
                </div>
        );
}
