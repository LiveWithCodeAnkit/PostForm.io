import { useRouter } from "next/navigation";
import { registerSchema } from "../schema/registerSchema";
import { useToastMessages } from "@/components/message/useToastMessages";
import { APIKEY } from "@/components/constant/heroSection";

export const useRegister = () => {
  const router = useRouter();
  const { Success, Warn } = useToastMessages();
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    const { email, password } = values;

    try {
      const response = await fetch(`${APIKEY}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong :(");
      }

      Success("Registration DONE 😄");
      resetForm();
      router.push("/login");
    } catch (error) {
      Warn(error.message || "Something went wrong :(");
    }
  };

  return {
    initialValues,
    schema: registerSchema,
    handleSubmit,
  };
};
