"use client";

import { motion } from "motion/react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { cn } from "@/lib/utils";

function Skiper47({ projects, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative w-full", className)}
    >
      <Swiper
        aria-label="Carosello dei progetti selezionati"
        effect="coverflow"
        grabCursor
        centeredSlides
        loop={projects.length > 2}
        slidesPerView={1.12}
        spaceBetween={24}
        breakpoints={{
          640: { slidesPerView: 1.45 },
          900: { slidesPerView: 2.15 },
          1200: { slidesPerView: 2.43 },
        }}
        coverflowEffect={{
          rotate: 0,
          slideShadows: false,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".projects-carousel__next",
          prevEl: ".projects-carousel__prev",
        }}
        modules={[EffectCoverflow, Navigation, Pagination]}
        className="Carousal_001"
      >
        {projects.map((project) => (
          <SwiperSlide
            key={project.number}
            className="group relative !h-[clamp(300px,42vw,540px)] w-full overflow-hidden rounded-[22px] border border-white/10 bg-[#12081f]"
          >
            <img
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              src={project.image}
              alt={project.alt}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090212]/95 via-[#090212]/10 to-transparent" />
            <span className="absolute right-5 top-5 font-mono text-sm tracking-[0.16em] text-white/75">
              {project.number}
            </span>
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <span className="text-[0.68rem] tracking-[0.18em] text-[#b68cf6] uppercase">
                {project.category}
              </span>
              <h3 className="mt-2 text-2xl font-medium tracking-[-0.02em] text-white sm:text-3xl">
                {project.title}
              </h3>
            </div>
          </SwiperSlide>
        ))}

        <button
          type="button"
          className="projects-carousel__next swiper-button-next after:hidden !right-4 !h-11 !w-11 rounded-full border border-white/20 bg-[#090212]/65 backdrop-blur-md"
          aria-label="Progetto successivo"
        >
          <ChevronRightIcon className="h-5 w-5 text-white" />
        </button>
        <button
          type="button"
          className="projects-carousel__prev swiper-button-prev after:hidden !left-4 !h-11 !w-11 rounded-full border border-white/20 bg-[#090212]/65 backdrop-blur-md"
          aria-label="Progetto precedente"
        >
          <ChevronLeftIcon className="h-5 w-5 text-white" />
        </button>
      </Swiper>
    </motion.div>
  );
}

export { Skiper47 };

/**
 * Skiper 47 — coverflow carousel built with Swiper.js.
 * Source: https://skiper-ui.com
 * Attribution retained as required by the free Skiper UI license.
 */
