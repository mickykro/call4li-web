"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "slow",
  waveOpacity = 0.5,
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const noise = createNoise3D();
  let w: number,
    h: number,
    i: number,
    x: number,
    ctx: any,
    canvas: any;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastTimeRef = useRef<number>(0);
  const ntRef = useRef<number>(0);

  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.0001;
      case "fast":
        return 0.0009;
      default:
        return 0.001;
    }
  };

  const init = () => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    w = ctx.canvas.width = window.innerWidth;
    h = ctx.canvas.height = window.innerHeight;
    ctx.filter = `blur(${5}px)`;
    ntRef.current = 0;
    lastTimeRef.current = performance.now();
    window.onresize = function () {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
      ctx.filter = `blur(${5}px)`;
    };
    render(performance.now());
  };

  const waveColors = colors ?? [
    "#4AEADC",
    "#8B5CF6",
    "#60A5FA",
    "#EC4899",
    "#10B981",
  ];

  const drawWave = (n: number, delta: number) => {
    const speedMultiplier = getSpeed();
    ntRef.current += delta * speedMultiplier;

    const isMobile = window.innerWidth < 768;
    for (i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || (isMobile ? 20 : 30);
      ctx.strokeStyle = waveColors[i % waveColors.length];
      for (x = 0; x < w; x += 5) {
        var waveHeight = isMobile ? 1.7 : 1;
        var y = noise(x / 800, 0.5 * i, ntRef.current) * waveHeight * 100;
        ctx.lineTo(x, y + h * 0.2 + i * 10 + (x / w) * h * 0.53);
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  let animationId: number;
  const render = (currentTime: number) => {
    const delta = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;

    const isMobile = window.innerWidth < 768;
    const gradient = ctx.createLinearGradient(100, 500, w, h);
    gradient.addColorStop(0, "#090909ff");
    gradient.addColorStop(0.3, "#00304aff");
    gradient.addColorStop(0.5, "#022e19ff");
    gradient.addColorStop(0.7, "#000000ff");
    gradient.addColorStop(1, "#001245ff");
    ctx.fillStyle = backgroundFill || gradient;
    ctx.globalAlpha = waveOpacity || 0.5;
    ctx.fillRect(0, 0, w, h);
    drawWave(isMobile ? 10 : 10, delta);
    animationId = requestAnimationFrame(render);
  };

  useEffect(() => {
    init();
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
      navigator.userAgent.includes("Safari") &&
      !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div
      className={cn(
        "h-screen flex flex-col items-center justify-center",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
