/* Constants */
import { HEADER_SIZES } from "@/constants";
/* Interfaces */
import { HeaderSelectorProps } from '@/interfaces';

export const HeaderSelector= ({ value, onChange }: HeaderSelectorProps) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="p-2 border-none rounded"
  >
    {HEADER_SIZES.map((size) => (
      <option key={size.value} value={size.value}>
        {size.label}
      </option>
    ))}
  </select>
);