"use client";
import { ChevronDown, ChevronsDownIcon } from "lucide-react";
import React, {
  useState,
  useRef,
  ReactNode,
  ChangeEvent,
  useEffect,
  JSX,
} from "react";

interface CheckpointCategory {
  title: string;
  points: string[];
}

const checkpoints: Record<Mode, CheckpointCategory[]> = {
  base: [
    {
      title: "Dimensions & Geometry",
      points: [
        "All linear dimensions present.",
        "Dimensions consistent with scale.",
        "Cross-check between plan, elevation, and section dimensions.",
        "No missing critical dimensions.",
        "Unit consistency (mm/m/cm).",
        "Wall thicknesses labeled correctly.",
        "Door/window dimensions correct.",
        "Staircase width matches plan.",
        "Ramp slopes annotated correctly.",
        "Grid lines properly labeled.",
        "Centerlines of walls, columns, and beams correct.",
        "Column sizes consistent with drawing notes.",
        "Beam sizes and locations marked.",
        "Floor-to-floor heights indicated.",
        "Roof/floor thicknesses labeled.",
      ],
    },
    {
      title: "Labels & Annotations",
      points: [
        "All rooms labeled clearly.",
        "Doors and windows labeled.",
        "Furniture/fixed equipment labeled.",
        "Section cuts labeled consistently.",
        "Elevation markers consistent.",
        "Legends present and complete.",
        "Symbols and abbreviations consistent.",
        "Room numbers match floor plan.",
        "North direction indicated.",
        "Title block present with revision numbers.",
      ],
    },
    {
      title: "Drawing Clarity & Presentation",
      points: [
        "Scale mentioned and correct.",
        "All lines visible and not overlapping.",
        "Annotations legible and readable.",
        "Layering of elements clear.",
        "Drawing background clean (no stray marks).",
        "Hatching consistent and readable.",
        "Text size uniform.",
        "Symbols not cluttered.",
        "Dimension arrows clear and not overlapping lines.",
        "Overall drawing visually uncluttered.",
      ],
    },
    {
      title: "Typographical & Text Errors",
      points: [
        "Spelling errors in room names corrected.",
        "Abbreviations standardized.",
        "Notes written clearly without typos.",
        "Consistency of units in annotations.",
        "Legends match symbols used in drawing.",
      ],
    },
    {
      title: "Consistency & References",
      points: [
        "Floor numbering consistent across all sheets.",
        "Drawing numbers follow sequence.",
        "Revision numbers updated.",
        "Cross-references (sections/elevations) correct.",
        "Reference drawings linked properly.",
      ],
    },
    {
      title: "Miscellaneous Basic Checks",
      points: [
        "Margins and borders correct.",
        "North arrow correctly oriented.",
        "Sheet size correct (A0, A1, etc.).",
        "Printing scale matches title block.",
        "Drawing ready for submission/presentation.",
      ],
    },
  ],
  plus: [
    {
      title: "Spatial Planning & Layout",
      points: [
        "Minimum room areas per NBC recommendations.",
        "Bedroom dimensions verified.",
        "Living room dimensions verified.",
        "Kitchen area and layout verified.",
        "Bathroom/toilet sizes and layouts correct.",
        "Corridor widths meet functional requirements.",
        "Circulation space clear and logical.",
        "Room adjacencies make sense functionally (e.g., kitchen near dining).",
        "Proper zoning: private vs. public spaces.",
        "Staircase location logical within layout.",
        "Door swing directions do not obstruct movement.",
        "Window placement supports natural lighting.",
        "Ventilation and cross-ventilation considered.",
        "Balcony/terrace access logical and safe.",
        "Storage spaces integrated appropriately.",
      ],
    },
    {
      title: "Architectural Elements & Detailing",
      points: [
        "Wall thickness appropriate for room function.",
        "Partition walls correctly located.",
        "Openings (doors/windows) align with walls and partitions.",
        "Door sizes match furniture clearance.",
        "Windows placed to optimize daylight and airflow.",
        "Staircase rise/run ratio reasonable and consistent.",
        "Stair landings sufficient in size.",
        "Handrail positions correct.",
        "Railings and parapets drawn correctly.",
        "Furniture layout checked for circulation and ergonomics.",
        "Fixed elements (kitchen counters, wardrobes) dimensioned.",
        "Ceiling heights consistent across rooms.",
        "Slopes for terraces or ramps logical for drainage.",
        "Door & window tags consistent across drawings.",
        "Room labels match their intended function.",
      ],
    },
    {
      title: "Annotation & Presentation Quality",
      points: [
        "Dimensions readable and clear.",
        "Text font size consistent.",
        "Room names not overlapping walls or furniture.",
        "Symbols match legend.",
        "Section markers accurate and consistent.",
        "Elevation markers correct.",
        "Drawing layers properly organized.",
        "Hatching consistent and readable.",
        "North arrow present and oriented.",
        "Sheet borders, margins, and title blocks correct.",
      ],
    },
    {
      title: "Circulation & Accessibility",
      points: [
        "Door swings do not block furniture or other doors.",
        "Passageways unobstructed.",
        "Corridor intersections logical and safe.",
        "Main entrances accessible and clearly defined.",
        "Emergency exits (non-code) logically reachable.",
        "Stair access not blocked by furniture or walls.",
        "Ramp slopes reasonable for usability.",
        "Balcony/terrace access safe and clear.",
        "Room door positions functional for daily use.",
        "Spaces allow easy movement of furniture/appliances.",
      ],
    },
    {
      title: "Internal Consistency Checks",
      points: [
        "Floor plans, elevations, and sections consistent.",
        "Room sizes match between plan and schedule.",
        "Ceiling heights match across related rooms.",
        "Levels and floor elevations consistent.",
        "Symbols and line types consistent.",
        "Annotations match dimensions.",
        "Tags and labels consistent.",
        "Wall openings match doors/windows schedule.",
        "Furniture layout matches functional planning.",
        "Internal cross-references (sections/elevations) correct.",
      ],
    },
  ],
  code: [
    {
      title: "Plot & Site Planning",
      points: [
        "Plot area meets minimum NBC requirements.",
        "FAR (Floor Area Ratio) compliance.",
        "Site coverage within permissible limits.",
        "Front setback complies with NBC/municipal norms.",
        "Rear setback complies with NBC/municipal norms.",
        "Side setbacks meet NBC/municipal rules.",
        "Open space percentage is adequate.",
        "Orientation/solar considerations noted per code guidelines.",
        "Plot boundaries clearly defined.",
        "Adjacency to public roads compliant.",
        "Access for emergency vehicles as per NBC.",
        "Site slope/drainage provisions noted.",
        "Boundary wall height within permitted limits.",
        "Road width & access aligns with municipal rules.",
        "Encroachments on easements or public land flagged.",
      ],
    },
    {
      title: "Building Envelope",
      points: [
        "Building height limits per NBC/municipal rules.",
        "Number of permissible floors verified.",
        "Parapet height meets safety standards.",
        "Roof terrace safety provisions checked.",
        "Wall thickness aligns with minimum structural code requirements.",
        "Window-to-wall ratio within NBC limits.",
        "Minimum fenestration for natural light per NBC.",
        "Minimum ventilation openings per NBC.",
        "External openings distance from boundaries meets code.",
        "Overhangs and projections comply with regulations.",
        "Balcony dimensions within legal limits.",
        "Staircase well clearance per NBC.",
        "Roof slope/drainage considerations noted.",
        "Parapet/railing height checked for safety.",
        "External cladding complies with fire safety norms.",
        "Rainwater drainage compliance verified.",
        "External staircase placement meets evacuation norms.",
        "Sun shading devices compliant with local regulations.",
        "Fences/gates height and location compliant.",
        "Roof access points comply with NBC.",
      ],
    },
    {
      title: "Circulation & Access",
      points: [
        "Staircase width meets NBC requirements.",
        "Tread and riser ratios compliant with code.",
        "Handrail provision for all staircases.",
        "Ramp slopes for accessibility.",
        "Door widths per NBC/IS standards.",
        "Main entrance clearance checked.",
        "Corridor widths meet minimum code requirements.",
        "Passage alignment for emergency evacuation.",
        "Exit doors swing direction compliance.",
        "Number of exits per floor verified.",
        "Lift lobby access per NBC/IS standards.",
        "Barrier-free path from main entrance to lifts.",
        "Emergency access for fire brigade vehicles.",
        "Staircase landing dimensions verified.",
        "Staircase headroom compliance.",
        "Lift size and clearances referenced against standards.",
        "Entry/exit for service areas compliant.",
        "Fire exit location alignment with NBC.",
        "Accessibility to toilets and public areas.",
        "Access for maintenance areas checked.",
      ],
    },
    {
      title: "Room Sizes & Functional Layout",
      points: [
        "Minimum bedroom area per NBC.",
        "Minimum living room area.",
        "Minimum kitchen area.",
        "Minimum toilet/bathroom area.",
        "Dining area minimum dimensions.",
        "Circulation area minimum ratio.",
        "Corridor width vs occupant load.",
        "Staircase capacity vs occupant load.",
        "Room-to-room adjacency compliance.",
        "Door clearance and swing checked.",
        "Internal openings meet NBC/IS spacing requirements.",
        "Minimum headroom in habitable spaces.",
        "Minimum ceiling height in service areas.",
        "Ventilation ratio per NBC.",
        "Natural lighting ratio per NBC.",
        "Staircase enclosure requirements met.",
        "Storage room area per code.",
        "Service rooms (electrical, MEP) sizes compliant.",
        "Common areas dimension verified.",
        "Fire escape access from each room.",
      ],
    },
    {
      title: "Structural References",
      points: [
        "Wall thickness meets NBC/IS minimum.",
        "Column grid spacing aligns with NBC.",
        "Beam placement references structural code guidelines.",
        "Openings in load-bearing walls flagged.",
        "Foundation type referenced against soil/building codes.",
        "Plinth height meets NBC requirements.",
        "Floor-to-floor height referenced to NBC.",
        "Roof slab thickness per IS code.",
        "RCC lintels height checked vs IS 456.",
        "Seismic zone considerations flagged.",
      ],
    },
    {
      title: "Fire Safety & Emergency",
      points: [
        "Fire escape routes clearly marked.",
        "Exit widths compliant with NBC.",
        "Number of emergency exits per floor.",
        "Staircase enclosure type referenced to code.",
        "Fire lift provisions flagged.",
        "Fire hydrant access routes noted.",
        "Fire extinguisher placements flagged.",
        "Smoke ventilation locations verified.",
        "Assembly areas for emergency evacuation.",
        "Material/fire rating references for walls/doors.",
      ],
    },
    {
      title: "Miscellaneous & References",
      points: [
        "Drawing references (title block, sheet numbers, revision notes).",
        "NBC clause references for all highlighted items.",
        "IS code references included where applicable.",
        "Municipal bylaw cross-checks.",
        "Clear textual feedback linking non-compliance to reference codes.",
      ],
    },
  ],
};

