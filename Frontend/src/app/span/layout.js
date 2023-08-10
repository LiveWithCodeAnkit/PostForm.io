import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

import SpanHeader from "@/components/sidebar/header/SpanHeader";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
