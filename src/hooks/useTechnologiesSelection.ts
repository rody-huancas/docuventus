import { useState, useCallback } from "react";
import { ITechnology } from "@/interfaces";

export const useTechnologiesSelection = () => {
  const [technologies, setTechnologies] = useState<ITechnology[]>([]);

  const handleTechnologySelect = useCallback(
    (tech: ITechnology) => {
      if (!technologies.some((t) => t.name === tech.name)) {
        setTechnologies((prev) => [...prev, tech]);
      }
    },
    [technologies]
  );

  const removeTechnology = useCallback((techToRemove: ITechnology) => {
    setTechnologies((prev) =>
      prev.filter((tech) => tech.name !== techToRemove.name)
    );
  }, []);

  return { technologies, handleTechnologySelect, removeTechnology };
};
