"use client";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Link from "next/link";
import { MdOutlineSubject } from "react-icons/md";
import { useRouter } from "next/navigation";

const Plans = () => {
  const router = useRouter();
  return (
    <>
      <Formik initialValues={""} validationSchema={""} onSubmit={""}>
        <Form>
          <div className="flex  justify-center items-start pt-9">
            <div className="flex flex-col justify-center items-center gap-12 p-10 lg:w-[43rem]">
              <div className="flex justify-center items-center">
                <Link className="flex items-center gap-2 leading-none" href="#">
                  <MdOutlineSubject className="text-5xl bg-[#047756] text-white rounded-md" />
                  <label className="font-black text-3xl text-[#05B381]">
                    PostForm
                  </label>
                </Link>
              </div>
              <div className="flex flex-col justify-center items-center  bg-white border-b-2 rounded-md ">
                <div className="flex justify-center items-center">
                  <h1 className="p-4 font-normal text-blue-darker text-xl">
                    Choose your Plan
                  </h1>
                </div>

                <div className="flex flex-col justify-center items-center gap-8 p-10">
                  <div className="flex flex-col justify-center items-start gap-3">
                    <div className="h-28 2xl:w-96">
                      <input
                        id="Single"
                        className="hidden plan-radio-button"
                        x-model="selectedPlan"
                        name="plan"
                        type="radio"
                        value="single"
                      />
                      <label
                        for="Single"
                        className="plan-label plan-label--enabled--on-white-bg"
                      >
                        <span className="flex items-center justify-between mb-2">
                          <span className="font-bold plan-light-text text-xs uppercase">
                            Single
                          </span>
                          <svg
                            className="fill-current bg-green-lighter flex h-5 items-center justify-center plan-check-mark rounded-full w-5"
                            width="12px"
                            height="9px"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 12 9"
                          >
                            <g
                              stroke="none"
                              stroke-width="1"
                              fill="none"
                              fill-rule="evenodd"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <g
                                transform="translate(-881.000000, -419.000000)"
                                stroke="#388473"
                                stroke-width="2"
                              >
                                <g transform="translate(877.000000, 413.000000)">
                                  <polyline points="5.5 10.5 8.5 13.5 14.5 7.5"></polyline>
                                </g>
                              </g>
                            </g>
                          </svg>
                        </span>
                        <span className=" flex items-center justify-between leading-none">
                          <span className="block font-bold plan-light-text">
                            <span className="text-4xl">1</span>
                            <span className="text-xl">form</span>
                          </span>
                          <span className="block plan-light-text">
                            $<span className="font-bold plan-dark-text">5</span>{" "}
                            / mo
                          </span>
                        </span>
                      </label>
                    </div>
                    <div className="pb-4 w-full">
                      <input
                        id="Freelancer"
                        className="hidden plan-radio-button"
                        x-model="selectedPlan"
                        name="plan"
                        type="radio"
                        value="freelancer"
                      />
                      <label
                        for="Freelancer"
                        className="plan-label plan-label--enabled--on-white-bg"
                      >
                        <span className="flex items-center justify-between mb-2">
                          <span className="font-bold plan-light-text text-xs uppercase">
                            Freelancer
                          </span>
                          <svg
                            className="fill-current bg-green-lighter flex h-5 items-center justify-center plan-check-mark rounded-full w-5"
                            width="12px"
                            height="9px"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 12 9"
                          >
                            <g
                              stroke="none"
                              stroke-width="1"
                              fill="none"
                              fill-rule="evenodd"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <g
                                transform="translate(-881.000000, -419.000000)"
                                stroke="#388473"
                                stroke-width="2"
                              >
                                <g transform="translate(877.000000, 413.000000)">
                                  <polyline points="5.5 10.5 8.5 13.5 14.5 7.5"></polyline>
                                </g>
                              </g>
                            </g>
                          </svg>
                        </span>
                        <span className=" flex items-center justify-between leading-none">
                          <span className="block font-bold plan-light-text">
                            <span className="text-4xl">5</span>
                            <span className="text-xl">forms</span>
                          </span>
                          <span className="block plan-light-text">
                            $
                            <span className="font-bold plan-dark-text">15</span>{" "}
                            / mo
                          </span>
                        </span>
                      </label>
                    </div>
                    <div className="pb-4 w-full">
                      <input
                        id="Studio"
                        className="hidden plan-radio-button"
                        x-model="selectedPlan"
                        name="plan"
                        type="radio"
                        value="studio"
                      />
                      <label
                        for="Studio"
                        className="plan-label plan-label--enabled--on-white-bg"
                      >
                        <span className="flex items-center justify-between mb-2">
                          <span className="font-bold plan-light-text text-xs uppercase">
                            Studio
                          </span>
                          <svg
                            className="fill-current bg-green-lighter flex h-5 items-center justify-center plan-check-mark rounded-full w-5"
                            width="12px"
                            height="9px"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 12 9"
                          >
                            <g
                              stroke="none"
                              stroke-width="1"
                              fill="none"
                              fill-rule="evenodd"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <g
                                transform="translate(-881.000000, -419.000000)"
                                stroke="#388473"
                                stroke-width="2"
                              >
                                <g transform="translate(877.000000, 413.000000)">
                                  <polyline points="5.5 10.5 8.5 13.5 14.5 7.5"></polyline>
                                </g>
                              </g>
                            </g>
                          </svg>
                        </span>
                        <span className=" flex items-center justify-between leading-none">
                          <span className="block font-bold plan-light-text">
                            <span className="text-4xl">15</span>
                            <span className="text-xl">forms</span>
                          </span>
                          <span className="block plan-light-text">
                            $
                            <span className="font-bold plan-dark-text">39</span>{" "}
                            / mo
                          </span>
                        </span>
                      </label>
                    </div>
                    <div className="pb-4 w-full">
                      <input
                        id="Agency"
                        className="hidden plan-radio-button"
                        x-model="selectedPlan"
                        name="plan"
                        type="radio"
                        value="agency"
                      />
                      <label
                        for="Agency"
                        className="plan-label plan-label--enabled--on-white-bg"
                      >
                        <span className="flex items-center justify-between mb-2">
                          <span className="font-bold plan-light-text text-xs uppercase">
                            Agency
                          </span>
                          <svg
                            className="fill-current bg-green-lighter flex h-5 items-center justify-center plan-check-mark rounded-full w-5"
                            width="12px"
                            height="9px"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 12 9"
                          >
                            <g
                              stroke="none"
                              stroke-width="1"
                              fill="none"
                              fill-rule="evenodd"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <g
                                transform="translate(-881.000000, -419.000000)"
                                stroke="#388473"
                                stroke-width="2"
                              >
                                <g transform="translate(877.000000, 413.000000)">
                                  <polyline points="5.5 10.5 8.5 13.5 14.5 7.5"></polyline>
                                </g>
                              </g>
                            </g>
                          </svg>
                        </span>
                        <span className=" flex items-center justify-between leading-none">
                          <span className="block font-bold plan-light-text">
                            <span className="text-4xl">50</span>
                            <span className="text-xl">forms</span>
                          </span>
                          <span className="block plan-light-text">
                            $
                            <span className="font-bold plan-dark-text">79</span>{" "}
                            / mo
                          </span>
                        </span>
                      </label>
                    </div>
                  </div>

                  <button
                    className="bg-[#047756] btn btn-indigo btn-lg uppercase w-full"
                    onClick={() => {
                      router.push("/plan/chooseplan");
                    }}
                  >
                    ADD PAYMENT DETAILS
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

export default Plans;
