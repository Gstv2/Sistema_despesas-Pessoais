
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import DashboardPage from "../pages/DashboardPage";
import IncomePage from "../pages/IncomePage";
import ExpensePage from "../pages/ExpensePage";
import HistoryPage from "../pages/HistoryPage";
import ReportsPage from "../pages/ReportsPage";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import { ProtectedRoute } from "../features/auth/ProtectedRoute";
import { useAuth } from "../hooks/AuthContext";
import { Navigate } from "react-router-dom";

function AuthRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: "/signup",
    element: (
      <AuthRoute>
        <SignUpPage />
      </AuthRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthRoute>
        <LoginPage />
      </AuthRoute>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <AuthRoute>
        <ForgotPasswordPage />
      </AuthRoute>
    ),
  },
  {
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/income",
        element: <IncomePage />,
      },
      {
        path: "/expenses",
        element: <ExpensePage />,
      },
      {
        path: "/history",
        element: <HistoryPage />,
      },
      {
        path: "/reports",
        element: <ReportsPage />,
      },
    ],
  },
]);

