import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { useToastMessages } from "@/components/message/useToastMessages";
import { APIKEY } from "@/components/constant/heroSection";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useForms = () => {
  const { Success, Warn } = useToastMessages();
  const router = useRouter();
  const param = useParams();

  const [listForms, setListForm] = useState([]);
  console.log("i am user id:=", param.form);

  const handleSubmit = async () => {
    const authorization = getCookie("token");
    try {
      const response = await fetch(`${APIKEY}/forms/?userId=${param.form}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
        },
      });

      const responseData = await response.json();
      console.log("form page :=", responseData);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong :(");
      }

      setListForm(responseData.data);
    } catch (error) {
      Warn(error.message || "Something went wrong :(");
    }
  };
  useEffect(() => {
    handleSubmit();
  }, []);
  return {
    listForms,
  };
};
