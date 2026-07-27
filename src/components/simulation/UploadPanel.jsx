import { motion } from "framer-motion";
import { FileSpreadsheet, Upload } from "lucide-react";
import { ProgressBar } from "../ui/ProgressBar";

export function UploadPanel({ progress, uploading, onStart }) {
  return (
    <motion.div
      layout
      className="glass shadow-soft mx-auto max-w-lg rounded-2xl border border-border p-8"
    >
      {!uploading && progress === 0 ? (
        <button
          type="button"
          onClick={onStart}
          className="group flex w-full flex-col items-center rounded-xl border border-dashed border-border bg-bg/50 py-14 transition-colors hover:border-primary/50 hover:bg-card/80"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/30 transition-transform group-hover:scale-105">
            <Upload className="h-7 w-7" />
          </div>
          <p className="mt-6 font-semibold text-white">Upload sales.csv</p>
          <p className="mt-2 text-sm text-muted">Click to simulate client upload</p>
        </button>
      ) : (
        <div>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FileSpreadsheet className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-white">sales.csv</p>
              <p className="text-sm text-muted">
                {uploading ? "Uploading…" : "Upload complete"}
              </p>
            </div>
            <span className="text-sm font-semibold text-accent">{progress}%</span>
          </div>
          <ProgressBar value={progress} className="mt-6" />
        </div>
      )}
    </motion.div>
  );
}
