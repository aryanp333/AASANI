import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { activityTemplates } from "../data/analysts";

let activityId = 0;

export function useActivityFeed(active, intervalMs = 3500, maxItems = 8) {
  const [items, setItems] = useState([]);

  const pushActivity = useCallback(() => {
    const template =
      activityTemplates[Math.floor(Math.random() * activityTemplates.length)];
    const entry = {
      id: ++activityId,
      analyst: template.analyst,
      action: template.action,
      time: dayjs().format("HH:mm:ss"),
    };
    setItems((prev) => [entry, ...prev].slice(0, maxItems));
  }, [maxItems]);

  useEffect(() => {
    if (!active) return;
    const kickoff = setTimeout(() => pushActivity(), 0);
    const id = setInterval(pushActivity, intervalMs);
    return () => {
      clearTimeout(kickoff);
      clearInterval(id);
    };
  }, [active, intervalMs, pushActivity]);

  const reset = useCallback(() => setItems([]), []);

  return { items, reset };
}
