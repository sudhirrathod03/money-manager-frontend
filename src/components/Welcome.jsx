import React from "react";
import { motion } from "framer-motion";

const Welcome = ({ onComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col justify-center items-center z-50 text-white overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 3.5, duration: 0.8, ease: "easeInOut" }}
      onAnimationComplete={onComplete}
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-900 to-black animate-gradient-xy"></div>

      {/* Floating Abstract Shapes */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      {/* Text Content */}
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 1.5,
          }}
          className="text-8xl mb-4"
        >
          💰
        </motion.div>

        <motion.h1
          className="text-6xl font-extrabold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-400"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >

          Money<span className="text-green-600">Mint</span>

        </motion.h1>

        <motion.p
          className="text-xl text-gray-300 font-light"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Smart. Simple. Secure.
        </motion.p>
      </div>

      {/* Loading Bar */}
      <motion.div
        className="relative z-10 mt-12 w-64 h-1 bg-gray-700 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="h-full bg-blue-400"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Welcome;
