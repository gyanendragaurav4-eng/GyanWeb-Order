import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Search, Menu, CheckCircle2, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EcommerceDemo() {
  const [activeImg, setActiveImg] = useState(0);
  const [activeColor, setActiveColor] = useState(0);
  const [activeSize, setActiveSize] = useState('M');
  const [toast, setToast] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAction = (action: string) => {
    setToast(action);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-neutral-100 font-sans text-neutral-900 flex flex-col pt-20 lg:pt-0 lg:block">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none lg:mix-blend-difference text-black lg:text-white border-b border-neutral-200 lg:border-none p-4 lg:p-6 flex justify-between items-center transition-colors">
        <Menu onClick={() => handleAction('Toggle Menu')} className="w-6 h-6 cursor-pointer" />
        <div className="text-xl lg:text-2xl font-black uppercase tracking-widest">Minimal</div>
        <div className="flex gap-4">
          <Search onClick={() => handleAction('Opening Search')} className="w-6 h-6 cursor-pointer" />
          <ShoppingBag onClick={() => handleAction('Opening Bag')} className="w-6 h-6 cursor-pointer" />
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row min-h-0 lg:min-h-screen">
        <div className="flex-1 lg:h-screen bg-[#e5e5e5] relative overflow-hidden flex items-center justify-center p-8 lg:p-0 min-h-[50vh] lg:min-h-0 order-1 lg:order-1">
           <motion.div key={activeImg} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="w-full max-w-[280px] lg:w-3/4 lg:max-w-md aspect-[3/4] bg-neutral-300 shadow-2xl rounded-sm object-cover overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-neutral-400/50 to-transparent mix-blend-overlay" />
              <div className="w-full h-full opacity-20" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 20px)'}} />
           </motion.div>
           <div className="absolute bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 flex gap-4">
             {[0,1,2].map(i => (
               <button key={i} onClick={() => setActiveImg(i)} className={`w-3 h-3 rounded-full transition-all ${activeImg === i ? 'bg-black scale-125' : 'bg-black/30'}`} />
             ))}
           </div>
        </div>
        
        <div className="flex-1 bg-white p-6 md:p-10 lg:p-20 flex flex-col justify-center min-h-0 lg:h-screen lg:overflow-y-auto order-2 lg:order-2 pb-32 lg:pb-20">
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <p className="text-xs md:text-sm font-bold text-neutral-400 tracking-widest uppercase mb-2 lg:mb-4">New Arrival</p>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-4 lg:mb-6">
                Wool<br/>Cashmere<br/>Overcoat.
              </h1>
              <p className="text-2xl font-medium mb-8">$895.00</p>
              
              <div className="mb-8">
                <p className="font-medium mb-3">Color: {['Black', 'Stone', 'Amber'][activeColor]}</p>
                <div className="flex gap-3">
                  {['bg-black', 'bg-stone-300', 'bg-amber-800'].map((bg, idx) => (
                    <button key={idx} onClick={() => setActiveColor(idx)} className={`w-8 h-8 rounded-full ${bg} ${activeColor === idx ? 'ring-2 ring-offset-2 ring-black' : ''}`} />
                  ))}
                </div>
              </div>
              
               <div className="mb-10">
                <div className="flex justify-between font-medium mb-3">
                  <span>Size</span>
                  <span onClick={() => handleAction('Opening Size Guide')} className="text-neutral-500 underline cursor-pointer hover:text-black">Size Guide</span>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {['S', 'M', 'L', 'XL'].map(s => (
                    <button key={s} onClick={() => setActiveSize(s)} className={`py-3 border rounded-sm font-medium transition-colors ${activeSize === s ? 'border-black bg-black text-white' : 'border-neutral-200 hover:border-black'}`}>{s}</button>
                  ))}
                </div>
              </div>

              <button onClick={() => handleAction('Added to Bag')} className="w-full bg-black text-white py-5 font-bold uppercase tracking-widest text-sm hover:bg-neutral-800 transition-colors">
                 Add to Bag
              </button>
           </motion.div>
        </div>
      </main>

      {/* Floating Order Button */}
      <motion.button 
        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
        onClick={() => navigate('/order')}
        className="fixed bottom-6 right-6 bg-white text-black px-6 py-3 rounded-full font-bold tracking-widest uppercase text-sm shadow-2xl hover:bg-gray-200 transition-colors z-50 flex items-center gap-2 border border-neutral-200"
      >
        Build This Setup <ChevronRight className="w-4 h-4" />
      </motion.button>

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full shadow-2xl z-[100] font-bold flex items-center gap-2 uppercase text-xs tracking-widest">
            <CheckCircle2 className="w-4 h-4" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
