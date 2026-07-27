import { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { ProductBootScreen } from "../components/product/ProductBootScreen";
import { ExecutiveWorkspace } from "../components/product/ExecutiveWorkspace";

export function ExperiencePage() {
  const [booting, setBooting] = useState(true);

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-white">
      <Link
        to="/"
        className="fixed right-6 top-6 z-[110] inline-flex items-center gap-2 rounded-full border border-border bg-white/95 px-4 py-2 text-sm font-semibold text-muted shadow-md backdrop-blur hover:text-ink"
      >
        <X className="h-4 w-4" /> Exit experience
      </Link>
      {booting ? (
        <ProductBootScreen onComplete={() => setBooting(false)} />
      ) : (
        <ExecutiveWorkspace />
      )}
    </div>
  );
}
