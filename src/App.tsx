import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import OrderForm from './pages/OrderForm';
import Dashboard from './pages/Dashboard';
import OrderTracking from './pages/OrderTracking';
import MyOrders from './pages/MyOrders';

import FoodDemo from './pages/demo/FoodDemo';
import MedicalDemo from './pages/demo/MedicalDemo';
import EducationDemo from './pages/demo/EducationDemo';
import BusinessDemo from './pages/demo/BusinessDemo';
import EcommerceDemo from './pages/demo/EcommerceDemo';
import PortfolioDemo from './pages/demo/PortfolioDemo';
import WebAppDemo from './pages/demo/WebAppDemo';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
          <Routes>
            <Route path="/demo/food" element={<FoodDemo />} />
            <Route path="/demo/medical" element={<MedicalDemo />} />
            <Route path="/demo/education" element={<EducationDemo />} />
            <Route path="/demo/business" element={<BusinessDemo />} />
            <Route path="/demo/e-commerce" element={<EcommerceDemo />} />
            <Route path="/demo/portfolio" element={<PortfolioDemo />} />
            <Route path="/demo/web" element={<WebAppDemo />} />
            <Route path="/*" element={
              <>
                <Navigation />
                <main className="flex-1 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 w-full">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/order" element={<OrderForm />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/orders/:id" element={<OrderTracking />} />
                    <Route path="/my-orders" element={<MyOrders />} />
                  </Routes>
                </main>
              </>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
