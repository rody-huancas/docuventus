import { useRef } from "react";
import { useOutsideClick } from "@/hooks";

interface Props {
  emojis  : string[];
  onSelect: (emoji: string) => void;
}

export const EmojiPicker = ({ emojis, onSelect }: Props) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => onSelect(""));

  return (
    <div
      ref={dropdownRef}
      className="absolute top-12 left-0 bg-white border rounded shadow-md p-3 grid grid-cols-6 gap-3 w-80 max-h-64 overflow-y-auto"
    >
      {emojis.map((emoji, index) => (
        <button
          key={index}
          onClick={() => onSelect(emoji)}
          className="text-2xl p-2 hover:bg-gray-100 rounded"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};
