// components/BlurText.jsx
"use client";
import { motion } from "framer-motion";

export default function BlurText({ text }) {
  return (
    <div className="text-center py-8">
      <div className="text-4xl font-bold flex flex-wrap justify-center gap-2">
        {text.split(" ").map((word, i) => (
          <motion.span
            key={i}
            initial={{ filter: "blur(8px)", opacity: 0, y: 20 }}
            whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: i * 0.2,
              ease: "easeOut"
            }}
            viewport={{ once: true }}
            className="inline-block"
          >
            {word}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
