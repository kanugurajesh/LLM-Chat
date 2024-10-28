import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./routes/About.tsx";
import NotFound from "./routes/NotFound.tsx";
import Upload from "./routes/Upload.tsx";
import Chat from "./routes/Chat.tsx";
import Synced from "./routes/Synced.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/synced",
    element: <Synced />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/upload",
    element: <Upload />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
