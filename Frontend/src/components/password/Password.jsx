"use client";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Link from "next/link";
import { MdOutlineSubject } from "react-icons/md";

const Password = () => {
  return (
    <>
      <Formik initialValues={""} validationSchema={""} onSubmit={""}>
        <Form>
          <div className="flex  justify-center items-start pt-24">
            <div className="flex flex-col justify-center items-center gap-12  lg:pb-56 ">
              <div className="flex justify-center items-center">
                <Link className="flex items-center gap-2 leading-none" href="#">
                  <MdOutlineSubject className="text-5xl bg-[#047756] text-white rounded-md" />
                  <label className="font-black text-3xl text-[#05B381]">
                    PostForm
                  </label>
                </Link>
              </div>
              <div className="flex flex-col justify-center items-center  bg-white border-b-2 rounded-md  lg:w-[27rem]">
                <div className="flex justify-center items-center">
                  <h1 className="p-4 font-normal text-blue-darker text-xl">
                    Request a New Password
                  </h1>
                </div>

                <div className="flex flex-col justify-center items-start gap-8 p-10 w-full">
                  <div className="flex flex-col justify-center items-start gap-3 w-full">
                    <label className="classic-label">Email</label>
                    <Field
                      type="text"
                      name="email"
                      className="w-full classic-typing-input-on-white"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="font-normal text-blue-darker"
                    />
                  </div>

                  <button className="bg-[#047756] btn btn-indigo btn-lg uppercase w-full">
                    SEND PASSWORD RESET LINK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default Password;
