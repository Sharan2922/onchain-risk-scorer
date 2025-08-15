import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTransactions, scoreTransactions } from "../api";
import { CheckCircle, Circle, ExternalLink, Zap, TrendingUp, Clock, DollarSign } from "lucide-react";
import RiskBadge from "../components/RiskBadge";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
      toast.success("Transactions loaded successfully!");
    } catch (error) {
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  const toggleSelect = (tx) => {
    setSelected((prev) =>
      prev.includes(tx) ? prev.filter((t) => t !== tx) : [...prev, tx]
    );
  };

  const selectAll = () => {
    setSelected(selected.length === transactions.length ? [] : [...transactions]);
  };

  const analyzeRisk = async () => {
    setAnalyzing(true);
    try {
      const res = await scoreTransactions(selected);
      setAnalysis(res);
      toast.success("Risk analysis completed!");
    } catch (error) {
      toast.error("Failed to analyze risk");
    } finally {
      setAnalyzing(false);
    }
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatValue = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseFloat(value));
  };

  const formatTime = (timestamp) => {
    return new Date(parseInt(timestamp) * 1000).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading transactions..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 mb-2">
            Transaction Dashboard
          </h1>
          <p className="text-gray-400">
            Analyze blockchain transactions with AI-powered risk scoring
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/20 rounded-xl">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Transactions</p>
                <p className="text-white text-xl font-bold">{transactions.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-xl">
                <CheckCircle className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Selected</p>
                <p className="text-white text-xl font-bold">{selected.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-xl">
                <DollarSign className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Value</p>
                <p className="text-white text-xl font-bold">
                  {formatValue(transactions.reduce((sum, tx) => sum + parseFloat(tx.value), 0))}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/20 rounded-xl">
                <Clock className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Latest</p>
                <p className="text-white text-sm font-medium">
                  {transactions.length > 0 ? formatTime(Math.max(...transactions.map(tx => parseInt(tx.timeStamp)))) : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <button
            onClick={selectAll}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-medium transition-all duration-300"
          >
            {selected.length === transactions.length ? 'Deselect All' : 'Select All'}
          </button>
          
          <motion.button
            onClick={analyzeRisk}
            disabled={selected.length === 0 || analyzing}
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-xl transition-all duration-300 disabled:cursor-not-allowed flex items-center gap-2"
            whileHover={{ scale: selected.length > 0 ? 1.05 : 1 }}
            whileTap={{ scale: selected.length > 0 ? 0.95 : 1 }}
          >
            {analyzing ? (
              <>
                <LoadingSpinner size="small" text="" />
                Analyzing...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Analyze Risk ({selected.length})
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Transactions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/20 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={selectAll}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {selected.length === transactions.length ? (
                        <CheckCircle className="w-5 h-5 text-cyan-400" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">From</th>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">To</th>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">Value</th>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">Time</th>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">Hash</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {transactions.map((tx, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`border-b border-white/5 hover:bg-white/5 transition-all duration-300 ${
                        selected.includes(tx) ? 'bg-cyan-500/10 border-cyan-500/20' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleSelect(tx)}
                          className="text-gray-300 hover:text-white transition-colors"
                        >
                          {selected.includes(tx) ? (
                            <CheckCircle className="w-5 h-5 text-cyan-400" />
                          ) : (
                            <Circle className="w-5 h-5" />
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white font-mono text-sm">
                          {formatAddress(tx.from)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white font-mono text-sm">
                          {formatAddress(tx.to)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-green-400 font-semibold">
                          {formatValue(tx.value)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-300 text-sm">
                          {formatTime(tx.timeStamp)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={`https://etherscan.io/tx/${tx.hash}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors font-mono text-sm"
                        >
                          {formatAddress(tx.hash)}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Risk Analysis Results */}
        <AnimatePresence>
          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="mt-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">AI Risk Analysis</h2>
                <RiskBadge level={analysis.riskLevel} score={analysis.riskScore} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Analysis Summary</h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {analysis.riskAnalysis}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-md font-semibold text-white mb-3">Risk Factors</h4>
                    <div className="space-y-2">
                      {analysis.factors?.map((factor, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-2 text-gray-300 text-sm"
                        >
                          <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                          {factor}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Recommendations</h3>
                  <div className="space-y-3 mb-6">
                    {analysis.recommendations?.map((rec, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 bg-black/20 rounded-xl border border-white/10"
                      >
                        <p className="text-gray-300 text-sm">{rec}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-xl border border-cyan-500/20">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Confidence Level</span>
                      <span className="text-cyan-400 font-semibold">
                        {analysis.confidence?.toFixed(1)}%
                      </span>
                    </div>
                    <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${analysis.confidence}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}