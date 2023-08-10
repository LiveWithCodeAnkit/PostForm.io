import React from "react";
import Image from "next/image";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { heroSectionCards } from "../constant/heroSection";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import Link from "next/link";


const HeroSection = () => {
  return (
    <>
      <div className="flex  flex-col gap-24 justify-center items-center pt-20 relative bg-gray">
        <div className="flex flex-col justify-between items-start lg:w-[59%] px-5 pb-6 gap-20 slide-right ">
          <div className="slide-right ">
            <h1 className="text-3xl lg:text-5xl text-blue-darker font-extrabold">
              Capturing form submissions has never been this hassle-free.
            </h1>
          </div>
          <div className="flex  flex-col lg:flex-row slide-right gap-6">
            {heroSectionCards.map((card) => (
              <div key={card.id} className="flex flex-col  gap-3">
                <div className="flex justify-start items-center gap-2 p-2">
                  <BsFillPatchCheckFill className="text-3xl  text-[#047756]" />
                  <label className="font-bold text-blue-darker">
                    {card.title}
                  </label>
                </div>
                <p className="text-blue-lighter">
                  {card.description}
                  {card.link && (
                    <Link
                      href={card.link.href}
                      className="text-blue-600 hover:underline"
                    >
                      {" "}
                      {card.link.text}
                    </Link>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center lg:w-[59%] px-5 slide-right z-50">
          <div className="border bg-white shadow-slate-400 rounded-md flex flex-col justify-center items-center gap-5 p-16 relative">
            <div className="flex flex-col justify-center items-center gap-4 text-blue-light font-bold text-center">
              <h1 className="flex justify-center  text-base lg:text-2xl font-medium ">
                <ImQuotesLeft className="text-slate-400" /> FieldGoal saved me
                hours of boilerplate
              </h1>
              <h1 className="flex justify-center gap-2 text-base lg:text-2xl font-medium ">
                form creation. I love it!
                <ImQuotesRight className="text-slate-400" />
              </h1>
            </div>
            <div className="text-blue-light text-center">
              <label htmlFor="Taylor Otwell, Creator of Laravel">
                Taylor Otwell, Creator of Laravel
              </label>
            </div>

            <Image
              src={"/vectorPricePlan.png"}
              height={80}
              width={80}
              alt="vectorPricePlan.jpg"
              className="rounded-full absolute top-[85%] md:top-52"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
