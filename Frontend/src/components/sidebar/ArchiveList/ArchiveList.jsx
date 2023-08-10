"use client";
import React, { useState } from "react";
import { BsArchive } from "react-icons/bs";
import { HiReply } from "react-icons/hi";
import { RiSpam2Line } from "react-icons/ri";
import { useHeader } from "../hook/useHeader";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formattedDate = `${date.getDate()} ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()}`;
  return formattedDate;
};

const ArchiveList = ({ formData }) => {
  const { handleSpam, handleArchive } = useHeader();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <>
      <div className="flex items-center justify-center px-4 py-16 w-full text-center sm:px-16 sm:py-24 bg-white">
        <div className="flex flex-col justify-center items-start ">
          <div className="flex border border-purple-200 rounded">
            <input
              type="text"
              className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Search..."
            />
            <button className="px-4 text-white bg-purple-600 border-l rounded ">
              Search
            </button>
          </div>
          <div className="flex flex-col justify-center w-full gap-4 border-2 overflow-y-scroll ">
            {formData.map((item, index) => (
              <div
                className={`flex flex-col justify-center w-full gap-4 border-2 cursor-pointer ${
                  selectedItem === item ? "hover:bg-gray" : ""
                }`}
                key={index}
                onClick={() => handleItemClick(item)}
              >
                <div className="flex items-start justify-between p-2">
                  <span className="font-bold text-blue-darker truncate">
                    {item.title || "(Untitled)"}
                  </span>
                  <span className="ml-4 text-blue-darker text-sm">
                    {formatDate(item.updatedAt)}
                  </span>
                </div>
                <div className="flex justify-start items-start p-2">
                  <h1>{item.data.email}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div name="diva" className="h-[27rem] w-full">
          {selectedItem && (
            <div className="flex flex-col justify-center items-center p-4 ">
              <div className="flex justify-end items-end w-full gap-3 p-1 text-blue-darker border-b-2">
                <button
                  className="flex justify-center items-center bg-gray p-2 gap-2 rounded-md"
                  onClick={() => {
                    handleArchive(selectedItem._id);
                  }}
                >
                  <BsArchive />
                  UNARCHIVE
                </button>
                <button
                  className="flex justify-center items-center bg-gray p-2 gap-2 rounded-md"
                  onClick={() => {
                    handleSpam(selectedItem._id);
                  }}
                >
                  <HiReply />
                 Not Spam
                </button>
                <button className="flex justify-center items-center bg-gray p-2 gap-2 rounded-md cursor-not-allowed">
                  <RiSpam2Line />
                  Reply
                </button>
              </div>
              <div className="flex gap-3 flex-col w-full justify-start items-start border-b-4 p-3">
                <label className="text-blue-darker">
                  {formatDate(selectedItem.updatedAt)}
                </label>
                <label className="text-blue-darker font-bold">
                  {selectedItem.title || "(Untitled)"}
                </label>
              </div>
              <h2>{selectedItem.data.email}</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ArchiveList;

