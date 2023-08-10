import { getCookie } from "cookies-next";
import { APIKEY } from "@/components/constant/heroSection";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
export const useLogs = () => {
  const param = useParams();

  const [logData, setLogData] = useState([]);


  const handleSubmit = async () => {
    const authorization = getCookie("token");
    try {
        const response = await fetch(`${APIKEY}/logs/${param.sidebar}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${authorization}`,
          },
        });
  
        const responseData = await response.json();
        console.log("log page :=", responseData);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Something went wrong :(");
        }
  
        setLogData(responseData.data);
      } catch (error) {
        Warn(error.message || "Something went wrong :(");
      }
  };

  useEffect(() => {
    handleSubmit();
  }, []);
  return {
    logData,
  };
};
