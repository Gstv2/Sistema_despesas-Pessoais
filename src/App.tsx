import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <RouterProvider router={router} />
        </main>
      </div>
    </div>
  );
}

export default App;
