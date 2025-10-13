import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryFallback from "./ui/ErrorBoundaryFallback.jsx";
import { GlobalStyles } from "./style/GlobalStyles.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalStyles />

    <ErrorBoundary
      FallbackComponent={ErrorBoundaryFallback}
      onReset={() => window.location.reload()}
    >
      <App />
    </ErrorBoundary>
  </StrictMode>
);
