import { createBrowserRouter } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import IncomePage from '../pages/IncomePage';
import ExpensePage from '../pages/ExpensePage';
import HistoryPage from '../pages/HistoryPage';
import ReportsPage from '../pages/ReportsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/income',
    element: <IncomePage />,
  },
  {
    path: '/expenses',
    element: <ExpensePage />,
  },
  {
    path: '/history',
    element: <HistoryPage />,
  },
  {
    path: '/reports',
    element: <ReportsPage />,
  },
]);
