import React, { useState } from 'react';
import { Calendar, Phone, Activity, Heart, Shield, ArrowRight, CheckCircle, Info, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function MedicalDemo() {
  const [booked, setBooked] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAction = (action: string) => {
    setToast(action);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans overflow-x-hidden text-slate-900">
      <header className="fixed w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 py-4 px-4 sm:px-6 md:px-12 flex justify-between items-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
             <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">NexusHealth</h1>
        </motion.div>
        <div className="hidden lg:flex gap-8 items-center font-medium text-sm text-slate-600">
          {['Specialists', 'Telehealth', 'Patient Portal'].map((item) => (
             <a href="#" key={item} onClick={(e) => { e.preventDefault(); handleAction(`Opening ${item}...`); }} className="hover:text-blue-600 transition-colors">{item}</a>
          ))}
          <button onClick={() => handleAction('Calling Emergency Response...')} className="bg-slate-900 text-white px-6 py-2.5 rounded-full hover:bg-slate-800 transition-all shadow-md">
            Emergency 24/7
          </button>
        </div>
        <button className="lg:hidden" onClick={() => handleAction('Opening Mobile Menu')}>
          <Menu className="w-6 h-6" />
        </button>
      </header>

      <main className="pt-28 sm:pt-32 pb-20 px-4 sm:px-6 md:px-12 max-w-[1400px] mx-auto relative cursor-default">
        <div className="absolute top-0 right-0 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-blue-100 rounded-full blur-[100px] sm:blur-[150px] opacity-50 -z-10 pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-blue-600 font-semibold mb-4 sm:mb-6 uppercase tracking-wider text-xs sm:text-sm">
               <Shield className="w-4 h-4 sm:w-5 sm:h-5" /> Award Winning Care
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight tracking-tighter">
              Next-Gen <br/><span className="text-blue-600">Healthcare</span> Delivery.
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 mb-8 sm:mb-10 max-w-lg leading-relaxed">
              Experience personalized medicine powered by AI diagnostics and world-leading specialists, all tailored to your unique genome.
            </p>
            
            <div className="bg-white p-4 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col sm:flex-row gap-3 max-w-xl">
               <div className="flex-1 px-4 py-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Select Date</p>
                  <input type="date" className="w-full font-bold focus:outline-none bg-transparent" />
               </div>
               <div className="w-px bg-slate-200 hidden sm:block" />
               <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { setBooked(true); handleAction('Appointment Successfully Booked!'); }} className="bg-blue-600 text-white px-8 py-3 sm:py-4 rounded-2xl font-bold flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-blue-600/30">
                 {booked ? <><CheckCircle className="w-5 h-5"/> Confirmed</> : 'Book Visit'}
               </motion.button>
            </div>
            
            <div className="mt-8 sm:mt-12 flex gap-4 sm:gap-8 items-center flex-wrap">
               <div className="flex -space-x-4">
                 {[1,2,3,4].map(i => (
                    <div key={i} className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-bold ring-2 ring-transparent transition-all cursor-pointer bg-cover bg-center`} style={{backgroundImage: `url(https://i.pravatar.cc/100?img=${i+10})`}} />
                 ))}
               </div>
               <div>
                 <div className="flex text-amber-400"><Heart className="w-4 h-4 fill-current"/><Heart className="w-4 h-4 fill-current"/><Heart className="w-4 h-4 fill-current"/><Heart className="w-4 h-4 fill-current"/><Heart className="w-4 h-4 fill-current"/></div>
                 <p className="text-xs sm:text-sm font-bold text-slate-700 mt-1">10k+ Patient Reviews</p>
               </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative h-[600px] w-full hidden lg:block">
            {/* Bento Grid */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-3 gap-6">
               <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 6 }} className="row-span-2 bg-white rounded-3xl p-6 shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-between">
                 <div>
                   <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4"><Activity /></div>
                   <h3 className="font-bold text-xl mb-1">Vitals Scanner</h3>
                   <p className="text-slate-500 text-sm">Real-time sync active</p>
                 </div>
                 <div className="h-32 flex items-end gap-2">
                    {[40, 70, 45, 90, 65, 85].map((h, i) => (
                      <div key={i} className="flex-1 bg-blue-100 rounded-t-md relative overflow-hidden" style={{height: `${h}%`}}>
                         <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 1, delay: i*0.1 }} className="absolute bottom-0 w-full bg-blue-500 rounded-t-md" />
                      </div>
                    ))}
                 </div>
               </motion.div>

               <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl flex items-center justify-between">
                 <div>
                    <p className="text-slate-400 font-medium text-sm mb-1">Next Appointment</p>
                    <p className="font-bold text-xl">Dr. Sarah Jenkins</p>
                    <p className="text-blue-400 font-medium text-sm mt-1">Today, 14:00</p>
                 </div>
                 <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                   <Calendar className="w-8 h-8 text-white" />
                 </div>
               </motion.div>

               <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 7 }} className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
                 <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                 <h3 className="font-bold text-lg mb-1 relative z-10">AI Diagnosis</h3>
                 <p className="text-blue-100 text-sm font-medium mb-4 relative z-10">Scan completed</p>
                 <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 inline-flex items-center gap-2 relative z-10">
                   <CheckCircle className="w-5 h-5" /> <span className="font-bold">All Clear</span>
                 </div>
               </motion.div>
               
               <div className="col-span-2 bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center"><Shield /></div>
                     <div>
                       <h3 className="font-bold text-slate-900">Coverage Active</h3>
                       <p className="text-slate-500 text-sm">Premium Health Plan</p>
                     </div>
                  </div>
                  <button onClick={() => handleAction('Viewing Coverage Details...')} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100">
                    <ArrowRight className="w-5 h-5 text-slate-600" />
                  </button>
               </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      {/* Floating Order Button */}
      <motion.button 
        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
        onClick={() => navigate('/order')}
        className="fixed bottom-6 right-6 bg-slate-900 text-white px-6 py-3 rounded-full font-bold tracking-wide text-sm shadow-2xl hover:bg-slate-800 transition-colors z-50 flex items-center gap-2"
      >
        Order This Template <ArrowRight className="w-4 h-4" />
      </motion.button>

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl z-[100] font-semibold flex items-center gap-2 w-max max-w-[90vw]">
            <Info className="w-5 h-5 text-blue-400 flex-shrink-0" /> <span className="truncate">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
