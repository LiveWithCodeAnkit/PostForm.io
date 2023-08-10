import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray flex justify-center items-center p-5 w-auto">
      <footer className="text-center text-sm self-end">
        <Link className="classic-link" href="#">
          <span className="block mb-2 sm:inline sm:mb-0">
            Have a question or need help?{" "}
          </span>
        </Link>
        <Link className="classic-link" href="#">
          Send us an email.
        </Link>
        <span>
          © 2023{" "}
          <Link className="classic-link" href="#">
            Tighten
          </Link>{" "}
          |{" "}
          <Link className="classic-link" href="#">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link className="classic-link" href="#">
            GDPR
          </Link>
        </span>
      </footer>
    </div>
  );
};

export default Footer;
