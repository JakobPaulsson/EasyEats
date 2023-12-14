import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);
const basename = process.env.NODE_ENV === "production" ? "/platepilot" : "";
root.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);
