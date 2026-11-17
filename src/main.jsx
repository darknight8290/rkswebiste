
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

//  Detect an actual browser refresh
const navigation = performance.getEntriesByType("navigation")[0];

if (
  navigation?.type === "reload" &&
  window.location.pathname !== "/"
) {
  window.history.replaceState(null, "", "/");
}

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
