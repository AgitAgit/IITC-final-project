import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing";
import Layout from "./pages/Layout";
import Error from "./pages/Error";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import TemplatesPage from "./pages/Templates";
import Favorites from "./pages/Favorites";
import AccountDashboard from "./pages/AccountDashboard";
import FakeEditor from "./pages/FakeEditor";
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
      path:"/testEditor1",
      element:<Wrapper3Pro />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;

// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/app-sidebar"

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       <main>
//         <SidebarTrigger />
//         {children}
//       </main>
//     </SidebarProvider>
//   )
// }
