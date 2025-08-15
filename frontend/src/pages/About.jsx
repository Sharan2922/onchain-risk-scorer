import { motion } from "framer-motion";
import { Shield, Brain, Zap, Target, CheckCircle, ArrowRight } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze transaction patterns and behavioral indicators to identify potential risks."
    },
    {
      icon: Shield,
      title: "Real-time Protection",
      description: "Continuous monitoring of blockchain transactions with instant risk assessment and alerting capabilities."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process thousands of transactions in seconds with our optimized analysis engine and efficient data processing."
    },
    {
      icon: Target,
      title: "Precision Scoring",
      description: "Multi-factor risk scoring system that considers liquidity, volatility, contract security, and market manipulation patterns."
    }
  ];

  const benefits = [
    "Detect suspicious transaction patterns before they impact your portfolio",
    "Comprehensive risk assessment with detailed explanations and recommendations",
    "Support for multiple blockchain networks and token standards",
    "Real-time alerts and notifications for high-risk activities",
    "Historical analysis and trend identification for better decision making",
    "Integration-ready API for developers and institutional users"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 mb-6"
          >
            About Onchain Risk Scorer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Protecting the Web3 ecosystem through advanced AI-powered risk analysis and 
            real-time transaction monitoring. Our mission is to make blockchain interactions 
            safer and more transparent for everyone.
          </motion.p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 mb-16 shadow-2xl"
        >
          <div className="text-center">
            <div className="p-4 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-2xl w-fit mx-auto mb-6">
              <Shield className="w-12 h-12 text-cyan-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-4xl mx-auto">
              Onchain Risk Scorer helps identify potentially risky blockchain transactions by analyzing 
              transfer data and applying cutting-edge AI-based scoring models. We combine advanced machine 
              learning with deep blockchain expertise to provide comprehensive risk assessment tools that 
              protect users, developers, and institutions in the rapidly evolving Web3 landscape.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 mb-16 shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 leading-relaxed">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-500/20 rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Secure Your Web3 Journey?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Start analyzing blockchain transactions with our AI-powered risk scoring system. 
              Protect your investments and make informed decisions in the decentralized world.
            </p>
            <motion.a
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}