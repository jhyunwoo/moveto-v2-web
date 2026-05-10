import React from 'react';

interface PremiumGlassLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function PremiumGlassLayout({ children, title, subtitle }: PremiumGlassLayoutProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-50 font-sans text-slate-900 selection:bg-indigo-500 selection:text-white dark:bg-slate-950 dark:text-slate-50">
      {/* Animated Background Mesh Gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] animate-[pulse_8s_ease-in-out_infinite] rounded-full bg-indigo-400/20 mix-blend-multiply blur-3xl dark:bg-indigo-600/20 dark:mix-blend-screen" />
        <div className="absolute top-[20%] -right-[10%] h-[50%] w-[30%] animate-[pulse_10s_ease-in-out_infinite_alternate] rounded-full bg-fuchsia-400/20 mix-blend-multiply blur-3xl dark:bg-fuchsia-600/20 dark:mix-blend-screen" />
        <div className="absolute -bottom-[10%] left-[20%] h-[40%] w-[50%] animate-[pulse_12s_ease-in-out_infinite_alternate-reverse] rounded-full bg-cyan-400/20 mix-blend-multiply blur-3xl dark:bg-cyan-600/20 dark:mix-blend-screen" />
      </div>

      {/* Main Content Wrapper */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center p-6 md:p-12 lg:p-24">
        {/* Entrance Animation Container */}
        <div className="animate-in fade-in slide-in-from-bottom-8 w-full max-w-5xl duration-1000 ease-out fill-mode-both">
          
          {/* Header Section */}
          {(title || subtitle) && (
            <header className="mb-12 text-center">
              {title && (
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 sm:text-6xl lg:text-7xl">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400 sm:text-xl">
                  {subtitle}
                </p>
              )}
            </header>
          )}

          {/* Premium Glassmorphic Card */}
          <div className="group relative rounded-3xl bg-white/40 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)] ring-1 ring-slate-900/5 backdrop-blur-2xl transition-all duration-500 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] dark:bg-slate-900/40 dark:shadow-[0_8px_32px_rgba(0,0,0,0.16)] dark:ring-white/10 dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.24)] sm:p-12">
            
            {/* Subtle inner highlight for 3D effect */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/40 mix-blend-overlay dark:border-white/10" />

            {/* Content Slot */}
            <div className="relative z-10">
              {children}
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}
