import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing";
import Layout from "./pages/Layout";
import Error from "./pages/Error";
import TemplatesPage from "./pages/Templates";

import "./App.css";
import SignUp from "./pages/SignUp";

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
          path: "/templates",
          element: <TemplatesPage />,
        },
        {
          path: "*",
          element: <Error />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    // {
    //   path: "/login",
    //   element: <Login />,
    // },
    // {
    //   path: "/signUp",
    //   element: <SignUp />,
    // },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
