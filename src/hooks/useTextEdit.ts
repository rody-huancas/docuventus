import { useRef, useCallback } from 'react';

export const useTextEdit = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyFormat = useCallback((formatType: 'bold' | 'italic', text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return text;

    const start = textarea.selectionStart;
    const end   = textarea.selectionEnd;
    if (start === end) return text;

    const formatSymbols = formatType === 'bold' ? '**' : '*';
    const newText = `${text.slice(0, start)}${formatSymbols}${text.slice(start, end)}${formatSymbols}${text.slice(end)}`;

    setTimeout(() => {
      textarea.setSelectionRange(
        start + formatSymbols.length, 
        end   + formatSymbols.length
      );
    }, 0);

    return newText;
  }, []);

  const insertEmoji = useCallback((text: string, emoji: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return text;

    const start = textarea.selectionStart || 0;
    const newText = `${text.slice(0, start)}${emoji}${text.slice(start)}`;

    setTimeout(() => {
      textarea.setSelectionRange(
        start + emoji.length, 
        start + emoji.length
      );
    }, 0);

    return newText;
  }, []);

  return { 
    textareaRef, 
    applyFormat, 
    insertEmoji 
  };
};