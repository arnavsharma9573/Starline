import React from "react";
import Image from "next/image";
import { PlayCircle } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* ## Heading Section ## */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            See StarLine AI in action. Our platform simplifies the entire
            process, from upload to compliance, in just a few clicks.
          </p>
        </div>

        {/* ## Video Placeholder Section ## */}
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="relative group cursor-pointer aspect-video">
            {/* Image as a video placeholder */}
            <Image
              src="/Demo.png" // Replace with your desired image path
              alt="StarLine AI Demo Video"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
            />

            {/* Play Icon Overlay */}
            {/* <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-xl">
              <PlayCircle className="w-20 h-20 text-white/80 transform transition-transform duration-300 group-hover:scale-110" />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
