import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Async data lifecycle for independent workspace sections.
 * status: "loading" | "success" | "error"
 *
 * @template T
 * @param {() => Promise<T>} fetcher
 * @param {unknown[]} [deps] - re-run when these change (org, period, etc.)
 */
export function useAsyncData(fetcher, deps = []) {
  const [retryKey, setRetryKey] = useState(0);
  const [state, setState] = useState(() => ({
    status: /** @type {"loading"|"success"|"error"} */ ("loading"),
    data: /** @type {T | null} */ (null),
    error: /** @type {Error | null} */ (null),
  }));

  const fetcherRef = useRef(fetcher);
  useEffect(() => {
    fetcherRef.current = fetcher;
  });

  const retry = useCallback(() => {
    setRetryKey((k) => k + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    // Queue loading transition asynchronously so we don't sync-setState in effect body.
    const run = Promise.resolve()
      .then(() => {
        if (cancelled) return null;
        setState((prev) => ({
          status: "loading",
          data: prev.data, // keep previous snapshot while refreshing when possible
          error: null,
        }));
        return fetcherRef.current();
      })
      .then((result) => {
        if (cancelled || result === null) return;
        setState({
          status: "success",
          data: result,
          error: null,
        });
      })
      .catch((err) => {
        if (cancelled) return;
        setState({
          status: "error",
          data: null,
          error: err instanceof Error ? err : new Error(String(err)),
        });
      });

    return () => {
      cancelled = true;
      void run;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deps passed explicitly by callers
  }, [...deps, retryKey]);

  const { status, data, error } = state;

  return {
    status,
    data,
    error,
    retry,
    loading: status === "loading",
    success: status === "success",
    failed: status === "error",
  };
}
