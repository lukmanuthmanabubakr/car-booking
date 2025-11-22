import React from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { Car, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-32">
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-gray-700">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary p-2 rounded-lg">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">bookNow</span>
            </div>
            <p className="text-gray-400 mb-6">
              Your trusted partner for premium car rentals. Experience luxury and comfort with our extensive fleet.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[assets.facebook_logo, assets.instagram_logo, assets.twitter_logo, assets.gmail_logo].map(
                (icon, idx) => (
                  <motion.a
                    key={idx}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-primary flex items-center justify-center transition-all"
                  >
                    <img src={icon} alt="social" className="w-4 h-4 brightness-0 invert" />
                  </motion.a>
                )
              )}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-primary transition-colors">Home</a></li>
              <li><a href="/cars" className="text-gray-400 hover:text-primary transition-colors">Browse Cars</a></li>
              <li><a href="/list" className="text-gray-400 hover:text-primary transition-colors">List Your Car</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</a></li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/help" className="text-gray-400 hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="/insurance" className="text-gray-400 hover:text-primary transition-colors">Insurance</a></li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  1234 Luxury Drive, San Francisco, CA 94107
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+12345685343" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  +1 234 5685 343
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:info@booknow.com" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  info@booknow.com
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
        >
          <p className="text-gray-400 text-sm">
            © {currentYear} <span className="text-white font-semibold">bookNow</span>. All rights reserved.
          </p>
          <ul className="flex items-center gap-6 text-sm">
            <li><a href="/privacy" className="text-gray-400 hover:text-primary transition-colors">Privacy</a></li>
            <li className="text-gray-600">|</li>
            <li><a href="/terms" className="text-gray-400 hover:text-primary transition-colors">Terms</a></li>
            <li className="text-gray-600">|</li>
            <li><a href="/sitemap" className="text-gray-400 hover:text-primary transition-colors">Sitemap</a></li>
          </ul>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;