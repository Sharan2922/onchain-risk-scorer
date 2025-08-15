import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

interface RiskFactorsChartProps {
  factors: {
    liquidityRisk: number;
    volatilityRisk: number;
    contractRisk: number;
    marketManipulationRisk: number;
    rugPullRisk: number;
  };
}

export const RiskFactorsChart: React.FC<RiskFactorsChartProps> = ({ factors }) => {
  const data = [
    { subject: 'Liquidity', value: factors.liquidityRisk },
    { subject: 'Volatility', value: factors.volatilityRisk },
    { subject: 'Contract', value: factors.contractRisk },
    { subject: 'Manipulation', value: factors.marketManipulationRisk },
    { subject: 'Rug Pull', value: factors.rugPullRisk },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="#374151" />
          <PolarAngleAxis dataKey="subject" className="text-gray-300 text-sm" />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            className="text-gray-400 text-xs"
          />
          <Radar
            name="Risk Factors"
            dataKey="value"
            stroke="#00D2FF"
            fill="#00D2FF"
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};