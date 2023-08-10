"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { MdOutlineSubject } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

const HeaderHome = () => {
  const divStyle = {
    background: "#f3f5f8",
    backgroundColor: "#f3f5f8",
    backgroundImage: `linear-gradient(hsla(0, 0%, 100%, 0.001), #f3f5f8), url("/screen-pattern-gray.svg?52128fc")`,
    backgroundSize: "cover, 500px auto",
  };
  const [showMediaIcon, setShowMediaIcon] = useState(false);

  return (
    <>
      <div
        className="flex justify-center items-center pt-20 relative"
        style={divStyle}
      >
        <div className="flex flex-col justify-center items-start lg:px-5 gap-16">
          <div className="slide-right flex justify-between items-center  w-full relative p-1">
            <div>
              <Link className="flex items-center gap-2 leading-none" href="#">
                <MdOutlineSubject className="text-3xl lg:text-4xl bg-[#047756] text-white rounded-md" />
                <label className="font-black text-2xl lg:text-3xl text-[#05B381]">
                  PostForm
                </label>
              </Link>
            </div>

            <nav className="hidden lg:flex justify-center items-center p-5">
              <ul className="flex items-center gap-5 lg:gap-10 text-lg  text-blue-darker font-bold p-4">
                <li className="hover:underline">
                  <Link href="#">See what&apos;s new! 🎉</Link>
                </li>

                <li className="hover:underline">
                  <Link href="/login">Sign In</Link>
                </li>
                <li className="hover:underline">
                  <Link href="#">Docs</Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="bg-[#047756] btn-indigo p-4 rounded-md text-white hover:bg-[#05B381]"
                  >
                    Start Free Trial
                  </Link>
                </li>
              </ul>
            </nav>
            <nav
              className={
                showMediaIcon
                  ? "flex  w-full h-max justify-start bg-white lg:hidden absolute top-11 p-5"
                  : "hidden"
              }
            >
              <ul
                className={
                  "flex  flex-col items-start gap-5  text-blue-darker  w-full z-10"
                }
              >
                <li className="hover:underline">
                  <Link href="#">See what&apos;s new! 🎉</Link>
                </li>

                <li className="hover:underline">
                  <Link href="/login">Sign In</Link>
                </li>
                <li className="hover:underline">
                  <Link href="#">Docs</Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="bg-[#047756] btn-indigo p-2 rounded-md text-white hover:bg-[#05B381]"
                  >
                    Start Free Trial
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="humburger-nav lg:hidden">
              <Link
                href="#"
                onClick={() => {
                  setShowMediaIcon(!showMediaIcon);
                  console.log("i am :-", showMediaIcon);
                }}
              >
                <GiHamburgerMenu className="icon-humburger text-4xl text-[#047756] " />
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-center items-start text-center gap-5">
            <span className="slide-left font-extrabold text-xl lg:text-5xl text-blue-darker font-sans">
              Don&apos;t build a whole backend just for one stupid form.
            </span>
            <span className="slide-left  text-base  lg:text-xl font-normal text-blue-lighter">
              FieldGoal provides form endpoints as a service, so your simple
              sites can stay simple.
            </span>
          </div>

          <div className="slide-right flex flex-row-reverse  justify-center items-center  p-3">
            <Image
              src={"/messagePic.png"}
              width={400}
              height={100}
              className="hidden lg:block"
              alt="message pic"
            />
            <div className="animation-code relative">
              <div className="font-mono  sm:flex">
                <div className="bg-blue-light lg:flex-col  leading-loose pl-6 pr-4 py-6 rounded-l-md text-white text-xs  hidden  lg:flex">
                  <span className="mb-3">1</span>
                  <span className="mb-3">2</span>
                  <span className="mb-3">3</span>
                  <span className="mb-3">4</span>
                  <span>5</span>
                </div>

                <div className="bg-blue-darkest flex flex-col px-10 py-6 rounded-lg text-white text-xs w-full sm:px-6 md:text-xxs sm:rounded-l-none md:rounded-l-md lg:px-10 lg:rounded-l-none lg:text-sm">
                  <span className="mb-5 md:mb-4">
                    &lt;<span className="text-pink-code">form</span>{" "}
                    <span className="text-green-code">action</span>=
                    <span className="text-yellow-code">
                      &quot;https://fieldgoal.io/f/tGhtN&quot;
                    </span>{" "}
                    <span className="text-green-code">method</span>=
                    <span className="text-yellow-code">&quot;POST&quot;</span>
                    &gt;
                  </span>
                  <span className="mb-5 pl-8 md:mb-4">
                    &lt;<span className="text-pink-code">input</span>{" "}
                    <span className="text-green-code">type</span>=
                    <span className="text-yellow-code">&quot;text&quot;</span>{" "}
                    <span className="text-green-code">name</span>=
                    <span className="text-yellow-code">
                      &quot;first_name&quot;
                    </span>
                    &gt;
                  </span>
                  <span className="mb-5 pl-8 md:mb-4">
                    &lt;<span className="text-pink-code">input</span>{" "}
                    <span className="text-green-code">type</span>=
                    <span className="text-yellow-code">&quot;text&quot;</span>{" "}
                    <span className="text-green-code">name</span>=
                    <span className="text-yellow-code">
                      &quot;last_name&quot;
                    </span>
                    &gt;
                  </span>
                  <span className="mb-5 pl-8 md:mb-4">
                    &lt;<span className="text-pink-code">button</span>{" "}
                    <span className="text-green-code">type</span>=
                    <span className="text-yellow-code">&quot;submit&quot;</span>
                    &gt;Submit&lt;/
                    <span className="text-pink-code">button</span>&gt;
                  </span>
                  <span>
                    &lt;/<span className="text-pink-code">form</span>&gt;
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderHome;
