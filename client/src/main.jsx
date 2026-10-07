import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster
      position="bottom-center"
      toastOptions={{
        duration: 2500,
        className: "!rounded-xl !text-sm !font-medium dark:!bg-zinc-800 dark:!text-zinc-100",
      }}
    />
    <App />
  </StrictMode>,
);
