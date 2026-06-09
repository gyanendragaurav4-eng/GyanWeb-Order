import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ArrowRight, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PortfolioDemo() {
  const [toast, setToast] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAction = (action: string) => {
    setToast(action);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#111] text-[#eee] font-sans selection:bg-white selection:text-black overflow-x-hidden">
      <nav className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between gap-2 sm:gap-0 font-medium text-xs sm:text-sm tracking-widest uppercase mix-blend-difference z-50 relative">
        <span>© 2026</span>
        <span>Independent UI/UX Director</span>
        <span className="hidden sm:inline">Based in TOKYO</span>
      </nav>

      <main className="px-6 sm:px-8 pb-32">
         <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="mt-20 sm:mt-32 mb-20 sm:mb-40">
           <h1 className="text-[14vw] sm:text-[10vw] font-black leading-[0.8] tracking-tighter uppercase mix-blend-difference relative z-10">
             CRAFTING <br/>DIGITAL<br/>FUTURE.
           </h1>
           <div className="absolute top-[10%] sm:top-1/4 right-10 sm:right-20 w-[40vw] sm:w-[30vw] h-[50vw] sm:h-[40vw] bg-zinc-800 rounded-sm overflow-hidden brightness-75 contrast-125 saturate-0">
             <div className="w-full h-full" style={{backgroundImage: 'repeating-radial-gradient(circle at 0 0, transparent 0, #111 20px), repeating-linear-gradient(#222, #222)'}} />
           </div>
         </motion.div>

         <div className="space-y-4 max-w-5xl relative z-20">
            {['Aura Architecture', 'Neon Synthesis', 'Quantum Commerce', 'Lunar Interface'].map((title, i) => (
               <motion.div onClick={() => handleAction(`Opening Project Case Study: ${title}...`)} key={i} whileHover={{ x: 20 }} className="group border-t border-zinc-800 pt-4 cursor-pointer flex flex-col sm:flex-row sm:justify-between sm:items-end pb-8 gap-4 sm:gap-0">
                  <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-zinc-500 group-hover:text-white transition-colors">{title}</h2>
                  <div className="flex items-center justify-between sm:justify-start gap-8">
                    <span className="text-xs sm:text-sm font-medium tracking-widest uppercase text-zinc-600 group-hover:text-zinc-400">Interaction</span>
                    <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 sm:opacity-0 sm:-translate-y-4 sm:-translate-x-4 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-zinc-500 group-hover:text-white" />
                  </div>
               </motion.div>
            ))}
         </div>
      </main>

      {/* Floating Order Button */}
      <motion.button 
        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
        onClick={() => navigate('/order')}
        className="fixed bottom-6 right-4 sm:right-6 bg-white text-black px-4 sm:px-6 py-3 font-bold tracking-widest uppercase text-xs sm:text-sm shadow-2xl hover:bg-gray-200 transition-colors z-50 flex items-center gap-2"
      >
        <span className="hidden sm:inline">Request Similar Build</span><span className="sm:hidden">Similar Build</span> <ArrowRight className="w-4 h-4" />
      </motion.button>

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white text-black px-4 sm:px-6 py-3 shadow-2xl z-[100] font-bold flex items-center gap-2 uppercase tracking-widest text-[10px] sm:text-xs w-max max-w-[90vw]">
            <Info className="w-4 h-4 flex-shrink-0" /> <span className="truncate">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
