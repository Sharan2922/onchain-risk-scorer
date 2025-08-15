import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Copy, ExternalLink } from 'lucide-react';
import { RiskScore } from '../types/risk';
import { RiskMeter } from './RiskMeter';
import { RiskFactorsChart } from './RiskFactorsChart';
import toast from 'react-hot-toast';

interface RiskAnalysisCardProps {
  riskData: RiskScore;
}

export const RiskAnalysisCard: React.FC<RiskAnalysisCardProps> = ({ riskData }) => {
  const copyAddress = () => {
    navigator.clipboard.writeText(riskData.address);
    toast.success('Address copied to clipboard!');
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low':
        return <Shield className="w-5 h-5 text-green-400" />;
      case 'medium':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-orange-400" />;
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      default:
        return <Shield className="w-5 h-5 text-gray-400" />;
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Risk Analysis</h3>
          <div className="flex items-center gap-3">
            <span className="text-gray-300">{formatAddress(riskData.address)}</span>
            <button
              onClick={copyAddress}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getRiskIcon(riskData.riskLevel)}
          <span className="text-gray-300 text-sm">
            Updated {new Date(riskData.lastUpdated).toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Risk Score and Token Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="text-center">
          <RiskMeter score={riskData.overallScore} size="large" />
          <div className="mt-4">
            <p className="text-gray-300 text-sm">Confidence Level</p>
            <p className="text-white font-semibold">{riskData.confidence.toFixed(1)}%</p>
          </div>
        </div>

        <div className="space-y-4">
          {riskData.tokenSymbol && (
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Token Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Symbol:</span>
                  <span className="text-white font-semibold">{riskData.tokenSymbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Name:</span>
                  <span className="text-white">{riskData.tokenName}</span>
                </div>
              </div>
            </div>
          )}

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Risk Factors</h4>
            <div className="space-y-3">
              {Object.entries(riskData.factors).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm capitalize">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          value <= 25 ? 'bg-green-500' :
                          value <= 50 ? 'bg-yellow-500' :
                          value <= 75 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <span className="text-white text-sm font-medium w-8">
                      {Math.round(value)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Risk Factors Chart */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-white mb-4">Risk Factors Distribution</h4>
        <div className="bg-black/20 rounded-2xl p-4">
          <RiskFactorsChart factors={riskData.factors} />
        </div>
      </div>

      {/* AI Insights */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">AI-Powered Insights</h4>
        <div className="space-y-3">
          {riskData.aiInsights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start gap-3 p-4 bg-black/20 rounded-xl"
            >
              <AlertTriangle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <p className="text-gray-300 text-sm leading-relaxed">{insight}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};