"use client";

import { cn } from '@/utils';
import { useState, useMemo } from 'react';

type Technology = {
  name: string;
  icon: string;
};

type TechnologySearchProps = {
  availableTechs: Technology[];
  onSelect: (tech: Technology) => void;
};

export function TechnologySearch({ 
  availableTechs, 
  onSelect 
}: TechnologySearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const processedTechs = useMemo(() => {
    return availableTechs
      .map(tech => ({
        ...tech,
        displayName: tech.name
          .replace('-light', '')
          .replace('-dark', '')
      }))
      .filter(tech => 
        tech.displayName.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [availableTechs, searchTerm]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search technologies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={cn(
          "w-full p-2 border rounded",
          "focus:outline-none focus:ring-2 focus:ring-blue-500"
        )}
      />
      <div className="grid grid-cols-4 gap-2 mt-2 max-h-48 overflow-y-auto">
        {processedTechs.map((tech) => (
          <button
            key={tech.name}
            onClick={() => onSelect(tech)}
            className={cn(
              "flex flex-col items-center p-2 border rounded",
              "hover:bg-blue-100 transition-colors"
            )}
          >
            <img 
              src={tech.icon} 
              alt={tech.displayName} 
              className="w-10 h-10 mb-1" 
            />
            <span className="text-xs">{tech.displayName}</span>
          </button>
        ))}
      </div>
    </div>
  );
}