"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const PHRASES = ["checkout systems", "AI monitoring tools", "web apps", "whatever needs solving"];

const TYPE_MS = 70;
const DELETE_MS = 38;
const HOLD_MS = 1400;

/**
 * Types out each phrase, holds, deletes, and moves to the next — forever. A
 * blinking caret trails the text. Under reduced motion, the longest phrase is
 * shown static (no caret animation, no layout shift).
 */
export function TypingText() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    const phrase = PHRASES[index];

    // Every transition is scheduled — no synchronous setState in the effect body.
    let delay = deleting ? DELETE_MS : TYPE_MS;
    if (!deleting && text === phrase) delay = HOLD_MS;
    else if (deleting && text === "") delay = DELETE_MS;

    const t = setTimeout(() => {
      if (!deleting && text === phrase) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % PHRASES.length);
      } else {
        setText(
          deleting ? phrase.slice(0, text.length - 1) : phrase.slice(0, text.length + 1)
        );
      }
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, index, reduceMotion]);

  if (reduceMotion) {
    return <span className="text-accent">whatever needs solving</span>;
  }

  return (
    <span>
      <span className="text-accent">{text}</span>
      <span className="animate-blink ml-0.5 font-light text-accent">|</span>
    </span>
  );
}
