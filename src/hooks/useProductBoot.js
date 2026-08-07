import { useEffect, useState, useCallback } from "react";
import { bootSystems } from "../data/workspaceMock";

export function useProductBoot(autoStart = true) {
  const [phase, setPhase] = useState(autoStart ? "connecting" : "idle");
  const [connected, setConnected] = useState([]);

  const start = useCallback(() => {
    setPhase("connecting");
    setConnected([]);
  }, []);

  useEffect(() => {
    if (phase !== "connecting") return;

    // Always append by previous length to avoid empty/stray rows from stale index
    // (classic setInterval + functional setState race).
    const interval = setInterval(() => {
      setConnected((prev) => {
        if (prev.length >= bootSystems.length) {
          return prev;
        }
        const next = bootSystems[prev.length];
        if (!next) return prev;
        return [...prev, next];
      });
    }, 450);

    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== "connecting") return;
    if (connected.length < bootSystems.length) return;
    const t1 = setTimeout(() => setPhase("sync"), 400);
    const t2 = setTimeout(() => setPhase("ready"), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [connected.length, phase]);

  return {
    phase,
    connected: connected.filter(Boolean),
    start,
    isReady: phase === "ready",
  };
}
