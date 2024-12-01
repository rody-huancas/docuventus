"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils";

interface FormPanel {
  id     : string;
  title  : string;
  content: React.ReactNode;
}

interface MultiFormProps {
  panels: FormPanel[];
}

export const MultiForm = ({ panels }: MultiFormProps) => {
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);

  const nextPanel = () => {
    if (currentPanelIndex < panels.length - 1) {
      setCurrentPanelIndex(currentPanelIndex + 1);
    }
  };

  const prevPanel = () => {
    if (currentPanelIndex > 0) {
      setCurrentPanelIndex(currentPanelIndex - 1);
    }
  };

  const progressPercentage = ((currentPanelIndex + 1) / panels.length) * 100;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-transparent shadow-lg rounded-lg relative">
      <div className="relative mb-16">
        <div className="absolute w-full h-2 bg-gray-300 rounded-full">
          <motion.div
            className="h-2 bg-blue-500 rounded-full"
            style={{ width: `${progressPercentage}%` }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="absolute -top-4 left-0 right-0 flex justify-between text-sm font-bold text-blue-500">
          {panels.map((_, index) => (
            <span
              key={index}
              className={cn("py-3 px-4 rounded-full",
                index <= currentPanelIndex ? "bg-blue-500 text-white" : "bg-white text-blue-500"
              )}
            >
              {index + 1}
            </span>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPanelIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {panels[currentPanelIndex].content}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-6">
        <button
          onClick={prevPanel}
          disabled={currentPanelIndex === 0}
          className={cn(
            "flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded",
            "disabled:opacity-50 hover:bg-gray-300 transition"
          )}
        >
          Anterior
        </button>

        {currentPanelIndex !== panels.length - 1 && (
          <button
            onClick={nextPanel}
            className={cn(
              "flex items-center px-4 py-2 bg-blue-500 text-white rounded",
              "hover:bg-blue-600 transition"
            )}
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
};
