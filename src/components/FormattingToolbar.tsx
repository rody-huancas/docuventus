import { useState } from "react";
import { EmojiPicker } from "@/components";
import { HEADER_SIZES, EMOJIS } from "@/constants";
import { FaBold, FaItalic, FaSmile } from "react-icons/fa";

interface Props {
  headerSize    : string;
  onHeaderChange: (header: string) => void;
  onFormatText  : (formattedText: string) => void;
  onInsertEmoji : (emoji: string) => void;
}

export const FormattingToolbar = (props: Props) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { headerSize, onHeaderChange, onFormatText, onInsertEmoji } = props

  const handleFormat = (formatType: "bold" | "italic") => {
    const formatSymbols = formatType === "bold" ? "**" : "*";
    onFormatText(`${formatSymbols}selectedText${formatSymbols}`);
  };

  return (
    <div className="flex space-x-2 items-center relative">
      <select
        value={headerSize}
        onChange={(e) => onHeaderChange(e.target.value)}
        className="p-2 border-none rounded"
      >
        {HEADER_SIZES.map((size) => (
          <option key={size.value} value={size.value}>
            {size.label}
          </option>
        ))}
      </select>

      <button
        onClick={() => handleFormat("bold")}
        className="p-3 rounded bg-gray-100 hover:bg-gray-200"
      >
        <FaBold />
      </button>

      <button
        onClick={() => handleFormat("italic")}
        className="p-3 rounded bg-gray-100 hover:bg-gray-200"
      >
        <FaItalic />
      </button>

      <div className="relative">
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="p-2 rounded bg-transparent"
        >
          <FaSmile className="text-[#FFC83D]" size={25} />
        </button>

        {showEmojiPicker && (
          <EmojiPicker
            emojis={EMOJIS}
            onSelect={(emoji) => {
              onInsertEmoji(emoji);
              setShowEmojiPicker(false);
            }}
          />
        )}
      </div>
    </div>
  );
};
