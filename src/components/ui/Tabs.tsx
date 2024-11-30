"use client"

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Chip } from "@/components";

interface Props {
  tabs   : string[];
  content: ReactNode[];
}

export const ChipTabs = ({ tabs, content }: Props) => {
  const [selected, setSelected] = useState(tabs[0]);

  const selectedIndex = tabs.indexOf(selected);

  return (
    <div className="flex flex-col gap-10 p-10">
      <div className="inline-flex bg-slate-800 self-end py-2 px-3 rounded-md">
        {tabs.map((tab) => (
          <Chip
            key={tab} 
            text={tab} 
            selected={selected === tab} 
            setSelected={setSelected}
          />
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mt-4 text-white"
        >
          {content[selectedIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};