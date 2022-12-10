import Head from "next/head";
import CartOffCanvas from "../cart/CartOffCanvas";
import Footer from "../footer/footer";
import PropertyNavbar from "../navbar/bakery/BakeryNavbar";

interface ChildProps {
  children: React.ReactNode;
}
const BakeryLayout: React.FC<ChildProps> = ({ children }) => {
  return (
    <main>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <PropertyNavbar />
      <CartOffCanvas />
      {children}
      <Footer />
    </main>
  );
};

export default BakeryLayout;
