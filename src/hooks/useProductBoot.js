import { useEffect, useState, useCallback } from "react";
import { bootSystems } from "../data/workspaceMock";

/**
 * Simulated secure-connector boot:
 *   connecting → sync → ready
 *
 * Phase transitions use separate effects so cleanup never cancels the
 * next step's timer (a previous combined-timeout effect left the UI stuck at 88%).
 */
export function useProductBoot(autoStart = true) {
  const [phase, setPhase] = useState(autoStart ? "connecting" : "idle");
  const [connected, setConnected] = useState([]);

  const start = useCallback(() => {
    setPhase("connecting");
    setConnected([]);
  }, []);

  useEffect(() => {
    if (phase !== "connecting") return;

    // Append by previous length to avoid empty/stray rows from stale indexes.
    const interval = setInterval(() => {
      setConnected((prev) => {
        if (prev.length >= bootSystems.length) return prev;
        const next = bootSystems[prev.length];
        if (!next) return prev;
        return [...prev, next];
      });
    }, 450);

    return () => clearInterval(interval);
  }, [phase]);

  // connecting → sync once every system is listed
  useEffect(() => {
    if (phase !== "connecting") return;
    if (connected.length < bootSystems.length) return;
    const t = setTimeout(() => setPhase("sync"), 400);
    return () => clearTimeout(t);
  }, [connected.length, phase]);

  // sync → ready (this phase owns the timer so remount / deps can't orphan it)
  useEffect(() => {
    if (phase !== "sync") return;
    const t = setTimeout(() => setPhase("ready"), 1600);
    return () => clearTimeout(t);
  }, [phase]);

  return {
    phase,
    connected: connected.filter(Boolean),
    start,
    isReady: phase === "ready",
  };
}
