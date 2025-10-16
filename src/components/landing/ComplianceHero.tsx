import React from "react";
import {ChevronRight} from "lucide-react";
import Image from "next/image";

export default function ComplianceHero() {
  return (
    <div className="py-16">
      {/* Hero Section */}
      <div className="container max-w-7xl mx-auto ml-38 px-1">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl text-gray-900 leading-tight">
              Ensures Every
              <br />
              <span className="font-bold">Drawing Complies</span> with <br />
              Indian Building Regulations
            </h1>
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            <div className="rounded-2xl">
              <p className="text-gray-700 leading-relaxed">
                In the world of architecture and construction, a single line on
                a drawing can define the safety, function, and legality of a
                building. Yet, one small error — A wrong dimension, a misplaced
                door, or a code violation — can lead to project delays,
                re-approvals, and even complete rework.
              </p>
            </div>
            <div className="flex justify-end">
              <button className="bg-black hover:bg-gray-800 text-white rounded-full font-semibold text-sm transition-all transform hover:scale-105 shadow-lg flex items-center px-4 py-2 gap-2">
                Watch Demo
                <span className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  <ChevronRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pain Points Section */}
      </div>
      <div className="bg-[#ebfbff] bg-dotted-pattern [background-size:1rem_1rem]">
        <div className="mt-24 max-w-7xl mx-auto py-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side: Icons */}
            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center gap-4">
                <div
                  className="w-42 h-42 flex items-center justify-center rounded-full bg-white"
                  
                >
                  <Image
                    src={"/architect.png"}
                    width={80}
                    height={32}
                    alt="Manual drawing checks"
                  />
                </div>
                <p className="text-gray-600 font-medium text-sm">
                  Manual drawing checks
                  <br />
                  before approval
                </p>
              </div>

              <div className="flex flex-col items-center text-center gap-4">
                <div
                  className="w-42 h-42 flex items-center justify-center rounded-full bg-white"
                >
                  <Image
                    src={"/catalogue.png"}
                    width={80}
                    height={32}
                    alt="Building codes"
                  />
                </div>
                <p className="text-gray-600 font-medium text-sm">
                  Constantly changing
                  <br />
                  building codes.
                </p>
              </div>

              <div className="flex flex-col items-center text-center gap-4">
                <div
                  className="w-42 h-42 flex items-center justify-center rounded-full bg-white"
                >
                  <Image
                    src={"/approved.png"}
                    width={80}
                    height={32}
                    alt="Revisions and re-approvals"
                  />
                </div>
                <p className="text-gray-600 font-medium text-sm">
                  Delays from revisions
                  <br />
                  and re-approvals.
                </p>
              </div>
            </div>

            {/* Right side: Problem Statement */}
            <div className="space-y-2 relative">
              <h2 className="text-5xl font-extralight text-gray-900">
                Construction <span className="font-bold">moves slowly.</span>
                <br />What makes it slower?
              </h2>
              <span
                className="absolute top-[62%] -right-4 h-8 w-40 bg-[#e5f5f9] -z-1"
                style={{ transform: "translateY(-50%)" }}
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