const idealForText: Record<Mode, string> = {
  base: "Professionals needing a fast, reliable check of their construction drawings. Ideal for architects, draftsmen, and interior engineers to ensure basic standards are met without deep code analysis.",
  plus: "Architects and designers looking for a comprehensive review of spatial planning, functionality, and architectural detailing beyond just the basic checks.",
  code: "Essential for engineers and builders who require strict adherence to building codes, ensuring drawings meet NBC/municipal regulations for safety and compliance.",
};

const modeImages: Record<Mode, { image: string; diagram: string }> = {
  base: {
    image: "/Base2.png",
    diagram: "/Base1.png",
  },
  plus: {
    image: "/Plus2.jpg",
    diagram: "/Plus1.png",
  },
  code: {
    image: "/Code2.jpg",
    diagram: "/Code1.png",
  },
};

interface IconProps {
  children: ReactNode;
  className: string;
}
type Mode = "base" | "plus" | "code";
type ProcessingState = "idle" | "processing" | "complete";

const Icon = ({ children, className }: IconProps): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    {children}
  </svg>
);

const PlusIcon = (): JSX.Element => (
  <Icon className="w-6 h-6">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </Icon>
);

const MoonIcon = (): JSX.Element => (
  <Icon className="w-5 h-5">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </Icon>
);

