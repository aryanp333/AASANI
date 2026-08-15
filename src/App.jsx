import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { PageTransition } from "./components/layout/PageTransition";
import { HomePage } from "./pages/HomePage";
import { PlatformPage } from "./pages/PlatformPage";
import { SolutionsPage } from "./pages/SolutionsPage";
import { IntegrationsPage } from "./pages/IntegrationsPage";
import { SecurityPage } from "./pages/SecurityPage";
import { PricingPage } from "./pages/PricingPage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { ContactPage } from "./pages/ContactPage";
import { ExperiencePage } from "./pages/ExperiencePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { RequireAuth } from "./components/auth/RequireAuth";

/**
 * Only one experience route. Marketing pages never embed ExecutiveWorkspace
 * or retail dashboard templates.
 */
function App() {
  const location = useLocation();
  const isExperience =
    location.pathname === "/experience" ||
    location.pathname === "/simulation" ||
    location.pathname === "/dashboard";

  return (
    <div className="min-h-screen bg-surface text-ink">
      {!isExperience && <Navbar />}
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <HomePage />
                </PageTransition>
              }
            />
            <Route
              path="/platform"
              element={
                <PageTransition>
                  <PlatformPage />
                </PageTransition>
              }
            />
            <Route
              path="/solutions"
              element={
                <PageTransition>
                  <SolutionsPage />
                </PageTransition>
              }
            />
            <Route
              path="/integrations"
              element={
                <PageTransition>
                  <IntegrationsPage />
                </PageTransition>
              }
            />
            <Route
              path="/security"
              element={
                <PageTransition>
                  <SecurityPage />
                </PageTransition>
              }
            />
            <Route
              path="/pricing"
              element={
                <PageTransition>
                  <PricingPage />
                </PageTransition>
              }
            />
            <Route
              path="/resources"
              element={
                <PageTransition>
                  <ResourcesPage />
                </PageTransition>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <ContactPage />
                </PageTransition>
              }
            />
            <Route
              path="/login"
              element={
                <PageTransition>
                  <LoginPage />
                </PageTransition>
              }
            />
            <Route
              path="/signup"
              element={
                <PageTransition>
                  <SignupPage />
                </PageTransition>
              }
            />
            {/* Canonical experience — sole mount of ProductBoot → ExecutiveWorkspace */}
            <Route
              path="/experience"
              element={
                <RequireAuth>
                  <ExperiencePage />
                </RequireAuth>
              }
            />
            <Route path="/simulation" element={<Navigate to="/experience" replace />} />
            <Route path="/dashboard" element={<Navigate to="/experience" replace />} />
            <Route path="/about" element={<Navigate to="/platform" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
      {!isExperience && <Footer />}
    </div>
  );
}

export default App;
