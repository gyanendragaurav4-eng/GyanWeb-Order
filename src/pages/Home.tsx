import { Link } from 'react-router-dom';
import { ArrowRight, Code, Zap, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import heroBanner from '../assets/images/hero_banner_1780982110625.png';

export default function Home() {
  return (
    <div className="py-12 md:py-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight sm:text-6xl">
          Bring your vision to the web.
        </h1>
        <p className="mt-6 text-xl text-gray-500">
          We build custom, high-performance websites for businesses, creators, and visionaries. 
          Order yours today and track the progress in real-time.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link to="/order" className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 md:py-4 md:text-lg md:px-10">
            Start a Project
          </Link>
          <Link to="/about" className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
            Learn More
          </Link>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="mt-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <img src={heroBanner} alt="Web Design Agency" className="w-full h-auto rounded-3xl shadow-2xl object-cover border border-gray-100" />
      </motion.div>

      <div className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Explore Interactive Samples
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Experience real, working website layouts across various industries. Click to interact with our demo templates.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Food & Restaurant', path: '/demo/food', desc: 'Delicious menus, online ordering, and branch locations.', icon: '🍔' },
            { title: 'Medical & Healthcare', path: '/demo/medical', desc: 'Doctor profiles, hospital services, and appointment bookings.', icon: '⚕️' },
            { title: 'Education & Courses', path: '/demo/education', desc: 'Online classes, instructor profiles, and enrollment flows.', icon: '🎓' },
            { title: 'Business Corporate', path: '/demo/business', desc: 'Professional services, lead generation, and company info.', icon: '🏢' },
            { title: 'E-commerce Store', path: '/demo/e-commerce', desc: 'Product catalogs, shopping carts, and seamless checkout.', icon: '🛍️' },
            { title: 'UX Portfolio', path: '/demo/portfolio', desc: 'Creative galleries, case studies, and dynamic layouts.', icon: '✨' },
            { title: 'Web Application', path: '/demo/web', desc: 'Interactive dashboards, metrics, and complex SaaS interfaces.', icon: '💻' }
          ].map((sample, idx) => (
            <Link key={idx} to={sample.path} className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all flex flex-col items-start relative overflow-hidden">
               <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-bottom-left">{sample.icon}</div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">{sample.title}</h3>
               <p className="text-gray-500 text-sm mb-4 leading-relaxed">{sample.desc}</p>
               <span className="mt-auto text-blue-600 font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform">
                 View Live Demo <ArrowRight className="w-4 h-4 ml-1" />
               </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-24 mb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 inline-flex items-center justify-center rounded-xl bg-gray-50 text-black mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Lightning Fast</h3>
            <p className="text-gray-500">Built with modern frameworks like React and Vite for optimal performance and SEO.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 inline-flex items-center justify-center rounded-xl bg-gray-50 text-black mb-6">
              <Code className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Custom Code</h3>
            <p className="text-gray-500">No templates. We write custom code tailored exactly to your brand's unique requirements.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 inline-flex items-center justify-center rounded-xl bg-gray-50 text-black mb-6">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Secure & Scalable</h3>
            <p className="text-gray-500">Backend infrastructure built to scale with your business and keep your data safe.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
