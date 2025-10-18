"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Download } from "lucide-react";

const getColor = (score: number) => {
  if (score <= 15) return "#22c55e"; // Green
  if (score <= 45) return "#f97316"; // Orange
  return "#ef4444"; // Red
};

const getRiskText = (score: number) => {
  if (score <= 15) return "Low Risk: Proceed";
  if (score <= 45) return "Medium Risk: Revisions Likely";
  return "High Risk: Rejection Likely";
};

interface ComplianceRiskMeterProps {
  score: number;
  isProcessing?: boolean;
  processedCheckpoints?: number;
  totalCheckpoints?: number;
  reportUrl?: string | null;
}

export default function ComplianceRiskMeter({
  score,
  isProcessing = true,
  processedCheckpoints = 0,
  totalCheckpoints = 100,
  reportUrl = null,
}: ComplianceRiskMeterProps) {
  const [displayScore, setDisplayScore] = useState(50);
  const [needlePosition, setNeedlePosition] = useState(50);

  useEffect(() => {
    if (isProcessing) {
      // Swinging animation while processing
      let swingStep = 0;
      const swingInterval = setInterval(() => {
        swingStep += 0.05;
        // Sine wave oscillation between 20 and 80
        const swing = Math.sin(swingStep) * 30 + 50;
        setNeedlePosition(swing);
      }, 50);

      return () => clearInterval(swingInterval);
    } else {
      // Animate to final score
      const duration = 1500;
      const steps = 60;
      let currentStep = 0;
      const startValue = needlePosition;
      const valueRange = score - startValue;

      const finalInterval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const finalValue = startValue + valueRange * easeOut;

        setNeedlePosition(finalValue);
        setDisplayScore(finalValue);

        if (currentStep >= steps) {
          clearInterval(finalInterval);
          setNeedlePosition(score);
          setDisplayScore(score);
        }
      }, duration / steps);

      return () => clearInterval(finalInterval);
    }
  }, [isProcessing, score]);

  const progressPercentage =
    totalCheckpoints > 0 ? (processedCheckpoints / totalCheckpoints) * 100 : 0;

  const currentColor = getColor(isProcessing ? needlePosition : displayScore);

  return (
    <div className="flex flex-col items-center gap-8 text-center w-full max-w-2xl mx-auto">
      {/* Horizontal Meter */}
      <div className="w-full space-y-4">
        {/* Labels */}
        <div className="flex justify-between text-xs font-semibold uppercase tracking-wider">
          <span className="text-green-600">Low Risk</span>
          <span className="text-orange-500">Medium Risk</span>
          <span className="text-red-500">High Risk</span>
        </div>

        {/* Meter Track */}
        <div className="relative h-8 bg-gradient-to-r from-green-500 via-orange-500 to-red-500 rounded-full">
          {/* Animated Needle/Indicator */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
            style={{ left: `${needlePosition}%` }}
          >
            {/* Vertical Line */}
            <div className="flex flex-col items-center">
              <div className="w-1 h-12 bg-gray-900 rounded-full shadow-lg" />
              {/* Indicator Circle */}
              <motion.div
                className="w-6 h-6 bg-gray-900 rounded-full shadow-xl border-4 border-white -mt-3"
                animate={{
                  scale: isProcessing ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 0.6,
                  repeat: isProcessing ? Infinity : 0,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          {/* Tick Marks */}
          <div className="absolute inset-0 flex justify-between items-center px-2">
            {[0, 15, 45, 100].map((tick, i) => (
              <div
                key={tick}
                className="w-0.5 h-4 bg-white/40 rounded-full"
                style={{ marginLeft: i === 0 ? 0 : "auto" }}
              />
            ))}
          </div>
        </div>

        {/* Percentage Labels */}
        <div className="flex justify-between text-xs text-gray-500">
          <span>0%</span>
          <span>15%</span>
          <span>45%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Score Display */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        <motion.div className="relative">
          <motion.h3
            className="text-6xl font-bold tabular-nums"
            style={{ color: currentColor }}
            animate={{
              scale: !isProcessing ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            {isProcessing ? "..." : `${Math.round(displayScore)}%`}
          </motion.h3>

          {/* Animated Background Glow */}
          <motion.div
            className="absolute inset-0 -z-10 rounded-full blur-2xl"
            style={{ backgroundColor: currentColor }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <motion.p
          className="text-xl font-semibold"
          style={{ color: currentColor }}
        >
          {isProcessing ? "Analyzing Compliance..." : getRiskText(displayScore)}
        </motion.p>

        {/* Processing Status */}
        {isProcessing && (
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-sm text-gray-600">
              Processed {processedCheckpoints} of {totalCheckpoints} checkpoints
            </p>
            <div className="flex gap-2 justify-center">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: currentColor }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Risk Description */}
        {!isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              {displayScore <= 15 &&
                "Compliance standards met. Ready for submission."}
              {displayScore > 15 &&
                displayScore <= 45 &&
                "Some issues detected. Review recommended."}
              {displayScore > 45 && "Critical issues found. Revision required."}
            </p>

            {/* Download Button */}
            {reportUrl && (
              <motion.a
                href={reportUrl}
                download="Compliance-Audit-Report.pdf"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-2 bg-black text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-800 transition-colors"
              >
                <Download className="w-5 h-5" /> Download Audit Report
              </motion.a>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
