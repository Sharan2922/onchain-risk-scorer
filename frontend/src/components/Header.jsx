import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, BarChart3 } from "lucide-react";

export default function Header() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-white/10 backdrop-blur-lg"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Onchain Risk Scorer</h1>
              <p className="text-xs text-gray-400">AI-Powered Transaction Analysis</p>
            </div>
          </Link>
          
          <nav className="flex items-center gap-2">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                isActive('/') 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </Link>
            <Link 
              to="/about" 
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                isActive('/about') 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}