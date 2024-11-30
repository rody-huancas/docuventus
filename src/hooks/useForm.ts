import { IFormData } from "@/interfaces";
import { useState, useCallback } from "react";

export const useForm = () => {
  const [formData, setFormData] = useState<IFormData>({
    user      : "",
    profession: "",
    about     : "",
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  return { formData, handleInputChange };
};
