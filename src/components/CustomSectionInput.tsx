"use client";

import { useState } from "react";
import { FormattingToolbar, Textarea } from "@/components";

interface Props {
  onCustomSectionChange: (section: string) => void;
}

export const CustomSectionInput = ({ onCustomSectionChange }: Props) => {
  const [text, setText] = useState("");
  const [headerSize, setHeaderSize] = useState("");

  const handleTextChange = (newText: string) => {
    setText(newText);
    onCustomSectionChange(formatWithHeader(newText, headerSize));
  };

  const handleHeaderChange = (header: string) => {
    setHeaderSize(header);
    onCustomSectionChange(formatWithHeader(text, header));
  };

  const handleTextUpdate = (newText: string) => {
    setText(newText);
    onCustomSectionChange(formatWithHeader(newText, headerSize));
  };

  return (
    <div className="space-y-4 relative">
      <FormattingToolbar
        headerSize={headerSize}
        onHeaderChange={handleHeaderChange}
        onFormatText={(formattedText) => handleTextUpdate(formattedText)}
        onInsertEmoji={(emoji) => handleTextUpdate(text + emoji)}
      />
      <Textarea
        placeholder="Escribe algo sobre ti, tus proyectos o tus intereses..."
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
      />
    </div>
  );
};

const formatWithHeader = (text: string, header: string) => {
  if (!header) return text;
  const cleanedText = text.replace(/^#+\s*/, "").trim();
  return `${header} ${cleanedText}`.trim();
};
