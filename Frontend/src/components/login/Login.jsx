"use client";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Link from "next/link";
import { MdOutlineSubject } from "react-icons/md";
import { useLogin } from "./hook/useLogin";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Metadata } from 'next'

export const metadata = {
  title: 'Login Page Title',
}
 

const Login = () => {
  const { initialValues, schema, handleSubmit } = useLogin();
  const router = useRouter();
  const token = getCookie("token");
  console.log(" i header am token:=", token);

  // if (token) return router.push("/form");

  return (
    <>
    
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
       
        <Form>
          <div className="flex  justify-center items-start pt-9">
            <div className="flex flex-col justify-center items-center gap-12 p-10">
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
                    Welcome Back
                  </h1>
                </div>

                <div className="flex flex-col justify-center items-start gap-8  p-4">
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
                  <div className="flex flex-col justify-center items-start gap-3 ">
                    <label className="classic-label">Password</label>
                    <Field
                      type="text"
                      name="password"
                      className="lg:w-96 classic-typing-input-on-white"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="font-normal text-blue-darker"
                    />
                  </div>
                  <div className="flex justify-between items-start lg:gap-10 text-blue-darker w-auto">
                    <div className="flex justify-center items-center gap-2 p-1">
                      <input type="checkbox" className="accent-[#05B381] " />
                      Remember me
                    </div>
                    <Link href="/login/password" className="classic-link p-1">
                      Forgot your password?
                    </Link>
                  </div>
                  <button
                    className="bg-[#047756] btn btn-indigo btn-lg uppercase w-full"
                    type="submit"
                  >
                    LOG IN
                  </button>
                </div>
                <div className="flex justify-center items-center bg-gray-lighter border-t-2 border-gray-dark w-full p-7 rounded-b ">
                  <div className="flex justify-center items-center gap-2 text-blue-darker text-center">
                    <label>Don&apos;t have an account yet?</label>
                    <Link href="/register">Sign up</Link>
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

export default Login;
