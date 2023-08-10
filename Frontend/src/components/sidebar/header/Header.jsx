"use client";
import React from "react";
import { useHeader } from "../hook/useHeader";
import BlankInbox from "../blankInbox/BlankInbox";
import Login from "@/components/login/Login";
import InboxList from "../inboxList/InboxList";
import { useParams, useRouter } from "next/navigation";

const Header = () => {
  const { formData, inboxData, handleNavigate } = useHeader();
  const router = useRouter();
  const param = useParams();
  console.log("sdfsdf", inboxData);
  return (
    <>
      <div className="container">
        <div className="flex flex-col justify-center items-start gap-5 py-14">
          <h1 className=" text-2xl font-bold">{formData.formName}</h1>

          <div className="flex flex-col md:flex-row lg:flex-row justify-start items-start gap-2 w-full">
            <div className="hidden sm:block w-1/6 flex-nowrap shrink-0 pb-40 mb-44">
              <ul className="space-y-4">
                <li
                  className="flex-nowrap"
                  onClick={() => {
                    router.push(`/sidebar/${param.sidebar}`);
                  }}
                >
                  <a
                    href="#"
                    className="w-full px-4 py-4 md:py-2 rounded flex items-center space-x-1 transition-all transform hover:bg-white"
                    title="Inbox"
                  >
                    <svg
                      className="w-6 h-6 shrink-0 mx-auto md:mx-0"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      ></path>
                    </svg>
                    <span className="flex-1 text-ellipsis overflow-hidden hidden md:inline-block">
                      Inbox
                    </span>
                  </a>
                </li>
                <li
                  className="flex-nowrap"
                  onClick={() => {
                    router.push(`/archive/${param.sidebar}`);
                  }}
                >
                  <a
                    href="#"
                    className="w-full px-4 py-4 md:py-2 rounded flex items-center space-x-1 transition-all transform hover:bg-white"
                    title="Archive"
                  >
                    <svg
                      className="w-6 h-6 shrink-0 mx-auto md:mx-0"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                      ></path>
                    </svg>
                    <span className="flex-1 text-ellipsis overflow-hidden hidden md:inline-block">
                      Archive
                    </span>
                  </a>
                </li>
                <li
                  className="flex-nowrap"
                  onClick={() => {
                    router.push(`/span/${param.sidebar}`);
                  }}
                >
                  <a
                    href="#"
                    className="w-full px-4 py-4 md:py-2 rounded flex items-center space-x-1 transition-all transform hover:bg-white"
                    title="Spam"
                  >
                    <svg
                      className="w-6 h-6 shrink-0 mx-auto md:mx-0"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span className="flex-1 text-ellipsis overflow-hidden hidden md:inline-block">
                      Spam
                    </span>
                  </a>
                </li>
              </ul>

              <ul className="space-y-4">
                <li
                  className="flex-nowrap"
                  onClick={() => {
                    router.push(`/sidebar/${param.sidebar}/configuration`);
                  }}
                >
                  <a
                    href="#"
                    className="w-full px-4 py-4 md:py-2 rounded flex items-center space-x-1 transition-all transform hover:bg-white"
                    title="Configuration"
                  >
                    <svg
                      className="w-6 h-6 shrink-0 mx-auto md:mx-0"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                    <span className="flex-1 text-ellipsis overflow-hidden hidden md:inline-block">
                      Configuration
                    </span>
                  </a>
                </li>
                <li
                  className="flex-nowrap"
                  onClick={() => {
                    router.push(`/sidebar/${formData.id}/analytics`);
                  }}
                >
                  <a
                    href="#"
                    className="w-full px-4 py-4 md:py-2 rounded flex items-center space-x-1 transition-all transform hover:bg-white"
                    title="Analytics"
                  >
                    <svg
                      className="w-6 h-6 shrink-0 mx-auto md:mx-0"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                      ></path>
                    </svg>
                    <span className="flex-1 text-ellipsis overflow-hidden hidden md:inline-block">
                      Analytics
                    </span>
                  </a>
                </li>
                <li
                  className="flex-nowrap"
                  onClick={() => {
                    router.push(`/sidebar/${param.sidebar}/logs`);
                  }}
                >
                  <a
                    href="#"
                    className="w-full px-4 py-4 md:py-2 rounded flex items-center space-x-1 transition-all transform hover:bg-white"
                    title="Logs"
                  >
                    <svg
                      className="h-6 w-6 shrink-0 mx-auto md:mx-0"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      ></path>
                    </svg>
                    <span className="flex-1 text-ellipsis overflow-hidden hidden md:inline-block">
                      Logs
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:hidden  md:hidden mb-6 w-full">
              <select
                id="menus"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Inbox">Inbox</option>
                <option value="Archive">Archive</option>
                <option value="Spam">Spam</option>
                <option value="Configuration">Configuration</option>
                <option value="Analytics">Analytics</option>
                <option value="Logs">Logs</option>
              </select>
            </div>

            {inboxData === null ||
            inboxData === undefined ||
            inboxData.length === 0 ? (
              <BlankInbox />
            ) : (
              <InboxList formData={inboxData} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
