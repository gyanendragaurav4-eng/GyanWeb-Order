import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';

export default function OrderForm() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    websiteType: 'Business',
    description: '',
    budget: 20,
    domainName: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const getSampleImage = () => {
    switch (formData.websiteType) {
      case 'Business': return new URL('../assets/images/business_sample_1780985371345.png', import.meta.url).href;
      case 'E-commerce': return new URL('../assets/images/ecommerce_sample_1780985392748.png', import.meta.url).href;
      case 'Portfolio': return new URL('../assets/images/portfolio_sample_1780985409442.png', import.meta.url).href;
      case 'Web Application': return new URL('../assets/images/webapp_sample_1780985422607.png', import.meta.url).href;
      case 'Food & Restaurant': return new URL('../assets/images/food_sample_1780985706354.png', import.meta.url).href;
      case 'Medical & Healthcare': return new URL('../assets/images/medical_sample_1780985723325.png', import.meta.url).href;
      case 'Education & Courses': return new URL('../assets/images/education_sample_1780985740505.png', import.meta.url).href;
      default: return null;
    }
  };

  const sampleImage = getSampleImage();

  if (!token) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Please log in to place an order</h2>
        <button onClick={() => navigate('/login')} className="px-6 py-2 bg-black text-white rounded-md">Log In</button>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value.toString());
      });
      if (file) {
        data.append('zipFile', file);
      }

      await axios.post('/api/orders', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      navigate('/my-orders');
    } catch (err) {
      console.error(err);
      alert('Failed to place order');
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto py-8 relative z-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Start Your Project</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input name="fullName" value={formData.fullName} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Website Type</label>
              <select name="websiteType" value={formData.websiteType} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm">
                <option>Business</option>
                <option>E-commerce</option>
                <option>Portfolio</option>
                <option>Web Application</option>
                <option>Food & Restaurant</option>
                <option>Medical & Healthcare</option>
                <option>Education & Courses</option>
                <option>Other</option>
              </select>
              {sampleImage && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-500">Sample Preview:</p>
                    <a 
                      href={`/demo/${formData.websiteType.split(' ')[0].toLowerCase()}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-xs font-medium text-blue-600 hover:underline px-3 py-1 bg-blue-50 rounded-full"
                    >
                      View Live Interactive Demo →
                    </a>
                  </div>
                  <div className="rounded-lg border border-gray-200 overflow-hidden shadow-sm bg-gray-50 flex items-center justify-center p-2 relative group cursor-pointer" onClick={() => window.open(`/demo/${formData.websiteType.split(' ')[0].toLowerCase()}`, '_blank')}>
                    <img src={sampleImage} alt={`${formData.websiteType} sample`} className="w-full h-auto object-cover rounded-md max-h-64 object-top opacity-90 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <span className="bg-white text-black text-sm font-bold px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">Click to interact</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Project Description</label>
              <textarea name="description" rows={4} value={formData.description} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm" placeholder="Tell us about your needs..."></textarea>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Budget ($): {formData.budget}</label>
              <input type="range" name="budget" min="20" max="20000" step="10" value={formData.budget} onChange={handleChange} className="mt-1 block w-full" />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$20</span>
                <span>$20,000+</span>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Domain Name (Optional)</label>
              <input type="text" name="domainName" value={formData.domainName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm" placeholder="e.g. mycompany.com" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Upload ZIP (Assets, Designs, etc.)</label>
              <input type="file" accept=".zip,.rar,.7z" onChange={(e) => setFile(e.target.files?.[0] || null)} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100" />
            </div>
          </div>
          <div className="pt-4">
            <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50">
              {loading ? 'Processing...' : 'Submit Order'}
            </button>
          </div>
        </form>
      </motion.div>
    </>
  );
}
