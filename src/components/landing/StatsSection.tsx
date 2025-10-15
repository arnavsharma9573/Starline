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
    <section className="py-18 md:py-22 overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main container for the image and absolutely positioned text */}
        <div className="relative w-full max-w-6xl mx-auto aspect-[4/2.5]">
          {/* Central image with figures and lines */}
          <Image
            src="/HOUSENUMBER.jpg" // Using your specified image name
            alt="Building with connected figures illustrating construction delays"
            objectFit="contain"
            className="z-0"
            width={1480}
            height={1000}
          />

          {/* Top Stat Text Block */}
          <div className="absolute top-[5%] md:top-[16%] left-[54%] -translate-x-1/2 text-center w-48 sm:w-56 z-10">
            <h3 className="text-2xl md:text-5xl font-bold text-gray-900">
              {statsData.top.value}
            </h3>
            <p className="mt-1 text-xs md:text-sm text-gray-600">
              {statsData.top.description}
            </p>
          </div>

          {/* Left Stat Text Block */}
          <div className="absolute top-[35%] md:top-[60%] left-[2%] md:-left-[6%] text-center w-48 sm:w-56 z-10">
            <h3 className="text-2xl md:text-6xl font-bold text-center text-gray-900">
              {statsData.left.value}
            </h3>
            <p className="mt-1 text-3xl md:text-sm text-gray-600 text-center">
              {statsData.left.description}
            </p>
          </div>

          {/* Right Stat Text Block */}
          <div className="absolute top-[45%] md:top-[60%] right-[2%] md:-right-[6%] text-center w-48 sm:w-56 z-10">
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
              <span className="font-extralight">The </span>Starline Effect{" "}
              <span className="relative inline-block overflow-hidden">
                <span className="text-gray-700 font-normal relative z-10 px-2 mt-1">
                  — Real Results. Real Speed
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
              {/* **REPLACE ICON PATH** */}
              <p className="mt-4 text-base font-semibold text-gray-600">
                Up to 80% faster <br /> drawing review
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
              {/* **REPLACE ICON PATH** */}
              <p className="mt-4 text-base font-semibold text-gray-600">
                60% fewer revisions <br /> before authority <br />submission
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
              {/* **REPLACE ICON PATH** */}
              <p className="mt-4 text-base font-semibold text-gray-600">
                100% Indian building <br />code awareness-NBC, <br /> IS, and local bye-laws
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
              <p className="mt-4 text-base font-semibold text-gray-600">
                3 levels of checking <br /> from simple errors <br /> to full code validation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
