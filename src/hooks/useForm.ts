import { Dispatch, SetStateAction, useCallback } from "react";
import { IFormData } from "@/interfaces";

export const useForm = (setFormData: Dispatch<SetStateAction<IFormData>>) => {
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [setFormData]
  );

  return { handleInputChange };
};
