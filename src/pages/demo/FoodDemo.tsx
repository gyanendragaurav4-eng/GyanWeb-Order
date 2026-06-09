import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Star, ChevronRight, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function FoodDemo() {
  const [cart, setCart] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAction = (action: string) => {
    setToast(action);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-4 flex justify-between items-center transition-all">
        <div className="flex items-center gap-4">
          <button className="md:hidden" onClick={() => handleAction('Opening Mobile Menu')}><Menu className="w-6 h-6" /></button>
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-xl sm:text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
            TASTE<span className="text-white">BITES</span>
          </motion.h1>
        </div>
        <div className="flex items-center gap-4 sm:gap-8">
          <div className="hidden md:flex gap-8 items-center">
            {['Menu', 'Locations', 'About'].map((item, i) => (
               <motion.a onClick={(e) => { e.preventDefault(); handleAction(`Navigating to ${item}...`); }} key={item} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} href="#" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors uppercase tracking-widest">{item}</motion.a>
            ))}
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold shadow-lg shadow-orange-500/20 text-sm sm:text-base" onClick={() => handleAction(`Opening Cart with ${cart} items...`)}>
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" /> <span className="hidden sm:inline">CART</span> ({cart})
          </motion.button>
        </div>
      </header>

      <main className="relative pt-28 sm:pt-32 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
         {/* Abstract background blobs */}
         <div className="absolute top-20 left-10 w-64 h-64 sm:w-96 sm:h-96 bg-orange-600/20 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />
         <div className="absolute top-40 right-10 w-64 h-64 sm:w-[30rem] sm:h-[30rem] bg-red-600/10 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 sm:mb-8 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-xs sm:text-sm font-medium tracking-wide">Voted #1 Online Delivery</span>
               </div>
               <h2 className="text-5xl sm:text-6xl md:text-8xl font-black mb-4 sm:mb-6 leading-[0.9] tracking-tighter">
                  THE ART<br/>OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">TASTE.</span>
               </h2>
               <p className="text-base md:text-xl text-gray-400 mb-8 sm:mb-10 max-w-lg font-light leading-relaxed">
                 Experience culinary excellence delivered instantly. Crafted by Michelin-star chefs, brought to your door in minutes.
               </p>
               <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                  <motion.button onClick={() => handleAction('Scrolling to Full Menu...')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white text-black px-6 sm:px-8 py-4 rounded-full font-black tracking-widest text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors w-full sm:w-auto">
                    EXPLORE MENU <ChevronRight className="w-5 h-5" />
                  </motion.button>
                  <motion.button onClick={() => handleAction('Opening Maps for Locations...')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 sm:px-8 py-4 rounded-full font-bold tracking-widest text-xs sm:text-sm border border-white/20 hover:bg-white/5 transition-colors text-center w-full sm:w-auto">
                    VIEW LOCATIONS
                  </motion.button>
               </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: 'easeOut' }} className="relative h-[400px] sm:h-[600px] flex items-center justify-center">
               <motion.div animate={{ y: [0, -20, 0], rotateZ: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }} className="relative z-10 w-full max-w-[280px] sm:max-w-md aspect-square rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/5 border border-white/10 backdrop-blur-3xl flex items-center justify-center shadow-2xl shadow-orange-500/10">
                  <div className="text-[100px] sm:text-[150px] drop-shadow-2xl">🍜</div>
               </motion.div>
               <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }} className="absolute top-10 sm:top-20 right-0 sm:right-0 bg-white/10 backdrop-blur-md border border-white/20 p-3 sm:p-4 rounded-2xl flex items-center gap-2 sm:gap-3">
                  <Clock className="text-orange-400 w-5 h-5 sm:w-6 sm:h-6" />
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-400 font-medium">Delivery Time</p>
                    <p className="text-xs sm:text-base text-white font-bold">15-20 Min</p>
                  </div>
               </motion.div>
               <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 2 }} className="absolute bottom-10 sm:bottom-20 left-0 bg-white/10 backdrop-blur-md border border-white/20 p-3 sm:p-4 rounded-2xl flex items-center gap-2 sm:gap-3">
                  <Star className="text-yellow-400 w-5 h-5 sm:w-6 sm:h-6 fill-yellow-400" />
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-400 font-medium">Rating</p>
                    <p className="text-xs sm:text-base text-white font-bold">4.9 / 5.0</p>
                  </div>
               </motion.div>
            </motion.div>
         </div>

         <div className="mt-20 sm:mt-32 pb-16">
            <h3 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 tracking-tight">Trending Now</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
               {[
                 { name: 'Wagyu Burger', price: '$24', img: '🍔', desc: 'Truffle mayo, aged cheddar, brioche' },
                 { name: 'Spicy Ramen', price: '$18', img: '🍜', desc: 'Pork broth, soft egg, chili oil' },
                 { name: 'Toro Sushi', price: '$32', img: '🍣', desc: 'Bluefin tuna, freshly grated wasabi' }
               ].map((item, idx) => (
                 <motion.div key={idx} whileHover={{ y: -5 }} className="group relative bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 overflow-hidden backdrop-blur-sm cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-b from-orange-500/0 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="text-6xl sm:text-7xl mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform origin-bottom">{item.img}</div>
                    <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">{item.name}</h4>
                    <p className="text-gray-400 text-sm mb-6 max-w-[80%]">{item.desc}</p>
                    <div className="flex justify-between items-end">
                       <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">{item.price}</span>
                       <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={(e) => { e.stopPropagation(); setCart(c => c + 1); handleAction(`Added ${item.name} to Cart`); }} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-lg">
                         +
                       </motion.button>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </main>

      {/* Floating Order Button */}
      <motion.button 
        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
        onClick={() => navigate('/order')}
        className="fixed bottom-6 right-6 bg-white text-black px-6 py-3 rounded-full font-black tracking-widest text-[10px] sm:text-sm shadow-2xl hover:bg-gray-200 transition-colors z-50 flex items-center gap-2"
      >
        ORDER TEMPLATE <ChevronRight className="w-4 h-4" />
      </motion.button>

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white text-black px-4 sm:px-6 py-3 rounded-full shadow-2xl z-[100] font-bold flex items-center gap-2 text-xs sm:text-sm w-max max-w-[90vw]">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" /> <span className="truncate">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
