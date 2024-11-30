import axios from "axios";
import { URL_TECHNOLOGIES } from "@/config";
import { ITechnologies, ITechnology } from "@/interfaces";

export const fetchTechnologies = async (): Promise<ITechnology[]> => {
  try {
    const url = `${URL_TECHNOLOGIES}`;
    const response = await axios(url);
    return response.data
      .filter((item: ITechnologies) => item.name.endsWith(".svg"))
      .map((item: ITechnologies) => ({
        name: item.name.replace(".svg", ""),
        icon: item.download_url,
      }));
  } catch (error) {
    console.error("Error fetching technologies", error);
    return [];
  }
};
