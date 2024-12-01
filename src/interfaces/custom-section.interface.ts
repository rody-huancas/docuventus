export interface CustomSectionInputProps {
  onCustomSectionChange: (section: string) => void;
}

export interface HeaderSelectorProps {
  value   : string;
  onChange: (value: string) => void;
}

export interface FormatButtonsProps {
  onBold  : () => void;
  onItalic: () => void;
}

export interface EmojiSelectorProps {
  show    : boolean                    ;
  onToggle: () => void             ;
  onSelect: (emoji: string) => void;
}
