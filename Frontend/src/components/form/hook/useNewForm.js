import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { newFormSchema } from "../schema/newFormSchema";
import { useToastMessages } from "@/components/message/useToastMessages";
import { APIKEY } from "@/components/constant/heroSection";

export const useNewForm = () => {
  const { Success, Warn } = useToastMessages();
  const router = useRouter();
  const initialValues = {
    formName: "",
    forwardTo: [],
  };
  const handleSubmit = async (values, { resetForm }) => {
    const { formName, forwardTo } = values;
    const authorization = getCookie("token");

    try {
      const response = await fetch(`${APIKEY}/forms/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
        },
        body: JSON.stringify({ formName, forwardTo }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong :(");
      }

      Success("Form DONE 😄");
      resetForm();
       router.push("/form");
    } catch (error) {
      Warn(error.message || "Something went wrong :(");
    }
  };

  return {
    initialValues,
    schema: newFormSchema,
    handleSubmit,
  };
};
