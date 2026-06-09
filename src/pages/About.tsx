import { motion } from 'motion/react';
import servicesIllustration from '../assets/images/services_illustration_1780982127098.png';

export default function About() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
      
      <div className="mb-12">
        <img src={servicesIllustration} alt="Our Services" className="w-full h-auto rounded-3xl shadow-xl border border-gray-100 object-cover" />
      </div>

      <div className="prose prose-lg text-gray-600 max-w-none">
        <p className="mb-6">
          Gyan Web Order is a premium web development agency specializing in custom React applications, E-commerce platforms, and marketing websites.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Our Services</h2>
        <ul className="space-y-4 mb-8">
          <li className="flex items-start">
            <span className="bg-gray-100 p-1 rounded mr-3 mt-1">💼</span>
            <div>
              <strong className="text-gray-900 block">Business Websites</strong>
              Professional, high-converting platforms for agencies and consultants.
            </div>
          </li>
          <li className="flex items-start">
            <span className="bg-gray-100 p-1 rounded mr-3 mt-1">🛒</span>
            <div>
              <strong className="text-gray-900 block">E-Commerce</strong>
              Scalable online stores with seamless payment integration.
            </div>
          </li>
          <li className="flex items-start">
            <span className="bg-gray-100 p-1 rounded mr-3 mt-1">🎨</span>
            <div>
              <strong className="text-gray-900 block">Portfolios</strong>
              Showcase your work with stunning, bespoke interactive designs.
            </div>
          </li>
        </ul>
        
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How to Pay?</h2>
        <p className="mb-6">
          We offer a streamlined payment process for your orders. Once you complete the project details form and choose your budget, you will see a secure payment screen with the following options:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-8">
          <li><strong>Direct UPI Link:</strong> Select the "Pay via UPI App" button out to launch your preferred payment application directly (only on mobiles).</li>
          <li><strong>Scan the QR Code:</strong> Use any UPI-enabled payment app (GPay, PhonePe, Paytm, etc.) to scan the digital QR code shown on-screen.</li>
          <li><strong>Copy UPI ID:</strong> Click to copy our UPI ID (<span className="bg-gray-100 text-gray-800 font-mono px-2 py-1 rounded text-sm">9162415380-3@ybl</span>) to securely complete the transfer in your payment portal.</li>
        </ul>
        <p className="mb-8">
          Once your payment is successful, simply click <strong>"I Have Completed the Payment"</strong> to notify us and submit your order details into our system!
        </p>
        
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Contact Details</h2>
        <p>
          Email: <a href="mailto:gyanendragaurav4@gmail.com" className="text-blue-600 hover:underline">gyanendragaurav4@gmail.com</a><br />
          Phone: <a href="tel:+919162415380" className="text-blue-600 hover:underline">+91 9162415380</a>
        </p>
      </div>
    </motion.div>
  );
}
