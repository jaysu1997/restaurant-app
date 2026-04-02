import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ErrorBoundary } from "react-error-boundary";
import { GlobalStyles } from "./style/GlobalStyles.js";
import ErrorBoundaryFallback from "./components/ErrorBoundaryFallback.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalStyles />

    <ErrorBoundary
      FallbackComponent={ErrorBoundaryFallback}
      onReset={() => window.location.replace("/")}
    >
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
