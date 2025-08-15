import React from 'react';
import { motion } from 'framer-motion';

interface RiskMeterProps {
  score: number;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

export const RiskMeter: React.FC<RiskMeterProps> = ({ 
  score, 
  size = 'medium', 
  showLabel = true 
}) => {
  const getRiskLevel = (score: number) => {
    if (score <= 25) return { level: 'Low', color: '#10B981', bgColor: '#10B981' };
    if (score <= 50) return { level: 'Medium', color: '#F59E0B', bgColor: '#F59E0B' };
    if (score <= 75) return { level: 'High', color: '#EF4444', bgColor: '#EF4444' };
    return { level: 'Critical', color: '#DC2626', bgColor: '#DC2626' };
  };

  const risk = getRiskLevel(score);
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const sizes = {
    small: { width: 80, height: 80, strokeWidth: 6, fontSize: 'text-xs' },
    medium: { width: 120, height: 120, strokeWidth: 8, fontSize: 'text-sm' },
    large: { width: 160, height: 160, strokeWidth: 10, fontSize: 'text-lg' },
  };

  const currentSize = sizes[size];

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg
          width={currentSize.width}
          height={currentSize.height}
          className="transform -rotate-90"
        >
          <circle
            cx="50%"
            cy="50%"
            r="45"
            stroke="#374151"
            strokeWidth={currentSize.strokeWidth}
            fill="transparent"
            className="opacity-20"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="45"
            stroke={risk.color}
            strokeWidth={currentSize.strokeWidth}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-bold text-white ${currentSize.fontSize}`}>
            {Math.round(score)}
          </span>
        </div>
      </div>
      {showLabel && (
        <div className="mt-3 text-center">
          <p className={`font-semibold ${currentSize.fontSize}`} style={{ color: risk.color }}>
            {risk.level} Risk
          </p>
        </div>
      )}
    </div>
  );
};