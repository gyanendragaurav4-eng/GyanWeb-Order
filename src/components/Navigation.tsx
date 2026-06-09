import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, Home, Info, PlusCircle, LayoutList } from 'lucide-react';

export default function Navigation() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-900 tracking-tight">Gyan Web Order</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
                <Home className="w-4 h-4 mr-1" /> Home
              </Link>
              <Link to="/about" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                <Info className="w-4 h-4 mr-1" /> About
              </Link>
              {user && user.role !== 'admin' && (
                <>
                  <Link to="/order" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                    <PlusCircle className="w-4 h-4 mr-1" /> New Order
                  </Link>
                  <Link to="/my-orders" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                    <LayoutList className="w-4 h-4 mr-1" /> My Orders
                  </Link>
                </>
              )}
              {user?.role === 'admin' && (
                <Link to="/dashboard" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                  <LayoutDashboard className="w-4 h-4 mr-1" /> Dashboard
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700">Hi, {user.name}</span>
                <button
                  onClick={logout}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  <LogOut className="w-4 h-4 mr-1" /> Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="text-sm font-medium text-gray-500 hover:text-gray-900">
                  Login
                </Link>
                <Link to="/login?register=true" className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-black hover:bg-gray-800">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
