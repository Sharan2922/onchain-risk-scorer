import { motion } from "framer-motion";
import { AlertTriangle, Shield, AlertCircle, Skull } from "lucide-react";

export default function RiskBadge({ level, score }) {
  const getRiskConfig = (level) => {
    switch (level?.toLowerCase()) {
      case 'low':
        return {
          icon: Shield,
          color: 'text-green-400',
          bg: 'bg-green-500/20',
          border: 'border-green-500/30',
          gradient: 'from-green-500/20 to-green-600/20'
        };
      case 'medium':
        return {
          icon: AlertCircle,
          color: 'text-yellow-400',
          bg: 'bg-yellow-500/20',
          border: 'border-yellow-500/30',
          gradient: 'from-yellow-500/20 to-yellow-600/20'
        };
      case 'high':
        return {
          icon: AlertTriangle,
          color: 'text-orange-400',
          bg: 'bg-orange-500/20',
          border: 'border-orange-500/30',
          gradient: 'from-orange-500/20 to-orange-600/20'
        };
      case 'critical':
        return {
          icon: Skull,
          color: 'text-red-400',
          bg: 'bg-red-500/20',
          border: 'border-red-500/30',
          gradient: 'from-red-500/20 to-red-600/20'
        };
      default:
        return {
          icon: Shield,
          color: 'text-gray-400',
          bg: 'bg-gray-500/20',
          border: 'border-gray-500/30',
          gradient: 'from-gray-500/20 to-gray-600/20'
        };
    }
  };

  const config = getRiskConfig(level);
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${config.bg} ${config.border} backdrop-blur-sm`}
    >
      <Icon className={`w-4 h-4 ${config.color}`} />
      <span className={`text-sm font-medium ${config.color}`}>
        {level} {score && `(${Math.round(score)})`}
      </span>
    </motion.div>
  );
}