"use client";

import React from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";

export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
}

/**
 * ScrollReveal: Animates an element into view when scrolled into the viewport.
 * Uses smooth cubic bezier easing and subtle translate/opacity transition.
 */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.65,
  yOffset = 30,
  direction = "up",
  once = true,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  let initialX = 0;
  let initialY = 0;

  if (!shouldReduceMotion) {
    if (direction === "up") initialY = yOffset;
    if (direction === "down") initialY = -yOffset;
    if (direction === "left") initialX = yOffset;
    if (direction === "right") initialX = -yOffset;
  }

  return (
    <motion.div
      initial={{
        opacity: shouldReduceMotion ? 1 : 0,
        x: initialX,
        y: initialY,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once, margin: "-40px" }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: EASE_PREMIUM,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  once?: boolean;
}

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: { staggerDelay: number; delayChildren: number }) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.staggerDelay,
      delayChildren: custom.delayChildren,
    },
  }),
};

export function StaggerGroup({
  children,
  className = "",
  staggerDelay = 0.06,
  delayChildren = 0.05,
  once = true,
}: StaggerGroupProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-30px" }}
      custom={{ staggerDelay, delayChildren }}
      variants={staggerContainerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
  duration?: number;
}

export function StaggerItem({
  children,
  className = "",
  yOffset = 28,
  duration = 0.55,
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : yOffset,
      scale: shouldReduceMotion ? 1 : 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : duration,
        ease: EASE_PREMIUM,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
