import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import GamePage from "./pages/GamePage.tsx";
import { RefProvider } from "./hooks/useScroll.tsx";

const router = createBrowserRouter([
  {
    path: "/Streamy/",
    element: <App />,
  },
  {
    path: "/Streamy/game/:id",
    element: (
      <RefProvider>
        <GamePage />
      </RefProvider>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
