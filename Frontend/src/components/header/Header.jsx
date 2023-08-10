"use client";
import Link from "next/link";
import { useState } from "react";
import { MdOutlineSubject } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { navBar } from "../constant/navBar";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import useLogout from "./hook/useLogout";
const Header = () => {
  const [showMediaIcon, setShowMediaIcon] = useState(false);
  const { handleLogout } = useLogout();
  const router = useRouter();
  const token = getCookie("token");


  // if (!token) return router.push("/login");

  return (
    <>
      <div className="flex justify-between items-center  p-5 relative border">
        <div>
          <Link className="flex items-center gap-2 leading-none" href="#">
            <MdOutlineSubject className="text-xl lg:text-5xl bg-[#047756] text-white rounded-md" />
            <label className="font-black text-xl lg:text-3xl text-[#05B381]">
              PostForm
            </label>
          </Link>
        </div>
        <nav className={"hidden lg:flex"}>
          <ul
            className={
              "flex items-center gap-5 lg:gap-10 text-lg  text-blue-darker"
            }
          >
            {navBar.map((item) => (
              <li className="hover:underline" key={item.id}>
                {item.title === "Log out" ? (
                  <a href="#" onClick={handleLogout}>
                    {item.title}
                  </a>
                ) : (
                  <Link href={item.link}>{item.title}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <nav
          className={
            showMediaIcon
              ? "flex  w-full justify-start  lg:hidden absolute top-20 right-0 left-0"
              : "hidden"
          }
        >
          <ul
            className={
              "flex  flex-col items-start gap-5 w-full text-blue-darker bg-white  z-10"
            }
          >
            {navBar.map((item) => (
              <li className="hover:underline" key={item.id}>
                {item.title === "Log out" ? (
                  <a href="#" onClick={handleLogout}>
                    {item.title}
                  </a>
                ) : (
                  <Link href={item.link}>{item.title}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="humburger-nav lg:hidden">
          <a
            href="#"
            onClick={() => {
              setShowMediaIcon(!showMediaIcon);
              console.log("i am :-", showMediaIcon);
            }}
          >
            <GiHamburgerMenu className="icon-humburger text-4xl text-[#047756] " />
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
