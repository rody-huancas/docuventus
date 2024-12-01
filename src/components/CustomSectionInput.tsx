"use client"

import { useState, useCallback } from 'react';
/* Components */
import { EmojiSelector, FormatButtons, HeaderSelector } from '@/components';
/* Hooks */
import { useTextEdit } from '@/hooks';
/* Interfaces */
import { CustomSectionInputProps } from '@/interfaces';

export const CustomSectionInput = ({ onCustomSectionChange }: CustomSectionInputProps) => {
  const [state, setState] = useState({
    text             : '',
    headerSize       : '',
    showEmojiDropdown: false
  });

  const { textareaRef, applyFormat, insertEmoji } = useTextEdit();

  const handleChange = useCallback((updates: Partial<typeof state>) => {
    const newState = { ...state, ...updates };
    setState(newState);
    
    const processedText = newState.headerSize 
      ? `${newState.headerSize} ${(updates.text || state.text).replace(/^#+\s*/, '').trim()}` 
      : (updates.text || state.text);

    if (updates.text !== undefined || updates.headerSize !== undefined) {
      onCustomSectionChange(processedText);
    }
  }, [state, onCustomSectionChange]);

  return (
    <div className="space-y-4 relative">
      <div className="flex space-x-2 items-center">
        <HeaderSelector
          value={state.headerSize}
          onChange={(headerSize) => { handleChange({ headerSize, text: state.text }) }}
        />

        <FormatButtons
          onBold={() => {
            const newText = applyFormat('bold', state.text);
            handleChange({ text: newText });
          }}
          onItalic={() => {
            const newText = applyFormat('italic', state.text);
            handleChange({ text: newText });
          }}
        />

        <EmojiSelector
          show={state.showEmojiDropdown}
          onToggle={() => handleChange({ showEmojiDropdown: !state.showEmojiDropdown })}
          onSelect={(emoji) => {
            const newText = insertEmoji(state.text, emoji);
            handleChange({ text: newText, showEmojiDropdown: false });
          }}
        />
      </div>

      <textarea
        ref={textareaRef}
        value={state.text}
        onChange={(e) => handleChange({ text: e.target.value })}
        placeholder="Escribe algo sobre ti, tus proyectos o tus intereses..."
        className="w-full p-2 border rounded h-32 resize-y"
      />
    </div>
  );
};
