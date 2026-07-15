"use client";

import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-cards";

import { cn } from "@/lib/utils";

const Skiper47 = () => {
  const images = [
    {
      src: "/images/x.com/11.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/13.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/32.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/20.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/21.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/19.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
  ];

  return (
    <div
      className="flex h-full w-full items-center justify-center overflow-hidden bg-[#f5f4f3]">
      <Carousel_001 className="" images={images} showPagination loop />
    </div>
  );
};

export { Skiper47 };

const Carousel_001 = ({
  images,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 40,
}) => {
  const css = `
  .Carousal_001 {
    padding-bottom: 50px !important;
  }
  `;
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("relative w-full", className)}>
      <style>{css}</style>
      <Swiper
        spaceBetween={spaceBetween}
        autoplay={
          autoplay
            ? {
                delay: 1500,
                disableOnInteraction: false,
              }
            : false
        }
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={loop}
        slidesPerView={1.12}
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
        pagination={
          showPagination
            ? {
                clickable: true,
              }
            : false
        }
        navigation={
          showNavigation
            ? {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }
            : false
        }
        className="Carousal_001"
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}>
        {images.map((image, index) => (
          <SwiperSlide
            key={image.src}
            className="group relative !h-[clamp(300px,42vw,540px)] w-full overflow-hidden rounded-[22px] border border-white/10 bg-[#12081f]"
          >
            <img
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              src={image.img ?? image.src}
              alt={image.alt}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090212]/95 via-[#090212]/10 to-transparent" />
            <span className="absolute right-5 top-5 font-mono text-sm tracking-[0.16em] text-white/75">
              {image.num ?? String(index + 1).padStart(2, "0")}
            </span>
            {(image.titolo || image.eyebrow) && (
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <span className="text-[0.68rem] tracking-[0.18em] text-[#b68cf6] uppercase">
                  {image.eyebrow}
                </span>
                <h3 className="mt-2 text-2xl font-medium tracking-[-0.02em] text-white sm:text-3xl">
                  {image.titolo}
                </h3>
              </div>
            )}
          </SwiperSlide>
        ))}
        {showNavigation && (
          <div>
            <div
              className="swiper-button-next after:hidden !right-4 !h-11 !w-11 rounded-full border border-white/20 bg-[#090212]/65 backdrop-blur-md"
              aria-label="Progetto successivo"
            >
              <ChevronRightIcon className="h-5 w-5 text-white" />
            </div>
            <div
              className="swiper-button-prev after:hidden !left-4 !h-11 !w-11 rounded-full border border-white/20 bg-[#090212]/65 backdrop-blur-md"
              aria-label="Progetto precedente"
            >
              <ChevronLeftIcon className="h-5 w-5 text-white" />
            </div>
          </div>
        )}
      </Swiper>
    </motion.div>
  );
};

export { Carousel_001 };

/**
 * Skiper 47 Carousel_001 — React + Swiper
 * Built with Swiper.js - Read docs to learn more https://swiperjs.com/
 * Illustrations by AarzooAly - https://x.com/AarzooAly
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.me
 * Twitter: https://x.com/Gur__vi
 */
