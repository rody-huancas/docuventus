/* Interfaces */
import { FormatButtonsProps } from '@/interfaces';
/* Icons */
import { FaBold, FaItalic } from "react-icons/fa";

export const FormatButtons= ({ onBold, onItalic }: FormatButtonsProps) => (
  <>
    {[
      { icon: <FaBold />, onClick: onBold, format: 'bold' },
      { icon: <FaItalic />, onClick: onItalic, format: 'italic' }
    ].map(({ icon, onClick, format }) => (
      <button
        key={format}
        onClick={onClick}
        className="p-3 rounded bg-gray-100 hover:bg-gray-200"
      >
        {icon}
      </button>
    ))}
  </>
);