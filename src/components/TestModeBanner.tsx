'use client';

import { useTranslations } from 'next-intl';
import { AlertTriangle } from 'lucide-react';

export default function TestModeBanner() {
  const t = useTranslations('TestModeNotice');

  const badgeText = t('badge');
  const mainText = t('text');

  // Repetition array to guarantee seamless infinite scrolling across wide monitors & mobile
  const items = Array.from({ length: 6 });

  return (
    <>
      {/* Top Fixed Marquee Banner */}
      <aside
        aria-label="Test Mode Notification"
        className="fixed top-0 left-0 w-full h-7 z-[60] bg-[#0d1622]/95 backdrop-blur-md border-b border-amber-500/30 text-amber-300 flex items-center overflow-hidden select-none pointer-events-auto"
      >
        <div className="animate-top-ticker flex items-center whitespace-nowrap">
          {/* First loop track */}
          <div className="flex items-center gap-6 shrink-0 pr-6">
            {items.map((_, i) => (
              <div key={`track1-${i}`} className="flex items-center gap-2">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                </span>
                <AlertTriangle size={12} className="text-amber-400 shrink-0" />
                <span className="px-1.5 py-0.2 rounded text-[9.5px] font-bold tracking-widest uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {badgeText}
                </span>
                <span className="text-[11px] sm:text-xs font-medium tracking-wide text-amber-200/90">
                  {mainText}
                </span>
                <span className="text-amber-500/40 text-xs pl-2">✦</span>
              </div>
            ))}
          </div>

          {/* Second loop track (exact copy for seamless infinite loop) */}
          <div className="flex items-center gap-6 shrink-0 pr-6" aria-hidden="true">
            {items.map((_, i) => (
              <div key={`track2-${i}`} className="flex items-center gap-2">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                </span>
                <AlertTriangle size={12} className="text-amber-400 shrink-0" />
                <span className="px-1.5 py-0.2 rounded text-[9.5px] font-bold tracking-widest uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {badgeText}
                </span>
                <span className="text-[11px] sm:text-xs font-medium tracking-wide text-amber-200/90">
                  {mainText}
                </span>
                <span className="text-amber-500/40 text-xs pl-2">✦</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Spacer so subsequent document flow elements do not get obscured by the 28px fixed bar */}
      <div className="h-7 w-full shrink-0" aria-hidden="true" />
    </>
  );
}
