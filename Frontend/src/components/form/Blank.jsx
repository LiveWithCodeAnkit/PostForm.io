import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

const Blank = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-center items-center p-5 h-full pb-[35rem]">
        <div className="flex flex-col justify-center  gap-10 w-full ">
          <div className="flex flex-col items-center px-4 py-16 w-full bg-white border-t-2 border-gray-dark shadow rounded-2xl sm:rounded-b-lg sm:rounded-t-none text-center sm:py-24">
            <svg
              className="fill-current mb-5 text-blue-lightest"
              width="72px"
              height="82px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 72 85"
            >
              <path d="M64 75h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0v-2h-2a1 1 0 1 1 0-2h2v-2a1 1 0 1 1 2 0v2zm-2-7.95V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v69c0 1.1.9 2 2 2h50.05A9 9 0 0 1 62 67.05zM54.05 77H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h56a4 4 0 0 1 4 4v63.05A9 9 0 1 1 54.05 77zM63 83a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM10 19h44a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-4c0-1.1.9-2 2-2zm0 1a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h44a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H10zm-1.5-4h14a.5.5 0 0 1 0 1h-14a.5.5 0 0 1 0-1zM23 8h18a1 1 0 1 1 0 2H23a1 1 0 1 1 0-2zM10 57h44a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-4c0-1.1.9-2 2-2zm0-21h44a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-4c0-1.1.9-2 2-2zm0 1a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h44a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H10zM9 48h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1zm0 1v3h3v-3H9zm-.5-16h14a.5.5 0 0 1 0 1h-14a.5.5 0 0 1 0-1zm7 17h14a.5.5 0 0 1 0 1h-14a.5.5 0 0 1 0-1zm26 0h14a.5.5 0 0 1 0 1h-14a.5.5 0 0 1 0-1z"></path>
            </svg>
            <span className="block text-blue-darker text-lg">
              There doesn’t seem to be anything here!
            </span>
            <Link className="classic-link" href="#">
              Get started by adding your first form
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blank;
