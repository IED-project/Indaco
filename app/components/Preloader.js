"use client";

import { useEffect, useState } from "react";
import { withBasePath } from "@/lib/base-path";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let value = 0;
    const timer = setInterval(() => {
      value += Math.floor(Math.random() * 14) + 10;
      if (value >= 100) {
        value = 100;
        clearInterval(timer);
        setTimeout(() => setDone(true), 200);
      }
      setCount(value);
    }, 60);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`preloader${done ? " done" : ""}`} aria-hidden={done}>
      <img
        className="preloader__logo"
        src={withBasePath("/images/logo-white.svg")}
        alt="indaco"
      />
      <div className="preloader__count">{count}%</div>
    </div>
  );
}
