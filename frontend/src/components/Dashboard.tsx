import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, AlertTriangle, Shield } from 'lucide-react';
import { RiskScore, PortfolioRisk, TransactionRisk } from '../types/risk';
import { riskApi } from '../services/riskApi';
import { RiskMeter } from './RiskMeter';
import toast from 'react-hot-toast';

interface DashboardProps {
  addresses: string[];
}

export const Dashboard: React.FC<DashboardProps> = ({ addresses }) => {
  const [portfolioRisk, setPortfolioRisk] = useState<PortfolioRisk | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<TransactionRisk[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (addresses.length > 0) {
      loadDashboardData();
    }
  }, [addresses]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [portfolio, transactions] = await Promise.all([
        riskApi.analyzePortfolio(addresses),
        addresses.length > 0 ? riskApi.getTransactionRisks(addresses[0]) : Promise.resolve([]),
      ]);
      setPortfolioRisk(portfolio);
      setRecentTransactions(transactions);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (!portfolioRisk) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-400">No portfolio data available</p>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRiskColor = (score: number) => {
    if (score <= 25) return 'text-green-400';
    if (score <= 50) return 'text-yellow-400';
    if (score <= 75) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Portfolio Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="p-4 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl mb-4">
              <TrendingUp className="w-8 h-8 text-cyan-400 mx-auto" />
            </div>
            <p className="text-gray-400 text-sm mb-1">Total Portfolio Value</p>
            <p className="text-2xl font-bold text-white">{formatCurrency(portfolioRisk.totalValue)}</p>
          </div>

          <div className="text-center">
            <RiskMeter score={portfolioRisk.averageRisk} size="small" showLabel={false} />
            <p className="text-gray-400 text-sm mb-1">Average Risk Score</p>
            <p className={`text-lg font-semibold ${getRiskColor(portfolioRisk.averageRisk)}`}>
              {portfolioRisk.averageRisk.toFixed(1)}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-gray-400 text-sm">Risk Distribution</p>
            {Object.entries(portfolioRisk.riskDistribution).map(([level, percentage]) => (
              <div key={level} className="flex items-center justify-between">
                <span className="text-gray-300 capitalize text-sm">{level}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        level === 'low' ? 'bg-green-500' :
                        level === 'medium' ? 'bg-yellow-500' :
                        level === 'high' ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-white text-sm font-medium w-8">
                    {Math.round(percentage)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl font-bold text-white">AI Recommendations</h2>
        </div>
        
        <div className="space-y-4">
          {portfolioRisk.recommendations.map((recommendation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="flex items-start gap-3 p-4 bg-black/20 rounded-xl"
            >
              <div className="p-1 bg-cyan-500/20 rounded-full mt-0.5">
                <div className="w-2 h-2 bg-cyan-400 rounded-full" />
              </div>
              <p className="text-gray-300 leading-relaxed">{recommendation}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Transactions */}
      {recentTransactions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Recent Transaction Risks</h2>
          
          <div className="space-y-4">
            {recentTransactions.map((tx, index) => (
              <div key={tx.hash} className="p-4 bg-black/20 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      tx.riskScore <= 25 ? 'bg-green-500' :
                      tx.riskScore <= 50 ? 'bg-yellow-500' :
                      tx.riskScore <= 75 ? 'bg-orange-500' : 'bg-red-500'
                    }`} />
                    <span className="text-white font-mono text-sm">
                      {tx.hash}
                    </span>
                  </div>
                  <span className={`text-sm font-semibold ${getRiskColor(tx.riskScore)}`}>
                    Risk: {tx.riskScore}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Value</p>
                    <p className="text-white">{tx.value} ETH</p>
                  </div>
                  <div>
                    <p className="text-gray-400">To</p>
                    <p className="text-white font-mono">
                      {tx.to.slice(0, 8)}...{tx.to.slice(-6)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Time</p>
                    <p className="text-white">
                      {new Date(tx.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                
                {tx.riskFactors.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-600">
                    <p className="text-gray-400 text-xs mb-2">Risk Factors:</p>
                    <div className="flex flex-wrap gap-2">
                      {tx.riskFactors.map((factor, i) => (
                        <span key={i} className="bg-red-500/20 text-red-300 px-2 py-1 rounded text-xs">
                          {factor}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};