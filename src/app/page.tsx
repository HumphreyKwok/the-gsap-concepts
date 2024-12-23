"use client";

import { artworks } from "./arts";
import Lenis from "lenis";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const GalleryPage = () => {
  const scope = useRef(null);
  useGSAP(
    () => {
      const lenis = new Lenis();
      const pinnedHeight = window.innerHeight * 10;
      const images: HTMLImageElement[] = gsap.utils.toArray(".img");

      lenis.on("virtual-scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      gsap.to("h1", {
        opacity: 1,
        duration: 1,
        delay: 0.3,
      });

      const animateImageEntry = (img: HTMLImageElement) => {
        gsap.fromTo(
          img,
          {
            scale: 1.25,
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%",
            opacity: 0,
            // filter: "contrast(2) brightness(10)",
          },
          {
            scale: 1,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            opacity: 1,
            // filter: "contrast(1) brightness(1)",
            duration: 1,
            ease: "power2.inOut",
          },
        );

        // gsap.fromTo(
        //   "img",
        //   {
        //     filter: "contrast(1.2) brightness(5)",
        //   },
        //   {
        //     filter: "contrast(1) brightness(1)",
        //     duration: 1,
        //     ease: "power2.inOut",
        //   },
        // );
      };

      const animateImageExitForward = (img: HTMLImageElement) => {
        gsap.to(img, {
          scale: 0.5,
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
        });
      };

      const animateImageExitReverse = (img: HTMLImageElement) => {
        gsap.to(img, {
          scale: 1.25,
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%",
          duration: 1,
          ease: "power2.inOut",
        });

        // gsap.to("img", {
        //   filter: "contrast(1) brightness(1)",
        //   duration: 1,
        //   ease: "power2.inOut",
        // });
      };

      animateImageEntry(images[0] as HTMLImageElement);

      let lastCycle = 0;

      ScrollTrigger.create({
        trigger: ".pinned",
        start: "top top",
        end: `+=${pinnedHeight} *2`,
        pin: true,
        pinSpacing: true,
        scrub: 0.1,
        onUpdate: (self) => {
          const totalProgress = self.progress * artworks.length;
          const currentCycle = Math.floor(totalProgress);
          const cycleProgress = (totalProgress % 1) * 100;
          const lastImageIndex = images.length - 1;

          // Only scale the current image if it's not the last one
          if (currentCycle < images.length) {
            const currentImage = images[currentCycle];
            // Don't scale down the last image when it's fully visible
            if (currentCycle !== lastImageIndex || cycleProgress < 1) {
              const scale = 1 - (0.25 * cycleProgress) / 100;
              gsap.to(currentImage, {
                scale,
                duration: 0.1,
                overwrite: "auto",
              });
            }
          }

          if (currentCycle !== lastCycle) {
            if (self.direction > 0) {
              // Don't animate exit for the last image
              if (lastCycle < images.length && lastCycle !== lastImageIndex) {
                animateImageExitForward(images[lastCycle]);
              }

              if (currentCycle < images.length) {
                animateImageEntry(images[currentCycle]);
              }
            } else {
              if (currentCycle < images.length) {
                animateImageEntry(images[currentCycle]);
              }

              // Don't animate exit for the last image
              if (
                lastCycle < images.length &&
                currentCycle !== lastImageIndex
              ) {
                animateImageExitReverse(images[lastCycle]);
              }
            }
            lastCycle = currentCycle;
          }

          // Update progress bar
          if (currentCycle < artworks.length) {
            // Don't update progress bar beyond the last image
            if (currentCycle !== lastImageIndex || cycleProgress < 100) {
              gsap.to(".progress", {
                height: `${cycleProgress}%`,
                duration: 0.1,
                overwrite: true,
              });

              if (cycleProgress < 1 && self.direction > 0) {
                gsap.set(".progress", { height: "0%" });
              } else if (cycleProgress > 99 && self.direction < 0) {
                gsap.set(".progress", { height: "100%" });
              }
            }
          }
        },
      });
    },
    { scope },
  );

  return (
    <main className="container" ref={scope}>
      <section className="about relative flex h-screen w-screen flex-col justify-center bg-black p-4 lg:p-40">
        <h1 className="text-lg opacity-0 lg:text-3xl">
          Today's Featured GSAP Concept:
        </h1>
        <h1 className="text-3xl opacity-0 lg:text-9xl">Deja Vu</h1>
        <h1 className="text-3xl opacity-0 lg:text-9xl">Moments</h1>
      </section>

      <section className="pinned relative h-screen w-screen bg-neutral-950">
        <div className="info absolute top-1/2 z-10 hidden w-screen -translate-y-1/2 items-center justify-between p-40 lg:flex">
          {/* <div className="title">
            <p className="uppercase">Title</p>
          </div>
          <div className="tagline">
            <p className="uppercase">Tagline</p>
          </div> */}
          <div className="year">
            <p className="uppercase">2024</p>
          </div>
          {/* <div className="tag">
            <p className="uppercase">Tag</p>
          </div> */}
          <div className="link">
            <a
              href="#"
              className="rounded-lg border border-white border-opacity-25 p-2 uppercase hover:border-opacity-100"
            >
              Explore
            </a>
          </div>
        </div>

        <div className="progress-bar absolute left-[85%] top-1/2 z-50 h-[120px] w-1 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-slate-600 lg:left-3/4">
          <div className="progress absolute left-0 top-0 h-[0%] w-full bg-white"></div>
        </div>

        <div className="img dejavu-clip-path absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 lg:w-fit">
          <img
            src="/dejavu/01.jpg"
            alt=""
            className="h-screen w-screen object-cover lg:h-[50rem] lg:w-[30rem]"
          />
        </div>
        <div className="img dejavu-clip-path absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 lg:w-fit">
          <img
            src="/dejavu/02.jpg"
            alt=""
            className="h-screen w-screen object-cover lg:h-[50rem] lg:w-[30rem]"
          />
        </div>
        <div className="img dejavu-clip-path absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 lg:w-fit">
          <img
            src="/dejavu/03.jpg"
            alt=""
            className="h-screen w-screen object-cover lg:h-[50rem] lg:w-[30rem]"
          />
        </div>
        <div className="img dejavu-clip-path absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 lg:w-fit">
          <img
            src="/dejavu/04.jpg"
            alt=""
            className="h-screen w-screen object-cover lg:h-[50rem] lg:w-[30rem]"
          />
        </div>
        <div className="img dejavu-clip-path absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 lg:w-fit">
          <img
            src="/dejavu/05.jpg"
            alt=""
            className="h-screen w-screen object-cover lg:h-[50rem] lg:w-[30rem]"
          />
        </div>
        <div className="img dejavu-clip-path absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 lg:w-fit">
          <img
            src="/dejavu/06.jpg"
            alt=""
            className="h-screen w-screen object-cover lg:h-[50rem] lg:w-[30rem]"
          />
        </div>
        <div className="img dejavu-clip-path absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 lg:w-fit">
          <img
            src="/dejavu/07.jpg"
            alt=""
            className="h-screen w-screen object-cover lg:h-[50rem] lg:w-[30rem]"
          />
        </div>
        <div className="img dejavu-clip-path absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 lg:w-fit">
          <img
            src="/dejavu/08.jpg"
            alt=""
            className="h-screen w-screen object-cover lg:h-[50rem] lg:w-[30rem]"
          />
        </div>
      </section>
      <section className="about relative flex h-screen w-screen flex-col items-center justify-center gap-2 bg-black">
        <p>The GSAP Concepts, 2024</p>
        <p>
          Contact: <a href="mailto:contact@hinzik.dev">contact@hinzik.dev</a>
        </p>
      </section>
    </main>
  );
};

export default GalleryPage;
