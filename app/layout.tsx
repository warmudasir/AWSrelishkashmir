import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "./components/layout";
import Header from "./components/header";
import footer from "./components/footer";
import ProductContextProvider from "./context/productcontext";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Relish Kashmir",
  description: "Essence Of Kashmir",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"></link>
      {/* <Layout> */}
      {/* <Header/> */}
      <ProductContextProvider>
      <body className={inter.className}>{children}</body>
      </ProductContextProvider>
      <footer/>
      {/* </Layout> */}
      {/* <Footer/> */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" ></script>
      {/* <script src="https://kit.fontawesome.com/4804e83045.js"></script>
       */}
       <script src="https://kit.fontawesome.com/4804e83045.js"></script>
    </html>
  );
}
