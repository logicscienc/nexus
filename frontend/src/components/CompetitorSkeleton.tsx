import { motion } from "framer-motion";

export default function CompetitorSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 rounded-lg bg-gray-900 animate-pulse border border-gray-800"
    >
      <div className="h-4 w-1/3 bg-gray-700 rounded mb-3"></div>

      <div className="h-3 w-full bg-gray-800 rounded mb-2"></div>
      <div className="h-3 w-5/6 bg-gray-800 rounded mb-2"></div>
      <div className="h-3 w-2/3 bg-gray-800 rounded"></div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="h-10 bg-gray-800 rounded"></div>
        <div className="h-10 bg-gray-800 rounded"></div>
      </div>
    </motion.div>
  );
}