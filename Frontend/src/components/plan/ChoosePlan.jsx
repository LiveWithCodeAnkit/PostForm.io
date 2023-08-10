"use client";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Link from "next/link";
import { MdOutlineSubject } from "react-icons/md";

const ChoosePlan = () => {
  return (
    <>
      <Formik initialValues={""} validationSchema={""} onSubmit={""}>
        <Form>
          <div className="flex  justify-center items-start pt-9">
            <div className="flex flex-col justify-center items-center gap-12 lg:p-10">
              <div className="flex justify-center items-center">
                <Link className="flex items-center gap-2 leading-none" href="#">
                  <MdOutlineSubject className="text-5xl bg-[#047756] text-white rounded-md" />
                  <label className="font-black text-3xl text-[#05B381]">
                    PostForm
                  </label>
                </Link>
              </div>
              <div className="flex flex-col justify-center items-center  bg-white border-b-2 rounded-md pb-8">
                <div className="flex justify-center items-center">
                  <h1 className="p-4 font-normal text-blue-darker text-xl">
                    Choose your Plan
                  </h1>
                </div>

                <div className="flex flex-col justify-center items-start gap-8 p-10 lg:w-full">
                  <div className="flex flex-col justify-center items-start gap-3 w-full">
                    <label className="classic-label">Name on Card</label>
                    <Field
                      type="text"
                      name="name"
                      className="lg:w-96 classic-typing-input-on-white"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="font-normal text-blue-darker"
                    />
                  </div>
                  <div className="flex flex-col justify-center items-start gap-3 w-full">
                    <label className="classic-label">Card</label>
                    <Field
                      type="text"
                      name="card"
                      className="lg:w-96 classic-typing-input-on-white"
                    />
                    <ErrorMessage
                      name="card"
                      component="div"
                      className="font-normal text-blue-darker"
                    />
                  </div>

                  <button className="bg-[#047756] btn btn-indigo btn-lg uppercase w-full">
                    COMPLETE SIGNUP
                  </button>
                </div>
                <div className="flex justify-center items-center ">
                  <Link className="classic-link" href="/plan" >
                    Change Plan
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default ChoosePlan;
