import { useCallback, useEffect, useRef, useState } from "react";
import { analysts as analystData } from "../data/analysts";

const STAGES = [
  "idle",
  "upload",
  "uploading",
  "created",
  "analysts",
  "working",
  "pipeline",
  "feed",
  "dashboard",
  "complete",
];

export function useSimulation() {
  const [stage, setStage] = useState("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysts, setAnalysts] = useState(
    analystData.map((a) => ({ ...a, progress: a.initialProgress })),
  );
  const [pipelineIndex, setPipelineIndex] = useState(-1);
  const timers = useRef([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const schedule = useCallback((fn, ms) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  }, []);

  const reset = useCallback(() => {
    clearTimers();
    setStage("idle");
    setUploadProgress(0);
    setAnalysts(analystData.map((a) => ({ ...a, progress: a.initialProgress })));
    setPipelineIndex(-1);
  }, [clearTimers]);

  const start = useCallback(() => {
    reset();
    setStage("upload");
    schedule(() => setStage("uploading"), 800);
  }, [reset, schedule]);

  useEffect(() => {
    if (stage !== "uploading") return;

    let p = 0;
    const interval = setInterval(() => {
      p += 8 + Math.random() * 12;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setUploadProgress(100);
        schedule(() => setStage("created"), 400);
        schedule(() => setStage("analysts"), 1400);
        schedule(() => setStage("working"), 2800);
        schedule(() => {
          setPipelineIndex(0);
          setStage("pipeline");
        }, 4200);
        schedule(() => setStage("feed"), 5200);
        schedule(() => setStage("dashboard"), 9000);
        schedule(() => setStage("complete"), 11000);
      } else {
        setUploadProgress(Math.round(p));
      }
    }, 200);

    return () => clearInterval(interval);
  }, [stage, schedule]);

  useEffect(() => {
    if (stage !== "working" && stage !== "pipeline" && stage !== "feed") return;

    const interval = setInterval(() => {
      setAnalysts((prev) =>
        prev.map((a) => ({
          ...a,
          progress: Math.min(100, a.progress + Math.floor(Math.random() * 8) + 2),
        })),
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [stage]);

  useEffect(() => {
    if (stage !== "pipeline" && stage !== "feed" && stage !== "dashboard") return;

    const interval = setInterval(() => {
      setPipelineIndex((i) => {
        if (i >= 5) return i;
        return i + 1;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [stage]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const stageIndex = STAGES.indexOf(stage);

  return {
    stage,
    stageIndex,
    uploadProgress,
    analysts,
    pipelineIndex,
    start,
    reset,
    isActive: stage !== "idle",
  };
}
