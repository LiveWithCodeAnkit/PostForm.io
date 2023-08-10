"use client";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Link from "next/link";
import { useNewForm } from "./hook/useNewForm";

const NewForm = () => {
  const { initialValues, schema, handleSubmit } = useNewForm();
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="flex justify-center items-center p-5 h-full pb-[35rem]">
            <div className="flex flex-col justify-center  gap-10 w-full lg:w-1/2">
              <div className="flex justify-between">
                <h1 className="leading-tight text-2xl lg:text-4xl text-blue-darker">
                  New Form
                </h1>
              </div>

              <div className="bg-white p-1 flex gap-4  flex-col justify-center items-start">
                <h4 className="text-xl text-blue-darkest font-semibold mb-4 pb-2 border-b border-gray w-full">
                  Form Details
                </h4>
                <div className="flex flex-col justify-center items-start w-full gap-2">
                  <label className="classic-label">
                    Name
                  </label>
                  <Field
                    type="text"
                    id="formName"
                    name="formName"
                    className="w-full classic-typing-input-on-white"
                  />
                  <ErrorMessage
                    name="formName"
                    component="div"
                    className="font-normal text-blue-darker"
                  />
                </div>
                <div className="flex flex-col justify-center items-start w-full gap-2">
                  <label  className="classic-label">
                    Forward to
                  </label>
                  <Field
                    as="textarea"
                    name="forwardTo"
                    id="forwardTo"
                    className="w-full classic-typing-input-on-white"
                  />
                  <ErrorMessage
                    name="forwardTo"
                    component="div"
                    className="font-normal text-blue-darker"
                  />
                </div>
                <div className="flex justify-end items-end  w-full p-1">
                  <button
                    className="bg-[#047756] btn btn-indigo btn-lg uppercase "
                    type="submit"
                  >
                    CREATE FORM
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

export default NewForm;
