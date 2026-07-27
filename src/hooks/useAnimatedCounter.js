import { useEffect, useState } from "react";

export function useAnimatedCounter(target, duration = 1600, active = true) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(start + (target - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [target, duration, active]);

  return value;
}
