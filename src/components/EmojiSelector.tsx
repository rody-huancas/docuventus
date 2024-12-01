import { useRef, useEffect } from 'react';
/* Constants */
import { EMOJIS } from "@/constants";
/* Interfaces */
import { EmojiSelectorProps } from '@/interfaces';
/* Icons */
import { FaSmile } from "react-icons/fa";

export const EmojiSelector= ({ show, onToggle, onSelect }: EmojiSelectorProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onToggle();
      }
    };

    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [show, onToggle]);

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="bg-transparent"
      >
        <FaSmile className="text-[#ffc83d]" size={25} />
      </button>

      {show && (
        <div
          ref={dropdownRef}
          className="absolute top-12 left-0 bg-white border rounded p-3 grid grid-cols-6 gap-3 w-80 max-h-64 overflow-y-auto"
        >
          {EMOJIS.map((emoji, index) => (
            <button
              key={index}
              onClick={() => onSelect(emoji)}
              className="text-2xl p-2 hover:bg-gray-100 rounded"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};