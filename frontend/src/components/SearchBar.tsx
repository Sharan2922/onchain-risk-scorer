import React, { useState } from 'react';
import { Search, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  onSearch: (address: string) => void;
  isLoading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading = false }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleExampleClick = (address: string) => {
    setSearchTerm(address);
    onSearch(address);
  };

  const exampleAddresses = [
    { name: 'USDC', address: '0xA0b86a33E6441b411b44e2b0deD0F1031b18a607' },
    { name: 'WETH', address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1' },
    { name: 'LINK', address: '0xf97f4df75117a78c1A5a0DBb814Af92458539FB4' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter token address or contract address..."
            className="w-full pl-12 pr-32 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
          />
          <motion.button
            type="submit"
            disabled={isLoading || !searchTerm.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </motion.button>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <span className="text-gray-400 text-sm mr-2">Try examples:</span>
        {exampleAddresses.map((example) => (
          <button
            key={example.address}
            onClick={() => handleExampleClick(example.address)}
            className="inline-flex items-center gap-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-1 text-sm text-gray-300 hover:text-white transition-all duration-300"
          >
            <TrendingUp className="w-3 h-3" />
            {example.name}
          </button>
        ))}
      </div>
    </div>
  );
};