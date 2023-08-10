"use client";
import React, { useState } from "react";
import Link from "next/link";
import FormLimit from "../atFormLimt/FormLimit";
import Blank from "./Blank";
import { useParams } from "next/navigation";
import { useForms } from "./hook/useForms";
import { useRouter } from "next/navigation";

const Form = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const param = useParams();
  const { listForms } = useForms();
  console.log("i am user id:=", param.form);

  console.log("i am form list:=", listForms);
  const isListFormsEmpty = !listForms || listForms.length === 0;
  const handleOpen = () => setOpen(!open);

  const handleNavigate = (formKey) => {
    console.log(" i am call");
    router.push(`/sidebar/${formKey}`);
  };

  return (
    <>
      <div className="flex justify-center items-center p-5 h-full pb-[35rem]">
        <div className="flex flex-col justify-center gap-10 w-full lg:w-1/2">
          <div className="flex justify-between">
            <h1 className="leading-tight text-2xl lg:text-4xl text-blue-darker">
              Your Forms
            </h1>
            <button
              className="btn btn-indigo btn-sm uppercase"
              onClick={handleOpen}
            >
              New Form
            </button>
          </div>

          {isListFormsEmpty ? (
            <Blank />
          ) : (
            <ol className="bg-white border-t-2 border-gray-dark shadow rounded-2xl sm:rounded-b-lg sm:rounded-t-none">
              {listForms.map((form) => (
                <li
                  className="flex items-center justify-between px-8 py-6 "
                  key={form.id}
                >
                  <div>
                    <span
                      className="block font-bold mb-2 no-underline text-blue-darker hover:underline cursor-pointer"
                      onClick={() => {
                        handleNavigate(form.formKey);
                      }}
                    >
                      {form.formName}
                    </span>
                    <span className="break-all text-sm">{`https://Postform.io/f/${form.formKey}`}</span>
                  </div>
                  <div className="hidden sm:block">
                    <button className="copy-link text-blue-light text-sm hover:underline">
                      <span className="text-blue-light text-sm hover:underline">
                        Copy Embed Code
                      </span>
                    </button>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
      <FormLimit open={open} close={handleOpen} />
    </>
  );
};

export default Form;
