"use client";
import React, { useState } from "react";
import BarChart from "./graph/BarChart";
import { UserData } from "../constant/heroSection";
import { useAnalytics } from "./hook/useAnalytics";

const Analytics = () => {
  const { handleSubmit } = useAnalytics();
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
        height: "20px",
      },
    ],
  });

  const options = [
    { value: "30", text: "Last 30 days" },
    { value: "60", text: "Last 60 days" },
    { value: "360", text: "Last 365 days" },
  ];
  const [selected, setSelected] = useState();
  const handleChange = (event) => {
    const data = handleSubmit(event.target.value, event.target.name);
    setSelected(data);
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-10 text-blue-darker">
        <div className="flex flex-col lg:flex-row justify-between w-full ">
          <div className="flex flex-col justify-center gap-5 items-start  bg-white  text-blue-lightest rounded-b border-t-2 border-gray-dark shadow p-6 ">
            <div className="flex justify-between items-center lg:gap-20">
              <h1 className="text-xl font-semibold">Submissions</h1>
              <select
                id="submissions_chart_time_submissions"
                onChange={handleChange}
                name="submission"
                className="classic-select !p-2 !pr-8 !bg-gray text-blue-darker"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-4xl font-extrabold text-blue-darker">
              <h1>{selected.totalSubmission || 0}</h1>
            </div>
            <div className="font-semibold text-xl text-blue-darker">
              <h1>No data</h1>
            </div>
          </div>
          <div
            className="flex flex-col justify-center gap-5 items-start  bg-white  
          text-blue-lightest rounded-b border-t-2 border-gray-dark shadow p-6 "
          >
            <div className="flex justify-between items-start lg:gap-20">
              <h1 className="text-xl font-semibold">Spam</h1>
              <select
                onChange={handleChange}
                name="spam"
                id="submissions_chart_time_submissions"
                className="classic-select !p-2 !pr-8 !bg-gray text-blue-darker"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-4xl font-extrabold text-blue-darker">
              <h1>0</h1>
            </div>
            <div className="font-semibold text-xl text-blue-darker">
              <h1>No prior data</h1>
            </div>
          </div>
        </div>
        {/* ///graph */}

        <div className="w-full">
          <BarChart chartData={userData} />
        </div>

        {/* //graph */}

        <div className="space-y-2 items-center justify-between sm:space-y-0 sm:flex ">
          <div className="flex items-center space-x-2">
            <h3 className="text-2xl">Submissions by time of the day</h3>
            <svg
              className="w-6 h-6 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
          </div>

          <div className="form-group flex items-center !m-0 !p-0">
            <label
              for="submissions_chart_time_of_the_day"
              className="classic-label sr-only"
            >
              Time
            </label>
            <select
              id="submissions_chart_time_of_the_day"
              className="classic-select !p-2 !pr-8 !bg-gray"
            >
              <option value="last_30_days">Last 30 days</option>
              <option value="last_60_days">Last 60 days</option>
              <option value="last_365_days">Last 365 days</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
