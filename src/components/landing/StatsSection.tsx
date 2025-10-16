"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface StatItem {
  value: string;
  description: string;
}

interface StatsData {
  top: StatItem;
  left: StatItem;
  right: StatItem;
}

const statsData: StatsData = {
  top: {
    value: "6+ hours",
    description:
      "Is what Indian architects & designers spend checking one complete drawing set.",
  },
  left: {
    value: "72%",
    description:
      "Of architects say the approval process is delayed due to manual drawing corrections.",
  },
  right: {
    value: "1 in 4",
    description:
      "projects faces rework because of dimension or code errors found late.",
  },
};

const StatsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const headingRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);
  return (
    <section className="py-2 md:py-2 overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main container for the image and absolutely positioned text */}
        <div className="relative flex items-center justify-center w-full max-w-6xl mx-auto aspect-[4/2.5]">
          {/* Central image with figures and lines */}
          <Image
            src="/HOUSENUMBER.jpg" // Using your specified image name
            alt="Building with connected figures illustrating construction delays"
            objectFit="contain"
            className="z-0 mt-18"
            width={600}
            height={512}
          />

          {/* DOTTED LINES START HERE */}
          {/* Line from top stat to image (adjust `top` and `left` as needed) */}
          <div className="absolute top-[2%] left-[49%] h-16 w-[1px] border-l-2 border-dotted border-gray-400 z-10 md:h-20 md:top-[16.85%] md:left-[50%]"></div>
          {/* Example: Horizontal line segment from top stat to the right (if desired) */}
          {/* <div className="absolute top-[16%] left-[54%] w-12 h-[1px] border-t border-dotted border-gray-400 z-10 rotate-12"></div> */}

          {/* Line from left stat to image */}
          <div className="absolute top-[48%] left-[20%] w-24 h-[1px] border-t-2 border-dotted border-gray-400 -rotate-0 z-10 md:w-32 md:top-[68%] md:left-[18%]"></div>
          {/* Vertical segment for left stat line */}
          <div className="absolute top-[48%] left-[20%] h-24 w-[1px] border-l-2 border-dotted border-gray-400 -rotate-12 z-10 md:h-32 md:top-[50.25%] md:left-[16.85%]"></div>

          {/* Line from right stat to image */}
          <div className="absolute top-[55%] right-[20%] w-24 h-[1px] border-t-2 border-dotted border-gray-400 rotate-0 z-10 md:w-32 md:top-[45%] md:right-[21.25%]"></div>
          {/* Vertical segment for right stat line */}
          <div className="absolute top-[55%] right-[20%] h-24 w-[1px] border-l-2 border-dotted border-gray-400 -rotate-38 z-10 md:h-32 md:top-[43.25%] md:right-[17.65%]"></div>
          {/* DOTTED LINES END HERE */}

          {/* Top Stat Text Block */}
          <div className="absolute top-[5%] md:top-[1%] left-[50%] -translate-x-1/2 text-center w-48 sm:w-56 z-10">
            <h3 className="text-2xl md:text-5xl font-bold text-gray-900">
              {statsData.top.value}
            </h3>
            <p className="mt-1 text-xs md:text-sm text-gray-600">
              {statsData.top.description}
            </p>
          </div>

          {/* Left Stat Text Block */}
          <div className="absolute top-[35%] md:top-[38%] left-[2%] md:-left-[5%] text-center w-48 sm:w-56 z-10">
            <h3 className="text-2xl md:text-6xl font-bold text-center text-gray-900">
              {statsData.left.value}
            </h3>
            <p className="mt-1 text-3xl md:text-sm text-gray-600 text-center">
              {statsData.left.description}
            </p>
          </div>

          {/* Right Stat Text Block */}
          <div className="absolute top-[45%] md:top-[60%] right-[8%] md:right-[4%] text-center w-48 sm:w-56 z-10">
            <h3 className="text-2xl md:text-6xl font-bold text-gray-900">
              {statsData.right.value}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-gray-600">
              {statsData.right.description}
            </p>
          </div>
        </div>

        {/* Bottom Section: The Starline Effect benefits */}
        <div className="mt-24">
          <div className="text-start mb-16" ref={headingRef}>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              <span className="font-extralight">The </span>Starline Effect —{" "}
              <span className="relative inline-block overflow-hidden">
                <span className="text-gray-700 font-normal relative z-10 px-2 mt">
                  Real Results. Real Speed
                </span>
                <span
                  className={`absolute inset-0 transition-transform duration-1000 ease-out ${
                    isVisible ? "translate-x-0" : "-translate-x-full"
                  }`}
                  style={{ backgroundColor: "#e5f5f9" }}
                />
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 text-center">
            {/* Benefit 1 */}
            <div className="flex flex-col items-center">
              <Image src="/rush.png" alt="Speed icon" width={132} height={64} />{" "}
              <p className="mt-4 text-base text-black">
                Up to <span className="font-semibold">80%</span> faster <br />{" "}
                drawing review
              </p>
            </div>
            {/* Benefit 2 */}
            <div className="flex flex-col items-center">
              <Image
                src="/submission.png"
                alt="Revision icon"
                width={132}
                height={64}
              />{" "}
              <p className="mt-4 text-base text-black">
                60% <span className="font-semibold">fewer revisions</span>{" "}
                <br /> before authority <br />
                submission
              </p>
            </div>
            {/* Benefit 3 */}
            <div className="flex flex-col items-center">
              <Image
                src="/microchip.png"
                alt="AI icon"
                width={132}
                height={64}
              />{" "}
              <p className="mt-4 text-base text-black">
                100% Indian building <br />{" "}
                <span className="font-semibold">code awareness</span>-NBC,{" "}
                <br /> IS, and local bye-laws
              </p>
            </div>
            {/* Benefit 4 */}
            <div className="flex flex-col items-center">
              <Image
                src="/man.png"
                alt="Checking icon"
                width={132}
                height={64}
              />{" "}
              <p className="mt-4 text-base text-black">
                <span className="font-semibold">3 levels</span> of checking{" "}
                <br /> from simple errors <br /> to full code validation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
