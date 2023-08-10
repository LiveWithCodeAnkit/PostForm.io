import { useRouter } from "next/navigation";
import { loginSchema } from "../schema/loginSchema";
import { useToastMessages } from "@/components/message/useToastMessages";
import { setCookie } from "cookies-next";
import { APIKEY } from "@/components/constant/heroSection";

export const useLogin = () => {
  const router = useRouter();
  const { Success, Warn } = useToastMessages();
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    const { email, password } = values;

    console.log("i am values", values);
    console.log("i am api key:=", APIKEY);

    try {
      const response = await fetch(`${APIKEY}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Something went wrong :(");
      }

      console.log(" i am response key:=", responseData.data._id);

      const userId = responseData.data._id;
      setCookie("token", responseData.token);
      Success("Login DONE 😄");
      resetForm();
      router.push(`/form/${userId}`);
    } catch (error) {
      console.log(error);
      Warn(error.message || "Something went wrong :(");
    }
  };

  return {
    initialValues,
    schema: loginSchema,
    handleSubmit,
  };
};
