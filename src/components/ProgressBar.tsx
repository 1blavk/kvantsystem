'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const [showBar, setShowBar] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  let progressInterval: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (isPending) {
      setShowBar(true);
      setProgress(0);
      let currentProgress = 0;

      // Start increment animation
      progressInterval = setInterval(() => {
        currentProgress += Math.random() * 30;
        if (currentProgress > 90) currentProgress = 90;
        setProgress(currentProgress);
      }, 300);
    } else {
      // Complete the progress bar
      if (progressInterval) clearInterval(progressInterval);
      setProgress(100);

      // Hide after animation
      setTimeout(() => {
        setShowBar(false);
        setProgress(0);
      }, 500);
    }

    return () => {
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [isPending]);

  return (
    <div
      className={`fixed top-0 left-0 h-1 bg-black transition-all duration-500 ease-out z-[9999]`}
      style={{
        width: showBar ? `${progress}%` : '0%',
        opacity: showBar && progress > 0 ? 1 : 0,
      }}
    />
  );
}
