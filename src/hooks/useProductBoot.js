import { useEffect, useState, useCallback } from "react";
import { bootSystems } from "../data/platform";

export function useProductBoot(autoStart = true) {
  const [phase, setPhase] = useState(autoStart ? "connecting" : "idle");
  const [connected, setConnected] = useState([]);

  const start = useCallback(() => {
    setPhase("connecting");
    setConnected([]);
  }, []);

  useEffect(() => {
    if (phase !== "connecting") return;

    let i = 0;
    const interval = setInterval(() => {
      if (i < bootSystems.length) {
        setConnected((prev) => [...prev, bootSystems[i]]);
        i += 1;
      } else {
        clearInterval(interval);
        setTimeout(() => setPhase("sync"), 400);
        setTimeout(() => setPhase("ready"), 2200);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [phase]);

  return { phase, connected, start, isReady: phase === "ready" };
}
