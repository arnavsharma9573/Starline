import React from "react";
import { Building2, ChevronRight, FileCheck, Users } from "lucide-react";
import Image from "next/image";

export default function ComplianceHero() {
  return (
    <div className="py-16">
      {/* Hero Section */}
      <div className="container max-w-7xl ml-38 px-1">
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
                Create Account
                <span className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  <ChevronRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pain Points Section */}
        <div className="mt-24">
          <Image
            src={"/StaticImg.png"}
            width={150}
            height={180}
            alt="Building structure"
            className="absolute left-0 top-[40%] -translate-y-1/2 opacity-98"
          />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side: Icons and their labels grouped together */}
            <div className="grid grid-cols-3 gap-6">
              {/* Item 1: Worker Icon + Label */}
              <div className="flex flex-col items-center text-center gap-4">
                <div
                  className="w-42 h-42 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: "#e5f5f9" }}
                >
                  <Image
                    src={"/architect.png"}
                    width={100}
                    height={32}
                    alt="approved"
                  />
                </div>
                <p className="text-gray-600 font-medium text-sm">
                  Manual drawing checks
                  <br />
                  before approval
                </p>
              </div>

              {/* Item 2: Code Icon + Label */}
              <div className="flex flex-col items-center text-center gap-4">
                <div
                  className="w-42 h-42 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: "#e5f5f9" }}
                >
                  <Image
                    src={"/catalogue.png"}
                    width={100}
                    height={32}
                    alt="approved"
                  />
                </div>
                <p className="text-gray-600 font-medium text-sm">
                  Constantly changing
                  <br />
                  building codes.
                </p>
              </div>

              {/* Item 3: Approval Icon + Label */}
              <div className="flex flex-col items-center text-center gap-4">
                <div
                  className="w-42 h-42 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: "#e5f5f9" }}
                >
                  <Image
                    src={"/approved.png"}
                    width={100}
                    height={32}
                    alt="approved"
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
            <div className="space-y-2">
              <h2 className="text-4xl font-extralight text-gray-900">
                Construction <span className="font-bold">moves slowly.</span>
                <br />
                What makes it slower?{" "}
                <span className="absolute top-[42.25%] left-[54%] translate-x-full ml-2 mt-1 h-8 w-86 bg-[#e5f5f9] -translate-y-1/2"></span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
