import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Order } from '../types';

export default function Dashboard() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }

    fetchOrders();
  }, [token, user, navigate]);

  const fetchOrders = () => {
    axios.get('/api/orders/all', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setOrders(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.put(`/api/orders/${id}/status`, { status }, { headers: { Authorization: `Bearer ${token}` } });
      fetchOrders();
    } catch(e) {
      alert("Failed to update status");
    }
  };

  const filteredOrders = orders.filter(
    o => o.fullName.toLowerCase().includes(search.toLowerCase()) || 
         o.email.toLowerCase().includes(search.toLowerCase()) ||
         o.id.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard - All Orders</h1>
        <input 
          type="text" 
          placeholder="Search orders..." 
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white rounded-xl shadow-sm border border-gray-100">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{order.fullName}</div>
                  <div className="text-sm text-gray-500">{order.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{order.websiteType}</div>
                  <div className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${order.budget}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select 
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Payment Submitted">Payment Submitted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => navigate(`/orders/${order.id}`)} className="text-indigo-600 hover:text-indigo-900">Open Thread &rarr;</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
