import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Users, CreditCard, Settings, Search, Bell, Activity, ArrowUpRight, ArrowRight, Info, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function WebAppDemo() {
  const [toast, setToast] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState('Overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleAction = (action: string) => {
    setToast(action);
    setTimeout(() => setToast(null), 3000);
  };

  const navItems = [
    { name: 'Overview', icon: LayoutDashboard },
    { name: 'Analytics', icon: Activity },
    { name: 'Team', icon: Users },
    { name: 'Billing', icon: CreditCard }
  ];

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex font-sans text-slate-800">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden" 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      <aside className={`fixed md:static inset-y-0 left-0 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 z-50 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200">
            <div className="flex items-center">
               <div className="w-8 h-8 bg-black rounded-lg mr-3 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full border-2 border-white" />
               </div>
               <span className="font-bold tracking-tight text-lg">Orbit SaaS</span>
            </div>
            <button className="md:hidden text-slate-500 hover:text-slate-700" onClick={() => setIsSidebarOpen(false)}>
              <X className="w-5 h-5"/>
            </button>
         </div>
         <div className="p-4 flex-1 space-y-1">
            <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-4">Main Menu</div>
            {navItems.map((item) => (
              <a key={item.name} href="#" onClick={(e) => { e.preventDefault(); setActiveMenu(item.name); setIsSidebarOpen(false); handleAction(`Navigating to ${item.name}`); }} className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${activeMenu === item.name ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}>
                <item.icon className="w-4 h-4" /> {item.name}
              </a>
            ))}
         </div>
         <div className="p-4 border-t border-slate-200">
            <a href="#" onClick={(e) => { e.preventDefault(); setIsSidebarOpen(false); handleAction('Opening Settings...'); }} className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium"><Settings className="w-4 h-4"/> Settings</a>
         </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
         <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 z-10 relative">
            <div className="flex items-center gap-2 md:gap-4 flex-1">
               <button className="md:hidden text-slate-500 hover:text-slate-700 p-1" onClick={() => setIsSidebarOpen(true)}>
                 <Menu className="w-6 h-6" />
               </button>
               <div className="hidden md:flex items-center gap-2 text-slate-400 bg-slate-100 px-4 py-2 rounded-lg w-full max-w-sm border border-transparent focus-within:border-blue-500 focus-within:bg-white transition-colors">
                  <Search className="w-4 h-4" />
                  <input type="text" placeholder="Search (Cmd+K)" className="bg-transparent border-none outline-none text-sm w-full text-slate-800" />
               </div>
            </div>
            <div className="flex items-center gap-4">
               <button onClick={() => handleAction('Opening Notifications panel...')} className="relative w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600">
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white" />
               </button>
               <div onClick={() => handleAction('Opening User Profile...')} className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold text-xs ring-2 ring-white cursor-pointer hover:shadow-lg transition-shadow">ME</div>
            </div>
         </header>

         <div className="flex-1 overflow-auto p-4 md:p-8">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
               <div>
                  <h1 className="text-2xl font-bold text-slate-900 mb-1">Company Performance</h1>
                  <p className="text-slate-500 text-sm">Monitor your key metrics and active revenue in real-time.</p>
               </div>
               <div className="flex gap-2">
                  <button onClick={() => handleAction('Downloading CSV Export...')} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">Export</button>
                  <button onClick={() => handleAction('Generating PDF Report...')} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-blue-700">Generate Report</button>
               </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
               {[
                 { label: 'Total MRR', val: '$142,300', trend: '+14.5%', positive: true },
                 { label: 'Active Subscriptions', val: '2,845', trend: '+5.2%', positive: true },
                 { label: 'Churn Rate', val: '1.2%', trend: '-0.4%', positive: true } 
               ].map((stat, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors shadow-[0_2px_10px_rgba(0,0,0,0.02)] cursor-pointer">
                     <p className="text-sm font-medium text-slate-500 mb-3">{stat.label}</p>
                     <div className="flex items-end justify-between">
                        <span className="text-3xl font-bold text-slate-900 tracking-tight">{stat.val}</span>
                        <div className={`flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-md ${stat.positive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                           {stat.positive ? <ArrowUpRight className="w-3 h-3"/> : null}
                           {stat.trend}
                        </div>
                     </div>
                  </div>
               ))}
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="xl:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="flex justify-between items-center mb-6">
                     <h2 className="font-bold text-lg">Revenue Over Time</h2>
                     <select className="bg-slate-50 border border-slate-200 text-sm font-medium text-slate-600 rounded-lg px-3 py-1.5 outline-none cursor-pointer">
                        <option>Last 30 Days</option>
                        <option>This Year</option>
                     </select>
                  </div>
                  <div className="h-64 border-b border-l border-slate-100 relative flex items-end ml-4 mb-4 pt-4">
                     <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent" style={{clipPath: 'polygon(0 100%, 0 70%, 20% 60%, 40% 40%, 60% 50%, 80% 20%, 100% 10%, 100% 100%)'}} />
                     <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                        <path d="M0 134 L 160 115 L 320 76 L 480 96 L 640 38 L 800 19" stroke="#3b82f6" strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                  </div>
               </motion.div>

               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                  <h2 className="font-bold text-lg mb-6">Recent Activity</h2>
                  <div className="flex-1 space-y-6">
                     {[
                       { title: 'New enterprise deal', time: '10 min ago', color: 'bg-green-500' },
                       { title: 'API deployment scaled', time: '2 hrs ago', color: 'bg-blue-500' },
                       { title: 'Database optimization', time: '5 hrs ago', color: 'bg-purple-500' },
                       { title: 'Weekly report generated', time: '1 day ago', color: 'bg-slate-400' }
                     ].map((log, i) => (
                        <div key={i} className="flex gap-4 relative">
                           {i !== 3 && <div className="absolute top-5 left-1.5 w-px h-full bg-slate-100 -translate-x-1/2" />}
                           <div className="relative mt-1">
                              <div className={`w-3 h-3 rounded-full ${log.color} ring-4 ring-white shadow-sm z-10 relative`} />
                           </div>
                           <div>
                              <p className="text-sm font-medium text-slate-900">{log.title}</p>
                              <p className="text-xs text-slate-500 mt-1">{log.time}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </motion.div>
            </div>
         </div>
      </main>

      {/* Floating Order Button */}
      <motion.button 
        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
        onClick={() => navigate('/order')}
        className="fixed bottom-6 right-6 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold tracking-wide text-sm shadow-2xl hover:bg-slate-800 transition-colors z-50 flex items-center gap-2 border border-slate-700"
      >
        Deploy This Dashboard <ArrowRight className="w-4 h-4" />
      </motion.button>

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-2xl z-[100] font-medium flex items-center gap-2">
            <Info className="w-5 h-5" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
