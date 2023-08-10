import { getCookie } from "cookies-next";
import { APIKEY } from "@/components/constant/heroSection";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useAnalytics = () => {
  const param = useParams();

  const [infoSubmission, setInfoSubmission] = useState([]);
  const [infoSpam, setInfoSpam] = useState([]);
  console.log("i am user ana id:=", param.sidebar);

  const handleSubmit = async (week, type) => {
    const authorization = getCookie("token");

    console.log("i am week:=", week);
    console.log("i am type:=", type);

    try {
      const response = await fetch(`${APIKEY}/form-analytics/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
        },
        body: JSON.stringify({
          lastDays: week,
          formId: param.sidebar,
          type,
        }),
      });

      const responseData = await response.json();
      console.log("analitiy page :=", responseData);
     

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong :(");
      }
      if (type != "spam") {
        setInfoSubmission(responseData);
        return infoSubmission;
      } else {
        setInfoSpam(responseData);
        return infoSpam;
      }

     
    } catch (error) {
      // Warn(error.message || "Something went wrong :(");
    }
  };
  useEffect(() => {
    handleSubmit();
  }, []);
  return {
    infoSpam,
    handleSubmit,
  };
};
