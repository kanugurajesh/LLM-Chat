import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./routes/About.tsx";
import NotFound from "./routes/NotFound.tsx";
import Upload from "./routes/Upload.tsx";
import Chat from "./routes/Chat.tsx";
import Synced from "./routes/Synced.tsx";
import Features from "./routes/Feature.tsx";
import Pricing from "./routes/Pricing.tsx";
import Contact from "./routes/Contact.tsx";

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
    path: "/features",
    element: <Features />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
