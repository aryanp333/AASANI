import { useCallback, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { ProductBootScreen } from "../components/product/ProductBootScreen";
import { ExecutiveWorkspace } from "../components/product/ExecutiveWorkspace";

/**
 * Single Experience AASANI flow (healthcare only):
 *   connectors boot → Executive Workspace (hospital KPIs)
 *
 * Never mounts marketing/home retail content.
 */
export function ExperiencePage() {
  const location = useLocation();
  // Remount session when navigation key changes so boot always restarts cleanly.
  return <ExperienceSession key={location.key} />;
}

function ExperienceSession() {
  const [stage, setStage] = useState("booting");
  const finishedRef = useRef(false);

  const handleBootComplete = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setStage("workspace");
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto bg-surface-muted"
      data-testid="experience-shell"
      data-experience-stage={stage}
    >
      {/* Exit only after workspace is ready — avoids dumping users onto the
          marketing homepage mid-sync and thinking the demo "became retail". */}
      {stage === "workspace" && (
        <Link
          to="/"
          className="fixed right-6 top-6 z-[110] inline-flex items-center gap-2 rounded-full border border-border bg-white/95 px-4 py-2 text-sm font-semibold text-muted shadow-md backdrop-blur hover:text-ink"
          data-testid="experience-exit"
        >
          <X className="h-4 w-4" /> Exit experience
        </Link>
      )}

      {stage === "booting" && (
        <ProductBootScreen onComplete={handleBootComplete} />
      )}

      {stage === "workspace" && (
        <div data-testid="experience-workspace">
          <ExecutiveWorkspace />
        </div>
      )}
    </div>
  );
}
