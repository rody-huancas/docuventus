"use client";

import { EMOJIS, HEADER_SIZES } from "@/constants";
import { useState, useRef, useEffect } from "react";
import { FaBold, FaItalic, FaSmile } from "react-icons/fa";

interface Props {
  onCustomSectionChange: (section: string) => void;
}

export const CustomSectionInput = ({ onCustomSectionChange }: Props) => {
  const [text, setText] = useState("");
  const [headerSize, setHeaderSize] = useState("");
  const [showEmojiDropdown, setShowEmojiDropdown] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleTextChange = (newText: string) => {
    setText(newText);
    updateCustomSection(newText, headerSize);
  };

  const updateCustomSection = (currentText: string, header: string) => {
    let formattedText = currentText;
    if (header) {
      formattedText = formattedText.replace(/^#+\s*/, "").trim();
      formattedText = `${header} ${formattedText}`.trim();
    }
    onCustomSectionChange(formattedText);
  };

  const handleHeaderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newHeaderSize = e.target.value;
    setHeaderSize(newHeaderSize);
    updateCustomSection(text, newHeaderSize);
  };

  const applyFormat = (formatType: "bold" | "italic") => {
    if (!textareaRef.current) return;
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    if (start === end) return;

    const selectedText = text.substring(start, end);
    const beforeText = text.substring(0, start);
    const afterText = text.substring(end);

    const formatSymbols = formatType === "bold" ? "**" : "*";
    const formattedText = `${beforeText}${formatSymbols}${selectedText}${formatSymbols}${afterText}`;
    setText(formattedText);
    updateCustomSection(formattedText, headerSize);

    setTimeout(() => {
      textareaRef.current?.setSelectionRange(
        start + formatSymbols.length,
        end + formatSymbols.length
      );
    }, 0);
  };

  const insertEmoji = (emoji: string) => {
    if (!textareaRef.current) return;
    const start = textareaRef.current.selectionStart || 0;
    const end = textareaRef.current.selectionEnd || 0;

    const beforeText = text.substring(0, start);
    const afterText = text.substring(end);

    const updatedText = `${beforeText}${emoji}${afterText}`;
    setText(updatedText);
    updateCustomSection(updatedText, headerSize);

    setTimeout(() => {
      textareaRef.current?.setSelectionRange(
        start + emoji.length,
        start + emoji.length
      );
    }, 0);

    setShowEmojiDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowEmojiDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-4 relative">
      <div className="flex space-x-2 items-center">
        <select
          value={headerSize}
          onChange={handleHeaderChange}
          className="p-2 border-none rounded"
        >
          {HEADER_SIZES.map((size) => (
            <option key={size.value} value={size.value}>
              {size.label}
            </option>
          ))}
        </select>

        <button
          onClick={() => applyFormat("bold")}
          className="p-3 rounded bg-gray-100 hover:bg-gray-200"
        >
          <FaBold />
        </button>

        <button
          onClick={() => applyFormat("italic")}
          className="p-3 rounded bg-gray-100 hover:bg-gray-200"
        >
          <FaItalic />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowEmojiDropdown(!showEmojiDropdown)}
            className="bg-transparent"
          >
            <FaSmile className="text-[#ffc83d]" size={25} />
          </button>

          {showEmojiDropdown && (
            <div
              ref={dropdownRef}
              className="absolute top-12 left-0 bg-white border rounded shadow-md p-3 grid grid-cols-6 gap-3 w-80 max-h-64 overflow-y-auto"
            >
              {EMOJIS.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => insertEmoji(emoji)}
                  className="text-2xl p-2 hover:bg-gray-100 rounded"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
        placeholder="Escribe algo sobre ti, tus proyectos o tus intereses..."
        className="w-full p-2 border rounded h-32 resize-y"
      />
    </div>
  );
};
