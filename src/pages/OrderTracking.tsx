import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import { Order, Message } from '../types';
import { Send, Upload, Paperclip, Copy, CheckCircle2 } from 'lucide-react';
import qrCodeMockup from '../assets/images/qr_code_mockup_1780982858634.png';

export default function OrderTracking() {
  const { id } = useParams<{ id: string }>();
  const { token, user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!token || !id) return;
    
    // Fetch Order details
    axios.get(`/api/orders/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setOrder(res.data))
      .catch(console.error);

    // Fetch Messages
    axios.get(`/api/orders/${id}/messages`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setMessages(res.data))
      .finally(() => setLoading(false));

    // Socket
    socketRef.current = io('/', { transports: ['websocket', 'polling'] });
    socketRef.current.emit('join_order_room', id);
    socketRef.current.on('new_message', (msg: Message) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [id, token]);

  const [deliveryFile, setDeliveryFile] = useState<File | null>(null);
  const [hostedLink, setHostedLink] = useState('');

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    try {
      await axios.post(`/api/orders/${id}/messages`, { text: inputMessage }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInputMessage('');
    } catch(e) {
      console.error(e);
    }
  };

  const uploadPayment = async () => {
    if (!paymentFile) return;
    const formData = new FormData();
    formData.append('paymentScreenshot', paymentFile);
    try {
      await axios.post(`/api/orders/${id}/payment`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Payment screenshot submitted!');
      window.location.reload();
    } catch(e) {
      alert('Failed to upload payment');
    }
  };

  const upiId = '9162415380-3@ybl';
  const upiLink = order ? `upi://pay?pa=${upiId}&pn=GyanWebOrder&am=${order.budget}&cu=USD` : '#';

  const copyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading || !order) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto py-8 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Order Details Column */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 border-b pb-2 mb-4">Order Details</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <p><strong className="text-gray-900">Project Type:</strong> {order.websiteType}</p>
            <p><strong className="text-gray-900">Budget:</strong> ${order.budget}</p>
            <p><strong className="text-gray-900">Status:</strong> 
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {order.status}
              </span>
            </p>
            <p><strong className="text-gray-900">Domain:</strong> {order.domainName || 'N/A'}</p>
            {order.zipFilePath && (
              <p><strong className="text-gray-900">Assets:</strong> <a href={order.zipFilePath} target="_blank" className="text-blue-600 hover:underline">Download ZIP</a></p>
            )}
            <div>
              <strong className="text-gray-900 block mb-1">Description:</strong>
              <p className="p-3 bg-gray-50 rounded text-gray-700 whitespace-pre-wrap">{order.description}</p>
            </div>
          </div>
        </div>

         {/* Payment Section - Show only to User if Pending, or admin just to view status */}
        {user?.role === 'user' && order.status === 'Pending' && (
           <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
             <h3 className="font-semibold text-blue-900 mb-2">Complete Payment</h3>
             <div className="text-sm text-blue-800 mb-4 space-y-4">
                <p>Please complete the payment of <strong>${order.budget}</strong> by choosing one of the methods below, then upload the receipt here.</p>
                
                <div className="flex flex-col sm:flex-row gap-6 items-start bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                  <div className="bg-gray-50 p-2 rounded-lg border border-gray-100 flex-shrink-0">
                    <img src={qrCodeMockup} alt="Payment QR Code" className="w-24 h-24 object-cover rounded mix-blend-multiply" />
                  </div>
                  <div className="flex-1 space-y-3 w-full">
                    <a 
                      href={upiLink}
                      className="w-full sm:w-auto inline-flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                    >
                      Pay via UPI App
                    </a>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Or Copy UPI ID</label>
                      <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-gray-200">
                        <span className="text-sm font-mono text-gray-900 font-medium">{upiId}</span>
                        <button 
                          onClick={copyUpi}
                          className="p-1.5 text-gray-500 hover:text-black hover:bg-white rounded-md transition-colors"
                        >
                          {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <ul className="list-disc list-inside space-y-1 mt-2 mb-4">
                  <li><strong>Direct UPI Link:</strong> Select the "Pay via UPI App" button out to launch your preferred payment application directly (only on mobiles).</li>
                  <li><strong>Scan the QR Code:</strong> Use any UPI-enabled payment app (GPay, PhonePe, Paytm, etc.) to scan the digital QR code shown.</li>
                  <li><strong>Copy UPI ID:</strong> Click to copy our UPI ID to securely complete the transfer in your payment portal.</li>
                </ul>
             </div>
             <div className="flex flex-col gap-2">
               <label className="block text-xs font-medium text-blue-900">Upload Payment Receipt</label>
               <input type="file" accept="image/*" onChange={e => setPaymentFile(e.target.files?.[0] || null)} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-100 file:text-blue-700" />
               <button onClick={uploadPayment} disabled={!paymentFile} className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded text-sm disabled:opacity-50 flex items-center justify-center">
                 <Upload className="w-4 h-4 mr-2" /> Submit Receipt
               </button>
             </div>
           </div>
        )}
        
        {order.paymentScreenshotPath && (
          <div className="mt-4">
             <strong className="text-gray-900 block text-sm mb-2">Payment Receipt:</strong>
             <a href={order.paymentScreenshotPath} target="_blank" className="text-blue-600 text-sm hover:underline flex items-center"><Paperclip className="w-4 h-4 mr-1" /> View Uploaded Receipt</a>
          </div>
        )}

        {user?.role === 'admin' && order.status !== 'Completed' && (
           <div className="bg-green-50 border border-green-100 p-4 rounded-xl mt-4">
             <h3 className="font-semibold text-green-900 mb-2">Deliver Project</h3>
             <div className="space-y-3">
               <div>
                  <label className="block text-xs font-medium text-green-800">Final ZIP File</label>
                  <input type="file" accept=".zip" onChange={e => setDeliveryFile(e.target.files?.[0] || null)} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-green-100 file:text-green-700 w-full" />
               </div>
               <div>
                  <label className="block text-xs font-medium text-green-800">Hosted Link (Optional)</label>
                  <input type="url" value={hostedLink} onChange={e => setHostedLink(e.target.value)} placeholder="https://" className="w-full text-sm rounded border-gray-300 px-3 py-2 mt-1" />
               </div>
               <button onClick={async () => {
                 const data = new FormData();
                 if (deliveryFile) data.append('finalZip', deliveryFile);
                 if (hostedLink) data.append('hostedLink', hostedLink);
                 try {
                   await axios.post(`/api/orders/${id}/deliver`, data, { headers: { Authorization: `Bearer ${token}` } });
                   alert('Delivery submitted!');
                   window.location.reload();
                 } catch(e) { alert('Failed'); }
               }} className="w-full py-2 bg-green-600 text-white rounded text-sm text-center">Submit Delivery</button>
             </div>
           </div>
        )}

        {(order.finalZipPath || order.hostedLink) && (
          <div className="bg-gray-900 text-white p-4 rounded-xl mt-4">
            <h3 className="font-semibold mb-2">Project Delivery</h3>
            {order.hostedLink && <p className="text-sm mb-2">Live Demo: <a href={order.hostedLink} target="_blank" className="text-blue-400 hover:underline">{order.hostedLink}</a></p>}
            {order.finalZipPath && <p className="text-sm">Download: <a href={order.finalZipPath} target="_blank" className="text-blue-400 hover:underline">Source Files (ZIP)</a></p>}
          </div>
        )}

      </div>

      {/* Chat / Messages Column */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[70vh]">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Project Chat</h2>
          <p className="text-xs text-gray-500">Communicate directly with {user?.role === 'admin' ? 'the client' : 'our team'}.</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map(msg => {
            const isMe = msg.senderId === user?.id;
            return (
              <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <div className="text-xs text-gray-500 mb-1 px-1">
                  {msg.senderName} • {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
                <div className={`px-4 py-2 rounded-2xl max-w-[80%] break-words ${isMe ? 'bg-black text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-900 rounded-bl-none shadow-sm'}`}>
                  {msg.text}
                </div>
              </div>
            );
          })}
          <div ref={endOfMessagesRef} />
        </div>

        <div className="p-4 bg-white border-t border-gray-200">
          <form onSubmit={sendMessage} className="flex gap-2">
            <input 
              type="text" 
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              placeholder="Type a message..." 
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            />
            <button type="submit" disabled={!inputMessage.trim()} className="p-3 bg-black text-white rounded-full hover:bg-gray-800 disabled:opacity-50 flex-shrink-0">
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
