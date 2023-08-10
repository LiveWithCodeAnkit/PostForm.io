"use client";
import React from "react";
import { useLogs } from "./hook/useLogs";

const formatDate = (dateString) => {
  const dateObj = new Date(dateString);
  const day = dateObj.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    dateObj
  );
  const year = dateObj.getFullYear();
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  return `${day} ${month} ${year} ${hours}:${minutes}`;
};

const Logs = () => {
  const { logData } = useLogs();

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center  text-blue-darker">
        {logData.map((log, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row justify-between w-full bg-white p-6 border-b-2"
          >
            <h1>
              Submission was <b>accepted and processed</b>
            </h1>
            <div className="border-l-2 p-2" >
              <h1>{formatDate(log.updatedAt)}</h1>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Logs;
