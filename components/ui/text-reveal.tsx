"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextRevealCard = ({
  text,
  revealText,
  children,
  className,
}: {
  text: string;
  revealText: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleInteraction = () => {
    if (isMobile) {
      setIsRevealed(!isRevealed);
    }
  };

  return (
    <div
      className={cn(
        "bg-[#1d1c20] border border-white/[0.08] w-full max-w-[40rem] rounded-lg p-4 sm:p-8 relative overflow-hidden",
        className,
      )}
      onMouseEnter={() => !isMobile && setIsRevealed(true)}
      onMouseLeave={() => !isMobile && setIsRevealed(false)}
      onClick={handleInteraction}
    >
      {children}

      <div className="h-40 relative flex items-center overflow-hidden">
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: `inset(0 ${isRevealed ? "0%" : "100%"} 0 0)` }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-[#1d1c20] z-20"
        >
          <p className="text-2xl sm:text-[3rem] py-6 sm:py-10 font-bold text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300">
            {revealText}
          </p>
        </motion.div>

        <div className="overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]">
          <p className="text-2xl sm:text-[3rem] py-6 sm:py-10 font-bold bg-clip-text text-transparent bg-[#323238]">
            {text}
          </p>
          <MemoizedStars />
        </div>
      </div>

      {isMobile && (
        <div className="absolute bottom-2 right-2 text-white/50 text-xs">
          Toque para revelar!
        </div>
      )}
    </div>
  );
};

export const TextRevealCardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={cn("text-white text-lg mb-2", className)}>{children}</h2>
  );
};

export const TextRevealCardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <p className={cn("text-[#a9a9a9] text-sm", className)}>{children}</p>;
};

const Stars = () => {
  const randomMove = () => Math.random() * 4 - 2;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();
  return (
    <div className="absolute inset-0">
      {[...Array(80)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 10 + 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            backgroundColor: "white",
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block"
        ></motion.span>
      ))}
    </div>
  );
};

export const MemoizedStars = React.memo(Stars);
