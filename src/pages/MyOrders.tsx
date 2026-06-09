import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Order } from '../types';

export default function MyOrders() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    axios.get('/api/orders/my', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setOrders(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token, navigate]);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>
      
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8">
        <h2 className="font-semibold text-blue-900 mb-2">How to Pay for Pending Orders:</h2>
        <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
          <li><strong>Direct UPI Link:</strong> Select the "Pay via UPI App" button to launch your preferred payment application directly (only on mobiles).</li>
          <li><strong>Scan the QR Code:</strong> Use any UPI-enabled payment app (GPay, PhonePe, Paytm, etc.) to scan the digital QR code shown on-screen.</li>
          <li><strong>Copy UPI ID:</strong> Click to copy our UPI ID (<strong className="font-mono bg-blue-100 px-1 rounded">9162415380-3@ybl</strong>) to securely complete the transfer in your payment portal.</li>
        </ul>
      </div>

      {orders.length === 0 ? (
        <div className="text-gray-500 bg-white p-8 rounded-lg border border-gray-100 text-center">
          You haven't placed any orders yet.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center cursor-pointer hover:border-gray-300 transition-colors" onClick={() => navigate(`/orders/${order.id}`)}>
              <div>
                <h3 className="text-lg font-semibold">{order.websiteType} Website</h3>
                <p className="text-sm text-gray-500">Ordered on {new Date(order.createdAt).toLocaleDateString()}</p>
                <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {order.status}
                </div>
              </div>
              <div className="text-right">
                <span className="text-gray-900 font-medium">${order.budget}</span>
                <span className="block text-sm text-blue-600 hover:text-blue-500 mt-1">View Details &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
