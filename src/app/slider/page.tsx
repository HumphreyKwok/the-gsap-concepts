"use client";

import { Inter } from "next/font/google";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const scope = useRef(null);

  useGSAP(
    () => {
      const t1 = gsap.timeline();

      t1.from("#intro-slider", {
        xPercent: "-100",
        duration: 1.3,
        delay: 0.3,
      });

      t1.from(["#title-1", "#title-2", "#title-3"], {
        opacity: 0,
        y: "+=30",
        stagger: 0.3,
      });

      t1.to(["#title-1", "#title-2", "#title-3"], {
        opacity: 0,
        y: "-=30",
        delay: 0.7,
        stagger: 0.3,
      });

      t1.to("#intro-slider", {
        xPercent: "-100",
        duration: 1.3,
      });

      t1.from("#main-title", {
        opacity: 0,
        duration: 1.3,
      });
    },
    { scope },
  );

  return (
    <div className="relative" ref={scope}>
      <div
        id="intro-slider"
        className="absolute left-0 top-0 z-10 flex h-screen w-full flex-col gap-10 bg-gray-50 p-10 font-bold tracking-tight text-neutral-950"
      >
        <h1 id="title-1" className="text-9xl">
          Designer
        </h1>
        <h1 id="title-2" className="text-9xl">
          Developer
        </h1>
        <h1 id="title-3" className="text-9xl">
          Degital Nomad
        </h1>
      </div>
      <div
        className={`grid h-screen items-center justify-center ${inter.className}`}
      >
        <main id="main-title" className="text-8xl font-bold">
          The GSAP Concept
        </main>
      </div>
    </div>
  );
}
