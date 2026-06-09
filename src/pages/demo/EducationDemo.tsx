import React, { useState } from 'react';
import { BookOpen, Award, PlayCircle, Search, Laptop, ArrowRight, CheckCircle2, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function EducationDemo() {
  const [enrolled, setEnrolled] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAction = (action: string) => {
    setToast(action);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-black font-sans text-white overflow-x-hidden py-6 sm:py-10 selection:bg-indigo-500/30">
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-black to-black -z-10 pointer-events-none" />
       
       <header className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center mb-12 sm:mb-20">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="font-bold text-xl sm:text-2xl flex items-center gap-2 sm:gap-3">
             <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center"><BookOpen className="w-4 h-4 sm:w-5 sm:h-5" /></div>
             Novalearn
          </motion.div>
          <div className="hidden lg:flex gap-1 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
             {['Explore', 'Mentors', 'Paths', 'Pricing'].map((item) => (
               <button key={item} onClick={() => handleAction(`Navigating to ${item}...`)} className="px-6 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                  {item}
               </button>
             ))}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => handleAction('Opening Login Modal...')} className="hidden sm:block bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm tracking-wide hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-shadow">
               Login
            </button>
            <button className="lg:hidden text-white" onClick={() => handleAction('Opening Mobile Menu')}><Menu className="w-6 h-6" /></button>
          </div>
       </header>

       <main className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20 relative px-2">
             <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, ease: 'easeOut' }} className="absolute -top-40 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-indigo-600/30 blur-[80px] sm:blur-[120px] rounded-full -z-10" />
             
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-medium text-xs sm:text-sm mb-6 sm:mb-8">
               <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" /> Spring 2026 Enrollments Open
             </motion.div>
             
             <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter mb-6 sm:mb-8 leading-tight">
               Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Future.</span>
             </motion.h1>
             
             <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-base sm:text-xl text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
               Elite technology education delivered by industry leaders. Build production-grade applications, not just toy projects.
             </motion.p>
             
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg flex items-center justify-center gap-2 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/25" onClick={() => { setEnrolled(true); handleAction(enrolled ? 'Opening Student Dashboard...' : 'Successfully Enrolled in Free Trial!'); }}>
                  {enrolled ? 'Access Dashboard' : 'Start Learning Free'} <ArrowRight className="w-5 h-5" />
                </button>
                <button onClick={() => handleAction('Playing Curriculum Video...')} className="bg-white/5 border border-white/10 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg flex items-center justify-center gap-2 hover:bg-white/10 transition-colors backdrop-blur-md">
                  <PlayCircle className="w-5 h-5" /> Watch Curriculum
                </button>
             </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative pb-24">
             {[
               { icon: <Laptop className="text-blue-400"/>, title: 'Engineering', desc: 'Full-stack, Systems, DevOps and Cloud Architecture.' },
               { icon: <Search className="text-purple-400"/>, title: 'Machine Learning', desc: 'Neural Networks, NLP, and Computer Vision applied.' },
               { icon: <Award className="text-amber-400"/>, title: 'Design & UX', desc: 'Interaction design, spatial UI, and user psychology.' }
             ].map((path, i) => (
                <motion.div onClick={() => handleAction(`Exploring ${path.title} Path...`)} key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + (i * 0.1) }} className="group p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer">
                   <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 max-w-max group-hover:scale-110 transition-transform">
                     {path.icon}
                   </div>
                   <h3 className="text-xl font-bold mb-3">{path.title}</h3>
                   <p className="text-gray-400 line-clamp-2">{path.desc}</p>
                </motion.div>
             ))}
          </div>
       </main>

       {/* Floating Order Button */}
       <motion.button 
        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
        onClick={() => navigate('/order')}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white px-6 py-3 rounded-full font-bold tracking-wide text-sm shadow-2xl hover:bg-indigo-500 transition-colors z-50 flex items-center gap-2 border border-indigo-400"
      >
        Build This Template <ArrowRight className="w-4 h-4" />
      </motion.button>

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-3 rounded-full shadow-2xl z-[100] font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-500" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
