import { motion } from 'motion/react';

export default function NoMangadex({ error }: { error: string }) {
  return (
    <motion.div
      key={`md-error-${error}`} // unique key
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-4 rounded max-w-xs mt-6"
    >
      <p className="text-center">{error}</p>
      <p className="mt-1 text-sm text-gray-600 text-center">
        This manga could not be found on Mangadex, you can either search again or search manually for it.
      </p>
    </motion.div>
  )
}