import { useState, useEffect } from "react";

import { ITechnology } from "@/interfaces";
import { fetchTechnologies } from "@/services";

export const useTechnologies = () => {
  const [availableTechs, setAvailableTechs] = useState<ITechnology[]>([]);

  useEffect(() => {
    const getTechnologies = async () => {
      const techs = await fetchTechnologies();
      setAvailableTechs(techs);
    };

    getTechnologies();
  }, []);

  return availableTechs;
};
