import React from "react";
import { useRouter } from "next/navigation";
import { useToastMessages } from "@/components/message/useToastMessages";
import { deleteCookie } from "cookies-next";
import { APIKEY } from "@/components/constant/heroSection";

const useLogout = () => {
  const { Success, Warn } = useToastMessages();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await fetch(`${APIKEY}/auth/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong :(");
      }

      Success("Logout DONE 😄");
      deleteCookie("token");
      router.push("/");
    } catch (error) {
      console.log("logout :=",error);
      Warn(error.message || "Something went wrong :(");
    }
  };

  return {
    handleLogout,
  };
};

export default useLogout;
