"use client";
import { useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);
import Project from "./components/Project";
import Modal from "./components/Modal";

const projects = [
  {
    title: "giselle",
    roles: ["rapper", "vocalist"],
    src: "giselle.webp",
  },
  {
    title: "karina",
    roles: ["leader", "dancer", "rapper", "vocalist"],
    src: "karina.webp",
  },
  {
    title: "ningning",
    roles: ["dancer", "rapper", "vocalist"],
    src: "ningning.webp",
  },
  {
    title: "winter",
    roles: ["dancer", "vocalist"],
    src: "winter.webp",
  },
];

const Whiplash = () => {
  const scope = useRef(null);
  const [modal, setModal] = useState({ active: false, index: 0 });

  useGSAP(
    () => {
      const t1 = gsap.timeline();

      t1.from(["#title-1", "#title-2", "#title-3"], {
        opacity: 0,
        y: "+=30",
        stagger: 0.5,
      });

      t1.to("#intro-slider", {
        xPercent: "-100",
        duration: 1.3,
        delay: 1,
      });

      t1.from("main", {
        opacity: 0,
        duration: 1,
      });
    },
    { scope },
  );

  return (
    <div className="relative" ref={scope}>
      <div
        id="intro-slider"
        className="absolute left-0 top-0 z-10 flex h-screen w-full flex-col justify-center bg-neutral-950 p-10 font-bold tracking-tight text-gray-50"
      >
        <h1 id="title-1" className="pb-10 text-xl lg:text-4xl">
          The GSAP Concept of the day:
        </h1>
        <h1 id="title-2" className="text-sm lg:text-4xl">
          Aespa
        </h1>
        <h1 id="title-3" className="text-2xl lg:text-9xl">
          Whiplash
        </h1>
      </div>

      <main className="flex h-screen flex-col items-center justify-center bg-slate-50 text-neutral-900">
        <div className="flex h-full w-full flex-col justify-center gap-2 px-10 md:px-20 xl:px-60">
          {projects.map((project, index) => (
            <Project
              key={project.title}
              index={index}
              title={project.title}
              roles={project.roles}
              setModal={setModal}
            />
          ))}
        </div>
        <Modal modal={modal} projects={projects} />
      </main>
    </div>
  );
};

export default Whiplash;
