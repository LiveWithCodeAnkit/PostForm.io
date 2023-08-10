import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
