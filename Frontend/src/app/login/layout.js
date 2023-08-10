import Footer from "@/components/footer/Footer";
import Link from "next/link";

export default function Layout({ children }) {
  const divStyle = {
    background: "#f3f5f8",
    backgroundColor: "#f3f5f8",
    backgroundImage: `linear-gradient(hsla(0, 0%, 100%, 0.001), #f3f5f8), url("/screen-pattern-gray.svg?52128fc")`,
    backgroundSize: "cover, 500px auto",
    height: "961px",
  };

  return (
    <div>
     
      <div
        style={divStyle}
        className="flex flex-col justify-center items-center"
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}
