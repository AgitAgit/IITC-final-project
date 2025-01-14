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
import Domains from "./pages/Domains";
import Dashboard from "./pages/Dashboard";

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
      path: "/accountdashboard/",
      element: <AccountDashboard />,
      children: [
        { path: "domains", element: <Domains /> },
        { path: "dashboard", element: <Dashboard /> },
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
      children: [
        {
          path: "setup-guide",
          element: <div>Setup Guide Content</div>,
        },
        {
          path: "website",
          element: <div>Pages Content</div>,
        },
        {
          path: "products&services",
          element: <div>Pages Content 1</div>,
        },
        {
          path: "content&memberships",
          element: <div>Pages Content 2 3</div>,
        },
        {
          path: "scheduling",
          element: <div>Pages Content 4</div>,
        },
        {
          path: "donations",
          element: <div>Pages Content 5</div>,
        },
        {
          path: "invoicing",
          element: <div>Pages Content 6</div>,
        },
        {
          path: "marketing",
          element: <div>Pages Content</div>,
        },
        {
          path: "contacts",
          element: <div>Pages Content</div>,
        },
        {
          path: "analytics",
          element: <div>Pages Content</div>,
        },
        {
          path: "finance",
          element: <div>Pages Content</div>,
        },
      ],
    },
    {
      path: "/wrapper3",
      element: <Wrapper3Pro />,
    },
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
