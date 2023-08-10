"use client";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Link from "next/link";
import { MdOutlineSubject } from "react-icons/md";
import Footer from "../footer/Footer";
import { useRegister } from "./hook/useRegister";

const Register = () => {
  const { initialValues, schema, handleSubmit } = useRegister();
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
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
              <div className="flex flex-col justify-center items-center  bg-white border-b-2 rounded-md">
                <div className="flex justify-center items-center">
                  <h1 className="p-4 font-normal text-blue-darker text-xl">
                    Start Your 5-Day Free Trial
                  </h1>
                </div>

                <div className="flex flex-col justify-center items-start gap-8 p-10">
                  <div className="flex flex-col justify-center items-start gap-3 w-full">
                    <label className="classic-label">Email</label>
                    <Field
                      type="text"
                      name="email"
                      className="lg:w-96 classic-typing-input-on-white"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="font-normal text-blue-darker"
                    />
                  </div>
                  <div className="flex flex-col justify-center items-start gap-3 w-full">
                    <label className="classic-label">Password</label>
                    <Field
                      type="password"
                      name="password"
                      className="lg:w-96 classic-typing-input-on-white"
                    />
                    <label className="text-xs italic">
                      Password must be at least 6 characters long.
                    </label>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="font-normal text-blue-darker"
                    />
                  </div>
                  <div className="flex justify-between items-start gap-1 text-blue-darker">
                    <div className="flex justify-center items-center">
                      <label>By registering, you agree to our</label>
                    </div>
                    <Link href={"#"} className="classic-link">
                      terms and conditions.
                    </Link>
                  </div>
                  <button className="bg-[#047756] btn btn-indigo btn-lg uppercase w-full" type="submit">
                    Create Account
                  </button>
                </div>
                <div className="flex justify-center items-center bg-gray-lighter border-t-2 border-gray-dark w-full p-7 rounded-b ">
                  <div className="flex justify-center items-center gap-2 text-blue-darker text-center">
                    <label>Already have an account?</label>
                    <Link href="/login">Sign In</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default Register;
