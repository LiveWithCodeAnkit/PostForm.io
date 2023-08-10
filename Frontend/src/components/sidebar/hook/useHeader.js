import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { useToastMessages } from "@/components/message/useToastMessages";
import { APIKEY } from "@/components/constant/heroSection";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useHeader = () => {
  const { Success, Warn } = useToastMessages();
  const router = useRouter();
  const param = useParams();

  const [formData, setFormData] = useState([]);
  const [inboxData, setInboxData] = useState([]);
  const [spanData, setSpanData] = useState([]);
  const [archiveData, setArchiveData] = useState([]);

  const handleNavigate = (url) => {
    console.log("handle navigate call:=", url);
    router.push(`/${url}/${param.sidebar}`);
  };

  const handleArchive = async (id) => {
    console.log("i am archive function and i called:=", id);
    const authorization = getCookie("token");

    const _id = id;
    const status = "Archive";

    try {
      const response = await fetch(`${APIKEY}/f/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
        },
        body: JSON.stringify({ _id, status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong :(");
      }

      const responseData = await response.json();

      console.log(" i form DATA Archve:=", responseData);
    } catch (error) {
      // Warn(error.message || "Something went wrong :(");
    }
  };

  const handleSpam = async (id) => {
    console.log("i am span function and i called:=", id);
    const authorization = getCookie("token");

    const _id = id;
    const status = "Spam";

    try {
      const response = await fetch(`${APIKEY}/f/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
        },
        body: JSON.stringify({ _id, status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong :(");
      }

      const responseData = await response.json();
    } catch (error) {
      //Warn(error.message || "Something went wrong :(");
    }

    //fetch

    const formKey = param.sidebar;

    try {
      const response = await fetch(`${APIKEY}/f/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
        },
        body: JSON.stringify({ formKey, status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong :(");
      }

      const responseData = await response.json();

      setSpanData(responseData.data);
    } catch (error) {
      // Warn(error.message || "Something went wrong :(");
    }
  };

  console.log("i am user span:=", spanData);

  const handleInbox = async () => {
    const authorization = getCookie("token");

    const formKey = param.sidebar;
    const status = "Inbox";

    try {
      const response = await fetch(`${APIKEY}/f/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
        },
        body: JSON.stringify({ formKey, status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong :(");
      }

      const responseData = await response.json();

      console.log(" i form DATA inbox:=", responseData);

      setInboxData(responseData.data);
    } catch (error) {
      // Warn(error.message || "Something went wrong :(");
    }
  };

  const handleSubmit = async () => {
    const authorization = getCookie("token");
    try {
      const response = await fetch(`${APIKEY}/forms/${param.sidebar}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
        },
      });

      const responseData = await response.json();
      console.log("hearpage page :=", responseData);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong :(");
      }

      setFormData(responseData.data);
    } catch (error) {
      // Warn(error.message || "Something went wrong :(");
    }
  };
  useEffect(() => {
    handleSubmit();
    handleInbox();
    handleSpam();
  }, []);
  return {
    formData,
    inboxData,
    spanData,
    archiveData,
    handleNavigate,
    handleSpam,
    handleArchive,
  };
};
