"use client";

/*
 * Icone animate in stile Animate UI (https://animate-ui.com/docs/icons):
 * icone Lucide animate con Motion, trigger al passaggio del mouse.
 * Wrapper AnimateIcon: qualsiasi elemento che al hover fa partire
 * l'animazione delle icone al suo interno (propagazione delle varianti).
 */

import { motion, MotionConfig } from "motion/react";

export function AnimateIcon({ as = "span", children, ...props }) {
  const Tag = motion[as] || motion.span;
  return (
    <MotionConfig reducedMotion="user">
      <Tag initial="normal" whileHover="animate" {...props}>
        {children}
      </Tag>
    </MotionConfig>
  );
}

const svgProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function Svg({ size = 24, className, children }) {
  return (
    <motion.svg width={size} height={size} className={className} {...svgProps}>
      {children}
    </motion.svg>
  );
}

/* ---- Frecce ---- */

const slideRight = {
  normal: { x: 0 },
  animate: { x: [0, 4, 0], transition: { duration: 0.5, ease: "easeInOut" } },
};

export function ArrowRight(props) {
  return (
    <Svg {...props}>
      <motion.g variants={slideRight}>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </motion.g>
    </Svg>
  );
}

const slideUpRight = {
  normal: { x: 0, y: 0 },
  animate: {
    x: [0, 3, 0],
    y: [0, -3, 0],
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

export function ArrowUpRight(props) {
  return (
    <Svg {...props}>
      <motion.g variants={slideUpRight}>
        <path d="M7 7h10v10" />
        <path d="M7 17 17 7" />
      </motion.g>
    </Svg>
  );
}

/* ---- Mail ---- */

const flap = {
  normal: { pathLength: 1 },
  animate: {
    pathLength: [1, 0, 1],
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

export function Mail(props) {
  return (
    <Svg {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <motion.path variants={flap} d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </Svg>
  );
}

/* ---- Sparkles (stella — richiama il simbolo indaco) ---- */

const starPulse = {
  normal: { scale: 1, rotate: 0 },
  animate: {
    scale: [1, 1.15, 1],
    rotate: [0, 8, 0],
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const twinkle = (delay) => ({
  normal: { opacity: 1, scale: 1 },
  animate: {
    opacity: [1, 0.2, 1],
    scale: [1, 0.6, 1],
    transition: { duration: 0.6, delay, ease: "easeInOut" },
  },
});

export function Sparkles(props) {
  return (
    <Svg {...props}>
      <motion.path
        variants={starPulse}
        style={{ transformOrigin: "12px 12px" }}
        d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
      />
      <motion.path variants={twinkle(0.1)} d="M20 3v4" />
      <motion.path variants={twinkle(0.1)} d="M22 5h-4" />
      <motion.path variants={twinkle(0.25)} d="M4 17v2" />
      <motion.path variants={twinkle(0.25)} d="M5 18H3" />
    </Svg>
  );
}

/* ---- Occhio ---- */

const look = {
  normal: { x: 0 },
  animate: {
    x: [0, 2.5, -2.5, 0],
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

export function Eye(props) {
  return (
    <Svg {...props}>
      <path d="M2 12s3.5-8 10-8 10 8 10 8-3.5 8-10 8-10-8-10-8Z" />
      <motion.circle variants={look} cx="12" cy="12" r="3" />
    </Svg>
  );
}

/* ---- Box (3D) ---- */

const tilt = {
  normal: { rotate: 0, scale: 1 },
  animate: {
    rotate: [0, -8, 8, 0],
    scale: [1, 1.06, 1],
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

export function Box(props) {
  return (
    <Svg {...props}>
      <motion.g variants={tilt} style={{ transformOrigin: "12px 12px" }}>
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </motion.g>
    </Svg>
  );
}

/* ---- Globo ---- */

const spin = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, 12, -6, 0],
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

export function Globe(props) {
  return (
    <Svg {...props}>
      <motion.g variants={spin} style={{ transformOrigin: "12px 12px" }}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path d="M2 12h20" />
      </motion.g>
    </Svg>
  );
}

/* ---- Smartphone ---- */

const shake = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -8, 8, -4, 0],
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

export function Smartphone(props) {
  return (
    <Svg {...props}>
      <motion.g variants={shake} style={{ transformOrigin: "12px 12px" }}>
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </motion.g>
    </Svg>
  );
}

/* ---- Griglia (design system) ---- */

const cell = (delay) => ({
  normal: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, 0.75, 1],
    opacity: [1, 0.5, 1],
    transition: { duration: 0.5, delay, ease: "easeInOut" },
  },
});

export function LayoutGrid(props) {
  return (
    <Svg {...props}>
      <motion.rect variants={cell(0)} style={{ transformOrigin: "6.5px 6.5px" }} x="3" y="3" width="7" height="7" rx="1" />
      <motion.rect variants={cell(0.1)} style={{ transformOrigin: "17.5px 6.5px" }} x="14" y="3" width="7" height="7" rx="1" />
      <motion.rect variants={cell(0.2)} style={{ transformOrigin: "17.5px 17.5px" }} x="14" y="14" width="7" height="7" rx="1" />
      <motion.rect variants={cell(0.3)} style={{ transformOrigin: "6.5px 17.5px" }} x="3" y="14" width="7" height="7" rx="1" />
    </Svg>
  );
}
