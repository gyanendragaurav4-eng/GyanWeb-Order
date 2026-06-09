import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, BarChart3, Globe2, ShieldCheck, Zap, Info, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BusinessDemo() {
  const [toast, setToast] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAction = (action: string) => {
    setToast(action);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden">
       <nav className="border-b border-white/10 p-4 md:p-6 flex justify-between items-center max-w-7xl mx-auto">
          <div className="font-bold text-xl tracking-tighter">CORP<span className="text-gray-500">OS</span></div>
          <div className="flex items-center gap-4">
            <button onClick={() => handleAction('Opening Sales Chat...')} className="hidden sm:block bg-white text-black px-5 py-2 rounded-md font-medium text-sm hover:bg-gray-200 transition-colors">Contact Sales</button>
            <button className="sm:hidden" onClick={() => handleAction('Opening Mobile Menu')}><Menu className="w-6 h-6" /></button>
          </div>
       </nav>
       
       <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
             <div>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight mb-6 sm:mb-8 leading-[1.1]">
                   The operating system for modern enterprise.
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-10 leading-relaxed font-light">
                   Unify your teams, automate workflows, and scale globally with our SOC-2 compliant platform.
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-4">
                   <button onClick={() => handleAction('Initiating Free Trial Registration...')} className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
                      Start free trial <ArrowRight className="w-4 h-4" />
                   </button>
                   <button onClick={() => handleAction('Navigating to Documentation area...')} className="px-6 py-3 rounded-md font-medium border border-white/20 hover:bg-white/5 transition-colors">
                      Read Documentation
                   </button>
                </motion.div>
             </div>
             
             {/* Bento Grid Concept */}
             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-auto lg:h-[500px] mb-32 lg:mb-0">
                <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6 flex flex-col justify-between min-h-[200px]">
                   <Globe2 className="w-8 h-8 text-blue-400 mb-4" />
                   <div>
                     <h3 className="font-medium text-lg mb-1">Global Edge</h3>
                     <p className="text-sm text-gray-500">Deploy anywhere in milliseconds.</p>
                   </div>
                </div>
                <div className="bg-blue-600 rounded-2xl p-6 flex flex-col justify-between text-white shadow-2xl shadow-blue-900/50 min-h-[200px]">
                   <Zap className="w-8 h-8 opacity-80 mb-4" />
                   <div>
                     <h3 className="font-medium text-lg mb-1">Lightning Fast</h3>
                     <p className="text-sm text-blue-200">Built on Rust & WebAssembly.</p>
                   </div>
                </div>
                <div className="col-span-1 sm:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-2xl p-6 relative overflow-hidden min-h-[240px]">
                   <div className="absolute right-0 bottom-0 opacity-10 hidden sm:block">
                     <BarChart3 className="w-64 h-64 -mb-10 -mr-10" />
                   </div>
                   <ShieldCheck className="w-8 h-8 text-green-400 mb-8 sm:mb-16 relative z-10" />
                   <h3 className="font-medium text-xl mb-2 relative z-10">Enterprise Security</h3>
                   <p className="text-gray-400 max-w-sm relative z-10 text-sm sm:text-base">End-to-end encryption, advanced RBAC, and comprehensive audit logs standard on all tiers.</p>
                </div>
             </motion.div>
          </div>
       </main>

       {/* Floating Order Button */}
       <motion.button 
        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
        onClick={() => navigate('/order')}
        className="fixed bottom-6 right-6 bg-white text-black px-6 py-3 rounded-md font-bold tracking-wide text-sm shadow-2xl hover:bg-gray-200 transition-colors z-50 flex items-center gap-2 border border-white"
      >
        Order This Template <ArrowRight className="w-4 h-4" />
      </motion.button>

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-md shadow-2xl z-[100] font-semibold flex items-center gap-2">
            <Info className="w-5 h-5" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
