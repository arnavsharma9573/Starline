"use client";
import { LoadingIcon } from "@/components/icons/icons";
import {
  checkpoints,
  idealForText,
  mockApiResponse,
  modeImages,
} from "@/lib/constants";
import {
  AnalysisIssue,
  CheckpointCategory,
  Mode,
  ProcessingState,
} from "@/types/workspace";
import {
  ChevronDown,
  Download,
  X,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Hand,
  FileText,
  PlusIcon,
  CheckCircleIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import React, { useState, useRef, ChangeEvent, useEffect } from "react";

interface TooltipButtonProps {
  onClick?: () => void;
  href?: string;
  tooltipText: string;
  icon: React.ReactNode;
  className?: string;
}
const TooltipButton: React.FC<TooltipButtonProps> = ({
  onClick,
  href,
  tooltipText,
  icon,
  className,
}) => {
  const content = (
    <div className="relative flex items-center group">
      <button
        onClick={onClick}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${className}`}
      >
        {icon}
      </button>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        whileHover={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-800 text-white text-xs font-semibold rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none"
      >
        {tooltipText}
      </motion.div>
    </div>
  );
  return href ? (
    <a href={href} download="Starline-Analysis-Report.pdf">
      {content}
    </a>
  ) : (
    content
  );
};

export default function ImageWorkspace() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<Mode | null>(null);
  const [processingState, setProcessingState] =
    useState<ProcessingState>("idle");
  const [processedCheckpoints, setProcessedCheckpoints] = useState(0);
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [currentProcessingIndex, setCurrentProcessingIndex] = useState(0);
  const [displayedIdealForText, setDisplayedIdealForText] = useState(
    idealForText.base
  );
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [showStickyNote, setShowStickyNote] = useState(false);
  const [analysisIssues, setAnalysisIssues] = useState<AnalysisIssue[]>([]);
  const [outputPdfUrl, setOutputPdfUrl] = useState<string | null>(null);

  // Zoom states
  const [zoom, setZoom] = useState(75);
  const [isPanning, setIsPanning] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const checkpointRefs = useRef<(HTMLLIElement | null)[]>([]);

  const flatCheckpoints = activeMode
    ? checkpoints[activeMode].flatMap((c) => c.points)
    : [];
  const totalCheckpoints = flatCheckpoints.length;

  useEffect(() => {
    if (!activeMode) {
      setDisplayedIdealForText("");
      return;
    }

    const text = idealForText[activeMode];
    setDisplayedIdealForText("");

    let index = 0;
    let currentText = "";

    const intervalId = setInterval(() => {
      currentText += text[index];
      setDisplayedIdealForText(currentText);
      index++;

      if (index >= text.length) {
        clearInterval(intervalId);
      }
    }, 15);

    return () => clearInterval(intervalId);
  }, [activeMode]);

  useEffect(() => {
    if (processingState === "processing" && activeMode) {
      let timeoutId: NodeJS.Timeout;
      setProcessedCheckpoints(0);
      setCurrentProcessingIndex(0);
      checkpointRefs.current = [];

      const processNextCheckpoint = (index = 0) => {
        setCurrentProcessingIndex(index);

        if (index < totalCheckpoints) {
          timeoutId = setTimeout(() => {
            setProcessedCheckpoints((prev) => prev + 1);
            processNextCheckpoint(index + 1);
          }, 400);
        } else {
          setTimeout(() => {
            setAnalysisIssues(mockApiResponse.notes);
            setOutputImage(mockApiResponse.markedUpImageUrl);
            setOutputPdfUrl(mockApiResponse.outputPdfUrl);
            setProcessingState("complete");
          }, 1000);
        }
      };

      const startDelay = setTimeout(() => processNextCheckpoint(0), 500);

      return () => {
        clearTimeout(startDelay);
        clearTimeout(timeoutId);
      };
    }
  }, [processingState, activeMode, totalCheckpoints]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (uploadedImage) URL.revokeObjectURL(uploadedImage);
      const isPdf = file.type === "application/pdf";
      setUploadedImage(
        isPdf ? "/initial_drawing.jpeg" : URL.createObjectURL(file)
      );

      setProcessingState("idle");
      setOutputImage(null);
      setOutputPdfUrl(null);
      setShowStickyNote(false);
      setAnalysisIssues([]);
      setZoom(75);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleProceed = () => {
    if (uploadedImage && activeMode) {
      setProcessingState("processing");
      setShowStickyNote(false);
    }
  };

  const handleModeChange = (mode: Mode) => {
    setActiveMode(mode);
    setShowModeDropdown(false);
    if (processingState !== "idle") {
      setProcessingState("processing");
    }
  };

  // Zoom functions
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 300));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 50));
  };

  const handleResetZoom = () => {
    setZoom(100);
  };

  const renderAnalysisNotes = () => {
    if (analysisIssues.length === 0) {
      return (
        <p className="text-gray-600">No issues were found in this drawing.</p>
      );
    }
    return (
      <div className="space-y-4">
        {analysisIssues.map((issue) => (
          <div
            key={issue.id}
            className="p-3 bg-yellow-100/50 rounded-lg border border-yellow-300/50"
          >
            <h4 className="font-bold text-sm text-yellow-900">
              Issue #{issue.id}
            </h4>
            <p className="mt-1 text-sm text-gray-800">
              <strong className="font-semibold">Description:</strong>{" "}
              {issue.description}
            </p>
            <p className="mt-1 text-sm text-green-700">
              <strong className="font-semibold text-gray-800">
                Recommendation:
              </strong>{" "}
              {issue.recommendation}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Confidence: {(issue.confidence * 100).toFixed(0)}%
            </p>
          </div>
        ))}
      </div>
    );
  };

  const renderCheckpointsList = () => {
    if (!activeMode) {
      return (
        <div className="text-center text-gray-400 py-8">
          <p>Select a mode to view checkpoints</p>
        </div>
      );
    }

    let cumulativePoints = 0;
    return (
      <div className="space-y-2 relative ml-4 scrollbar-hide">
        {checkpoints[activeMode].map((category: CheckpointCategory) => {
          const sectionStartIndex = cumulativePoints;
          cumulativePoints += category.points.length;

          return (
            <div key={category.title} className="relative scrollbar-hide">
              <h3
                className="font-semibold text-base mb-2 text-gray-900 bg-gray-50/80 
              backdrop-blur-sm sticky top-0 z-20 py-2 px-1 border-b border-gray-200"
              >
                {category.title}
              </h3>

              <ul className="space-y-1 relative">
                {category.points.map((point, index) => {
                  const pointIndex = sectionStartIndex + index;
                  const isProcessed = pointIndex < processedCheckpoints;
                  const isCurrentlyProcessing =
                    pointIndex === currentProcessingIndex;

                  return (
                    <li
                      key={point}
                      ref={(el) => {
                        checkpointRefs.current[pointIndex] = el;
                        if (isCurrentlyProcessing && el) {
                          setTimeout(() => {
                            el.scrollIntoView({
                              behavior: "smooth",
                              block: "center",
                              inline: "nearest",
                            });
                          }, 100);
                        }
                      }}
                      className={`
                      relative transition-all duration-500 ease-in-out 
                      transform flex items-center p-1 rounded-md
                      ${
                        isCurrentlyProcessing
                          ? "text-green-800 font-semibold scale-[1.02]"
                          : isProcessed
                          ? "text-gray-700 opacity-90"
                          : "text-gray-400 opacity-50 translate-y-1"
                      }
                    `}
                    >
                      <span className="flex-1 leading-relaxed text-sm">
                        {point}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex h-screen w-full bg-white p-12 font-sans text-gray-800">
      {/* Main Canvas Area */}
      <main className="flex-[0.70] bg-[#ebfbff] bg-dotted-pattern [background-size:1rem_1rem] rounded-3xl shadow-sm flex items-center justify-center relative p-6">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
          <button className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-medium text-sm hover:bg-gray-800 transition">
            L
          </button>
          <button className="w-10 h-10 bg-gray-100 text-black rounded-full flex items-center justify-center font-medium text-sm hover:bg-gray-200 transition">
            M
          </button>
          <button className="w-10 h-10 bg-gray-100 text-black rounded-full flex items-center justify-center font-medium text-sm hover:bg-gray-200 transition">
            H
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,.pdf"
          />
          <button
            onClick={handleUploadClick}
            className="w-10 h-10 bg-gray-100 text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition"
          >
            <PlusIcon />
          </button>
        </div>

        {/* Zoom Controls - Bottom Left */}
        {uploadedImage && (
          <div className="absolute left-6 bottom-6 flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-full shadow-lg p-1.5">
            <TooltipButton
              onClick={() => setIsPanning(!isPanning)}
              tooltipText="Pan"
              icon={<Hand className="w-4 h-4" />}
              className={
                isPanning ? "bg-blue-500 text-white" : "hover:bg-gray-100"
              }
            />
            <div className="w-px h-5 bg-gray-200 mx-1"></div>
            <TooltipButton
              onClick={handleZoomOut}
              tooltipText="Zoom Out"
              icon={<ZoomOut className="w-5 h-5" />}
              className="hover:bg-gray-100"
            />
            <div
              className="w-16 text-center cursor-pointer"
              onClick={handleResetZoom}
            >
              <span className="text-sm font-semibold text-gray-700">
                {zoom}%
              </span>
            </div>
            <TooltipButton
              onClick={handleZoomIn}
              tooltipText="Zoom In"
              icon={<ZoomIn className="w-5 h-5" />}
              className="hover:bg-gray-100"
            />
            <div className="w-px h-5 bg-gray-200 mx-1"></div>
            <TooltipButton
              onClick={handleResetZoom}
              tooltipText="Fit to Screen"
              icon={<Maximize2 className="w-4 h-4" />}
              className="hover:bg-gray-100"
            />
          </div>
        )}

        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          {uploadedImage ? (
            <>
              <div className="w-full h-[80%] flex items-center justify-center">
                <motion.div
                  className="relative flex items-center justify-center max-w-full max-h-[150%]"
                  style={{
                    scale: zoom / 100,
                    cursor: isPanning ? "grab" : "default",
                  }}
                  animate={{ scale: zoom / 100 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={
                      processingState === "complete" && outputImage
                        ? outputImage
                        : uploadedImage
                    }
                    alt={
                      processingState === "complete"
                        ? "Processed Drawing"
                        : "Uploaded Drawing"
                    }
                    className="object-contain rounded-lg shadow-md"
                  />

                  {/* --- This overlay is now correctly contained --- */}
                  {processingState === "processing" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded-lg bg-blue-950/60 backdrop-blur-md"
                    >
                      <LoadingIcon />
                      <p className="text-white font-semibold text-lg">
                        Analyzing Drawing...
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {processingState === "idle" && (
                <div className="text-center">
                  <p className="text-gray-500 text-sm mb-4">
                    Ready for analysis.
                  </p>
                  <button
                    onClick={handleProceed}
                    className="bg-black text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                    disabled={!activeMode}
                  >
                    Proceed to Analysis
                  </button>
                </div>
              )}

              {processingState === "complete" && (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <CheckCircleIcon className="text-green-600" />
                    <p className="text-green-600 font-medium">
                      Analysis Complete!
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-400">
              <p className="text-lg">
                Click the '+' icon to upload an image or PDF
              </p>
            </div>
          )}
        </div>

        {/* Action buttons container - Top Right */}
        {processingState === "complete" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-6 right-6 flex items-center gap-3"
          >
            <TooltipButton
              onClick={() => setShowStickyNote(true)}
              tooltipText="View Issues"
              icon={<FileText className="w-5 h-5 text-amber-900" />}
              className="bg-gradient-to-r from-amber-400 to-yellow-400 shadow-lg"
            />
            {outputPdfUrl && (
              <TooltipButton
                href={outputPdfUrl}
                tooltipText="Download PDF"
                icon={<Download className="w-5 h-5 text-white" />}
                className="bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg"
              />
            )}
          </motion.div>
        )}

        {showStickyNote && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-8 sm:inset-16 bg-gradient-to-br from-yellow-50 to-amber-50 backdrop-blur-sm rounded-3xl shadow-2xl border border-yellow-200/50 p-6 flex flex-col z-20"
          >
            <div className="flex items-center justify-between mb-6 flex-shrink-0">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Analysis Report
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Issues found: {analysisIssues.length}
                </p>
              </div>
              <button
                onClick={() => setShowStickyNote(false)}
                className="p-2 rounded-full hover:bg-gray-900/10 transition-colors group"
              >
                <X className="w-6 h-6 text-gray-700 group-hover:text-gray-900" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
              {renderAnalysisNotes()}
            </div>
          </motion.div>
        )}
      </main>

      {/* Right Control Panel */}
      <aside className="flex-[0.30] bg-white rounded-3xl shadow-sm p-4 ml-4 flex flex-col gap-3 overflow-hidden">
        <div className="space-y-3 w-full">
          <div className="relative inline-block">
            <button
              onClick={() => setShowModeDropdown(!showModeDropdown)}
              className="bg-white text-black font-semibold py-2 px-4 pr-10 rounded-full flex items-center gap-2 transition-all shadow-lg hover:shadow-xl text-sm relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent rounded-full"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-full"></div>
              <span className="relative z-10">
                {activeMode
                  ? activeMode.charAt(0).toUpperCase() + activeMode.slice(1)
                  : "Select Mode"}
              </span>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-black rounded-full p-1 shadow-md z-10">
                <ChevronDown className="w-3 h-3 text-gray-100" />
              </div>
            </button>

            {showModeDropdown && (
              <div className="absolute top-full left-0 mt-2 backdrop-blur-md bg-white/70 border border-gray-200/50 rounded-xl shadow-lg z-50 overflow-hidden min-w-[140px]">
                {(["base", "plus", "code"] as Mode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      handleModeChange(mode);
                      setShowModeDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm font-medium transition ${
                      activeMode === mode
                        ? "bg-gray-900 text-white"
                        : "hover:bg-gray-100/70 text-gray-800"
                    } ${mode !== "base" ? "border-t border-gray-200/40" : ""}`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <p className="text-sm bg-[#ebfbff] p-3 rounded-2xl text-black leading-relaxed min-h-[100px]">
            <span className="font-bold text-base mb-2 text-gray-900">
              Ideal For :
            </span>{" "}
            {displayedIdealForText}
          </p>
        </div>

        <div className="bg-[#ebfbff] rounded-xl p-3 flex items-center justify-between gap-1 border-gray-200">
          <img
            src={modeImages[activeMode ?? "base"].image}
            alt={`${activeMode ?? "base"} mode view`}
            className="w-[40%] h-[250px] object-contain"
          />
          <img
            src={modeImages[activeMode ?? "base"].diagram}
            alt={`${activeMode ?? "base"} mode diagram`}
            className="w-[60%] h-[300px] object-cover bg-white rounded-lg border border-gray-100"
          />
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto pr-3 scrollbar-hide">
            {processingState === "idle" ? (
              <div className="text-center text-gray-400 py-8">
                <p>Select a mode and proceed to see checkpoints</p>
              </div>
            ) : (
              <div className="space-y-2">
                <div>
                  <h2 className="font-bold text-lg mb-2 text-gray-900">
                    {processingState === "processing"
                      ? `Checking ${activeMode} Mode...`
                      : "Analysis Complete"}
                  </h2>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${
                            (processedCheckpoints / totalCheckpoints) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
                      {processedCheckpoints}/{totalCheckpoints}
                    </span>
                  </div>
                </div>
                {renderCheckpointsList()}
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
