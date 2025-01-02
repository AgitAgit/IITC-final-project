import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing";
import Layout from "./pages/Layout";
import Error from "./pages/Error";

import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Landing />,
        },
        // {
        //   path: "/About",
        //   element: <About />,
        // },
        // {
        //   path: "/Profile/:id",
        //   element: <Profile />,
        // },
        // {
        //   path: "/Chat",
        //   element: <Chat />

        // },
        {
          path: "*",
          element: <Error />,
        },
      ],
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
