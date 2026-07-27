import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, RotateCcw } from "lucide-react";
import { UploadPanel } from "../components/simulation/UploadPanel";
import { AnalystCard } from "../components/simulation/AnalystCard";
import { PipelineTimeline } from "../components/simulation/PipelineTimeline";
import { ActivityFeed } from "../components/simulation/ActivityFeed";
import { SimulationDashboardReveal } from "../components/dashboard/SimulationDashboardReveal";
import { Button } from "../components/ui/Button";
import { useSimulation } from "../hooks/useSimulation";
import { useActivityFeed } from "../hooks/useActivityFeed";

export function SimulationPage() {
  const {
    stage,
    uploadProgress,
    analysts,
    pipelineIndex,
    start,
    reset,
    isActive,
  } = useSimulation();

  const feedActive =
    stage === "feed" || stage === "dashboard" || stage === "complete";
  const { items: activities, reset: resetFeed } = useActivityFeed(feedActive);

  useEffect(() => {
    if (stage === "idle") resetFeed();
  }, [stage, resetFeed]);

  const showAnalysts = ["analysts", "working", "pipeline", "feed", "dashboard", "complete"].includes(
    stage,
  );
  const showPipeline = pipelineIndex >= 0;
  const showFeed = ["feed", "dashboard", "complete"].includes(stage);
  const showDashboard = ["dashboard", "complete"].includes(stage);
  const showComplete = stage === "complete";

  return (
    <div className="pb-24 pt-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl"
        >
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Live demo
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Client journey simulation
          </h1>
          <p className="mt-4 text-muted">
            Experience how AASANI moves from{" "}
            <span className="text-white">sales.csv</span> upload to analyst
            delivery—entirely simulated, no backend required.
          </p>
        </motion.div>

        <div className="mt-12 space-y-16">
          <section>
            <h2 className="text-lg font-semibold text-white">Step 1 · Upload data</h2>
            <div className="mt-6">
              <UploadPanel
                progress={uploadProgress}
                uploading={stage === "uploading"}
                onStart={start}
              />
            </div>
            <AnimatePresence>
              {stage === "created" && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 text-center text-sm font-medium text-accent"
                >
                  ↓ Project created
                </motion.p>
              )}
            </AnimatePresence>
          </section>

          <AnimatePresence>
            {showAnalysts && (
              <motion.section
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-lg font-semibold text-white">
                  Assign analysts
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Dedicated specialists begin work on your project.
                </p>
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                  {analysts.map((a, i) => (
                    <AnalystCard key={a.id} analyst={a} index={i} />
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showPipeline && (
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h2 className="text-lg font-semibold text-white">Pipeline</h2>
                <p className="mt-2 text-sm text-muted">
                  Each stage completes as analysts advance your deliverables.
                </p>
                <div className="mt-10">
                  <PipelineTimeline activeIndex={pipelineIndex} />
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showFeed && (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ActivityFeed items={activities} />
              </motion.section>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showDashboard && (
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h2 className="text-lg font-semibold text-white">
                  Reveal dashboard
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Executive-ready views built from your uploaded sales data.
                </p>
                <div className="mt-8">
                  <SimulationDashboardReveal />
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showComplete && (
              <motion.section
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass shadow-glow mx-auto max-w-xl rounded-2xl border border-primary/30 p-10 text-center"
              >
                <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
                <h2 className="mt-6 text-2xl font-bold text-white">
                  Analysis complete
                </h2>
                <p className="mt-3 text-muted">Your dashboard is ready.</p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Button to="/dashboard">View executive dashboard</Button>
                  <Button variant="secondary" onClick={() => { reset(); resetFeed(); }}>
                    <RotateCcw className="h-4 w-4" />
                    Run again
                  </Button>
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {!isActive && (
            <div className="text-center">
              <Button onClick={start}>Start Simulation</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
