"use client";

import { Dispatch, SetStateAction } from "react";
/* Libraries */
import { motion } from "framer-motion";
/* Utils */
import { cn } from "@/utils";

interface PropsChip {
  text: string;
  selected: boolean;
  setSelected: Dispatch<SetStateAction<string>>;
}

export const Chip = (props: PropsChip) => {
  const { selected, text, setSelected } = props;

  return (
    <button
      onClick={() => setSelected(text)}
      className={cn(
        "text-sm transition-colors px-2.5 py-0.5 rounded-md relative",
        selected
          ? "text-white"
          : "text-slate-300 hover:text-slate-200"
      )}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-md"
        ></motion.span>
      )}
    </button>
  );
};
