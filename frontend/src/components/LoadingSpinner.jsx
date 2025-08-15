import { motion } from "framer-motion";

export default function LoadingSpinner({ size = "medium", text = "Loading..." }) {
  const sizes = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12"
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <motion.div
        className={`${sizes[size]} border-2 border-cyan-400/30 border-t-cyan-400 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-400 text-sm"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}