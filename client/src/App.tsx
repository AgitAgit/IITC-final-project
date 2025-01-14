import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing";
import Layout from "./pages/Layout";
import Error from "./pages/Error";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import TemplatesPage from "./pages/Templates";
import Favorites from "./pages/Favorites";
import AccountDashboard from "./pages/AccountDashboard";
import FakeEditor from "./pages/EditorTools";
import EditorLayout from "./pages/EditorLayout";

import "./App.css";
import BasicEditor3Pro from "./components/basicEditor3Pro/BasicEditor3Pro";
import Wrapper3Pro from "./components/basicEditor3Pro/Wrapper3Pro";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Landing />,
        },
        {
          path: "/templates/",
          element: <TemplatesPage />,
        },
        {
          path: "/templates/:filter",
          element: <TemplatesPage />,
        },
        {
          path: "*",
          element: <Error />,
        },
      ],
    },
    {
      path: "/accountdashboard",
      element: <AccountDashboard />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/my-favorites",
      element: <Favorites />,
    },
    {
      path: "/fakeEditor",
      element: <FakeEditor />,
    },
    {
      path: "/editor-page",
      element: <EditorLayout />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
