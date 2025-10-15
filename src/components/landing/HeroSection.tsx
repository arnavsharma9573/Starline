"use client";
import React from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

export default function HeroSection() {
  const text1 = "Where every";
  const text2 = "line meets";
  const text3 = "compliance.";

  return (
    <main className="relative w-full items-center justify-center text-white">
      {/* Decorative Lines with animation */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute top-[50%] left-[64%] w-16 h-[1px] bg-white/80 rotate-0 origin-left"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="absolute top-[50%] left-[64%] w-[1px] h-24 bg-white/80 origin-top"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 2.1 }}
        className="absolute top-[72%] left-[75%] w-24 h-[1px] bg-white/80 rotate-0 origin-left"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, delay: 2.4 }}
        className="absolute top-[72%] left-[75%] w-[1px] h-28 bg-white/80 origin-top"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, delay: 2.7 }}
        className="absolute top-[95%] left-[58%] w-[1px] h-28 bg-white/80 origin-top"
      />

      {/* Text Section */}
      <div className="max-w-7xl mx-auto mt-16 flex flex-col text-neutral-100 space-y-2 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-light"
        >
          Experimental Version
        </motion.div>

        <div className="text-5xl font-thin text-white leading-tight">
          {/* First line: "Where every" */}
          <div className="overflow-hidden">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.05 }}
            >
              {text1.split("").map((char, index) => (
                <motion.span
                  key={`text1-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.05,
                    delay: 0.3 + index * 0.05,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
          </div>

          {/* Second line: "line meets" */}
          <div className="overflow-hidden">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.05 }}
            >
              {text2.split("").map((char, index) => (
                <motion.span
                  key={`text2-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.05,
                    delay: 0.8 + index * 0.05,
                  }}
                >
                  {char}
                </motion.span>
              ))}{" "}
            </motion.span>

            {/* "compliance." with font-semibold */}
            <motion.span
              className="font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.05 }}
            >
              {text3.split("").map((char, index) => (
                <motion.span
                  key={`text3-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.05,
                    delay: 1.3 + index * 0.05,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.0 }}
          className="mt-4"
        >
          <Button className="bg-white text-[#747C86] font-bold rounded-xl w-[10rem] hover:bg-gray-100 transition-all duration-300">
            Watch Demo
          </Button>
        </motion.div>
      </div>
    </main>
  );
}