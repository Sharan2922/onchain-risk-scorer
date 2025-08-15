import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { Shield, BarChart3, Zap, Target } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { RiskAnalysisCard } from './components/RiskAnalysisCard';
import { Dashboard } from './components/Dashboard';
import { RiskScore } from './types/risk';
import { riskApi } from './services/riskApi';
import toast from 'react-hot-toast';

function App() {
  const [currentAnalysis, setCurrentAnalysis] = useState<RiskScore | null>(null);
  const [analyzedAddresses, setAnalyzedAddresses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'analyze' | 'dashboard'>('analyze');

  const handleSearch = async (address: string) => {
    setIsLoading(true);
    try {
      const riskData = await riskApi.analyzeRisk(address);
      setCurrentAnalysis(riskData);
      
      // Add to analyzed addresses if not already present
      if (!analyzedAddresses.includes(address)) {
        setAnalyzedAddresses(prev => [...prev, address]);
      }
      
      toast.success('Risk analysis completed!');
    } catch (error) {
      toast.error('Failed to analyze risk. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'AI Risk Scoring',
      description: 'Advanced algorithms analyze on-chain data for comprehensive risk assessment',
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Real-time Analytics',
      description: 'Live monitoring of liquidity, volatility, and market manipulation patterns',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Instant Analysis',
      description: 'Get immediate risk scores for any token or wallet address',
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Portfolio Insights',
      description: 'Comprehensive portfolio risk assessment with actionable recommendations',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(30, 41, 59, 0.9)',
              color: '#fff',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            },
          }}
        />

        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-6 py-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Web3 Risk Scorer</h1>
                <p className="text-gray-400">AI-Powered On-Chain Risk Analysis</p>
              </div>
            </div>

            {analyzedAddresses.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('analyze')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'analyze'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  Analyze
                </button>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'dashboard'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  Dashboard
                </button>
              </div>
            )}
          </div>
        </motion.header>

        <main className="container mx-auto px-6 pb-12">
          {activeTab === 'analyze' ? (
            <>
              {/* Hero Section */}
              {!currentAnalysis && (
                <motion.section 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center mb-16"
                >
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 mb-6"
                  >
                    Analyze Risk
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
                  >
                    Leverage advanced AI to assess the risk of any Web3 token or smart contract. 
                    Get comprehensive analysis with real-time insights and actionable recommendations.
                  </motion.p>

                  {/* Features Grid */}
                  <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                  >
                    {features.map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-xl w-fit mb-4">
                          {feature.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.section>
              )}

              {/* Search Section */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: currentAnalysis ? 0 : 0.6 }}
                className="mb-12"
              >
                <SearchBar onSearch={handleSearch} isLoading={isLoading} />
              </motion.section>

              {/* Analysis Results */}
              {currentAnalysis && (
                <motion.section
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <RiskAnalysisCard riskData={currentAnalysis} />
                </motion.section>
              )}
            </>
          ) : (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Dashboard addresses={analyzedAddresses} />
            </motion.section>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;