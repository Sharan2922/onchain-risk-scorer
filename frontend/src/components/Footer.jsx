import { motion } from "framer-motion";
import { Heart, Github, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-t border-white/10"
    >
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <span>© 2025 Onchain Risk Scorer</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-400" /> for Web3 Security
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}