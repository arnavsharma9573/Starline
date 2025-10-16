"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import BuildingChat from "./BuildingChat";

// --- (textBlocks and messages arrays remain the same) ---
const textBlocks = [
  {
    line1: "Where every line meets",
    line2: "compliance.",
    isBold: true,
  },
  {
    line1: "Powered by advanced computer vision,",
    line2: "Retrieval-augmented intelligence,",
    line3: "and an agentic reasoning layer.",
    isBold: false,
  },
  {
    line1: "We’re building an ecosystem",
    line2: "where every drawing is born compliant,",
    line3:
      "accelerating projects, improving safety,and giving professionals their time back.",
    isBold: false,
  },
];

const messages = [
  {
    speaker: "",
    text: "“Demolition order… ouch!”",
    position: "top-[30%] left-[68%]", // Near Building 1
  },
  {
    speaker: "",
    text: "“Fined for bad wiring 😩”",
    position: "top-[55%] left-[80%]", // Near Building 2
  },
  {
    speaker: "",
    text: "“Failed inspection, tenants gone!”",
    position: "top-[52%] left-[50%]", // Near Building 3
  },
  {
    speaker: "",
    text: "“Never skipping codes again!”",
    position: "top-[30%] left-[68%]", // Back to Building 1
  },
];

export default function HeroSection() {
  const [textIndex, setTextIndex] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isChatActive, setIsChatActive] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % textBlocks.length);
    }, 8000);

    return () => clearInterval(intervalId);
  }, []);

  // --- 1. THIS HOOK WAS MISSING ---
  // It waits for the line animations to finish (longest is 2.7s + 0.8s)
  // before setting the chat to active.
  useEffect(() => {
    const chatStartTimer = setTimeout(() => {
      setIsChatActive(true);
    }, 3500); // Wait 3.5 seconds

    return () => clearTimeout(chatStartTimer);
  }, []); // This runs only once on component mount

  // --- 2. THIS IS THE ONLY HOOK NEEDED FOR THE CHAT ---
  // It handles the message cycling, but only after `isChatActive` becomes true.
  useEffect(() => {
    if (!isChatActive) return;

    const messageInterval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);

    return () => clearInterval(messageInterval);
  }, [isChatActive]); // This effect re-runs when isChatActive changes

  const currentMessage = messages[messageIndex];
  const currentText = textBlocks[textIndex];

  return (
    <main className="relative w-full items-center justify-center text-white">
      {/* This conditional rendering is now correct */}
      {isChatActive && (
        <div
          key={messageIndex}
          className={`absolute z-20 hidden md:block ${currentMessage.position}`}
        >
          <BuildingChat
            speaker={currentMessage.speaker}
            text={currentMessage.text}
          />
        </div>
      )}

      {/* --- (The rest of your JSX remains exactly the same) --- */}
      <>
        {/* Building 1 */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="absolute top-[35%] left-[64%] w-16 h-[1px] bg-white/80 rotate-0 origin-left"
        />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="absolute top-[35%] left-[64%] w-[1px] h-24 bg-white/80 origin-top"
        />
      </>
      <>
        {/* Building 2 */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 2.1 }}
          className="absolute top-[60%] left-[75%] w-24 h-[1px] bg-white/80 rotate-0 origin-left"
        />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="absolute top-[60%] left-[75%] w-[1px] h-28 bg-white/80 origin-top"
        />
      </>

      {/*  Building 3 */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, delay: 2.7 }}
        className="absolute top-[70%] left-[56%] w-[1px] h-28 bg-white/80 origin-top"
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
        <div className="min-h-[12rem] flex flex-col justify-center">
          <motion.div
            key={textIndex}
            className="text-4xl font-thin text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div>
              {currentText.line1}
              <br />
              <span className={currentText.isBold ? "font-semibold" : ""}>
                {currentText.line2}
              </span>
            </div>
            {currentText.line3 && (
              <div className="text-xl font-light mt-2">{currentText.line3}</div>
            )}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
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
