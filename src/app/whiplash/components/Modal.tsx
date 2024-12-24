import Image from "next/image";

import { motion } from "motion/react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

type TProps = {
  modal: {
    active: boolean;
    index: number;
  };
  projects: {
    title: string;
    roles: string[];
    src: string;
  }[];
};

const Modal = ({ modal, projects }: TProps) => {
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  const { active, index } = modal;

  const scaleAnimation = {
    initial: { scale: 0, x: "-50%", y: "-50%" },
    enter: {
      scale: 1,
      x: "-50%",
      y: "-50%",
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      scale: 0,
      x: "-50%",
      y: "-50%",
      transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
    },
  };

  useGSAP(() => {
    const xMoveContainer = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    const yMoveContainer = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });
    //Move cursor
    const xMoveCursor = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    const yMoveCursor = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });
    //Move cursor label
    const xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    const yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });

    window.addEventListener("mousemove", (e) => {
      const { pageX, pageY } = e;
      xMoveContainer(pageX);
      yMoveContainer(pageY);
      xMoveCursor(pageX);
      yMoveCursor(pageY);
      xMoveCursorLabel(pageX);
      yMoveCursorLabel(pageY);
    });
  });

  return (
    <>
      <motion.div
        id="container"
        className="pointer-events-none absolute h-[400px] w-[600px] overflow-hidden"
        variants={scaleAnimation}
        initial={"initial"}
        animate={active ? "enter" : "close"}
        ref={modalContainer}
      >
        <div
          id="modalSlider"
          style={{
            top: `${index * -100}%`,
            transition: "top 0.5s cubic-bezier(0.76, 0, 0.24, 1)",
          }}
          className="absolute h-full w-full"
        >
          {projects.map((project) => {
            const { title, src } = project;
            return (
              <div
                key={`${title}_image`}
                className="flex h-full w-full items-center justify-center"
                id="modal"
              >
                <Image
                  src={`/whiplash/${src}`}
                  width={600}
                  height={400}
                  alt={`${title} image`}
                  className="hidden h-fit w-fit rounded-lg md:block"
                />
                <Image
                  src={`/whiplash/${src}`}
                  width={300}
                  height={200}
                  alt={`${title} image`}
                  className="block h-fit w-fit rounded-md md:hidden"
                />
              </div>
            );
          })}
        </div>
      </motion.div>
      <motion.div
        ref={cursor}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="pointer-events-none absolute h-20 w-20 rounded-full bg-gray-950"
      ></motion.div>
      <motion.div
        ref={cursorLabel}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="pointer-events-none absolute text-white"
      >
        View
      </motion.div>
    </>
  );
};

export default Modal;