const CheckCircleIcon = (): JSX.Element => (
  <Icon className="w-5 h-5 text-green-500">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </Icon>
);

const LoadingIcon = (): JSX.Element => (
  <Icon className="w-5 h-5 text-blue-500 animate-spin">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 2v4m0 12v4m8-10h-4M6 12H2m15.364-7.364l-2.828 2.828M7.464 17.536l-2.828 2.828m12.728 0l-2.828-2.828M7.464 6.464L4.636 3.636"
    />
  </Icon>
);

const DotIcon = (): JSX.Element => (
  <div className="w-4 h-4 flex items-center justify-center">
    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
  </div>
);

const ChevronDownIcon = (): JSX.Element => (
  <Icon className="w-5 h-5">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 14l-7 7m0 0l-7-7m7 7V3"
    />
  </Icon>
);

export default function ImageWorkspace(): JSX.Element {
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
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
    setDisplayedIdealForText(""); // reset immediately

    let index = 0;
    let currentText = "";

    const intervalId = setInterval(() => {
      currentText += text[index];
      setDisplayedIdealForText(currentText);
      index++;

      if (index >= text.length) {
        clearInterval(intervalId);
      }
    }, 15); // typing speed

    return () => clearInterval(intervalId);
  }, [activeMode]);

  // Auto-scroll to the currently processing checkpoint
  useEffect(() => {
    if (
      processingState === "processing" &&
      checkpointRefs.current[currentProcessingIndex]
    ) {
      checkpointRefs.current[currentProcessingIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentProcessingIndex, processingState]);

  useEffect(() => {
    if (processingState === "processing") {
      setProcessedCheckpoints(0);
      setCurrentProcessingIndex(0);

      const processNextCheckpoint = (index = 0) => {
        setCurrentProcessingIndex(index);

        if (index < totalCheckpoints) {
          setTimeout(() => {
            setProcessedCheckpoints((prev) => prev + 1);
            processNextCheckpoint(index + 1);
          }, 800); // fixed 800ms delay per checkpoint
        } else {
          setProcessingState("complete");
        }
      };

      // start processing after a short delay
      setTimeout(() => processNextCheckpoint(0), 500);
    }
  }, [processingState, activeMode, totalCheckpoints]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (uploadedImage) URL.revokeObjectURL(uploadedImage);
      setUploadedImage(URL.createObjectURL(file));
      setProcessingState("idle");
      setProcessedCheckpoints(0);
      setCurrentProcessingIndex(0);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleProceed = () => {
    if (uploadedImage && activeMode) {
      setProcessingState("processing");
      checkpointRefs.current = [];
    }
  };

  const handleModeChange = (mode: Mode) => {
    setActiveMode(mode);
    setShowModeDropdown(false);
    if (processingState !== "idle") {
      setProcessingState("processing");
    }
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
      <div className="space-y-6 relative ml-4">
        {checkpoints[activeMode].map((category: CheckpointCategory) => {
          const sectionStartIndex = cumulativePoints;
          cumulativePoints += category.points.length;

          return (
            <div key={category.title} className="relative">
              {/* Sticky section header */}
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
      <main className="flex-[0.72] bg-[#ebfbff] rounded-3xl shadow-sm flex items-center justify-center relative p-6">
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

        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          {uploadedImage ? (
            <>
              <img
                src={uploadedImage}
                alt="Uploaded content"
                className="max-w-full max-h-[70%] object-contain rounded-lg"
              />
              {processingState === "idle" && (
                <div className="text-center">
                  <p className="text-gray-500 text-sm mb-4">
                    Image uploaded successfully
                  </p>
                  <button
                    onClick={handleProceed}
                    className="bg-black text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
                  >
                    Proceed to Analysis
                  </button>
                </div>
              )}
              {processingState === "processing" && (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <LoadingIcon />
                    <p className="text-blue-600 font-medium">
                      Analyzing {activeMode} mode checkpoints...
                    </p>
                  </div>
                  <div className="w-64 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          (processedCheckpoints / totalCheckpoints) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-gray-500 text-sm mt-2">
                    {processedCheckpoints} of {totalCheckpoints} checkpoints
                    completed
                  </p>
                </div>
              )}
              {processingState === "complete" && (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <CheckCircleIcon />
                    <p className="text-green-600 font-medium">
                      Analysis Complete!
                    </p>
                  </div>
                  <p className="text-gray-500 text-sm">
                    All {totalCheckpoints} checkpoints have been processed
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-400">
              <p className="text-lg">Click the '+' icon to upload an image</p>
            </div>
          )}
        </div>

        <div className="absolute top-6 left-6 bg-black text-white text-xs font-bold tracking-widest py-2 px-4 rounded-full">
          STARLINE
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm shadow-md rounded-full flex items-center gap-4 px-4 py-2 text-sm">
          <span className="font-semibold">300</span>
          <div className="w-px h-4 bg-gray-300"></div>
          <button className="font-semibold hover:text-black">+</button>
          <span>100%</span>
          <button className="font-semibold hover:text-black">-</button>
        </div>
      </main>

      {/* Right Control Panel - Updated Layout */}
      <aside className="flex-[0.28] bg-white rounded-3xl shadow-sm p-4 ml-4 flex flex-col gap-3 overflow-hidden">
        {/*
          NEW ORDER:
          1. Select Mode Button
          2. Ideal For Section
          3. Mode Images
        */}

        <div className="space-y-3 w-full">
          {/* 1. Select Mode Button - AT THE TOP */}
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

        {/* 2. Ideal For Section - IN THE MIDDLE */}
        <div>
          <p className="text-sm bg-[#ebfbff] p-3 rounded-2xl text-black leading-relaxed min-h-[100px]">
            <span className="font-bold text-base mb-2 text-gray-900">
              Ideal For :
            </span>{" "}
            {displayedIdealForText}
          </p>
        </div>

        {/* 3. Mode Images - BELOW "Ideal For" */}
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

        {/* Content Area - For Processing Checkpoints */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto pr-3">
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
