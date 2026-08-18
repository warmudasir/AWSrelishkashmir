import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import ProductContextProvider from "./context/productcontext";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "./context/authcontext";
import { cookies } from "next/headers";
const inter = Inter({ subsets: ["latin"] });
import jwt from "jsonwebtoken";
import ProductProvider from "./context/productcontext";
import type { AuthUser } from "./types/type";
import s from "./layout.module.scss";
export const metadata: Metadata = {
  title: "Relish Kashmir",
  description: "Essence Of Kashmir",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies()?.get("token")?.value as string;
  const userInfo = jwt.decode(cookieStore) as AuthUser | null;
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Montenegrin+Gothic+One&family=Sekuya&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Sekuya&display=swap" rel="stylesheet"></link>
      </head>
      <body className={s.body}>
        <AuthProvider>
          <ProductContextProvider>
            <ProductProvider>
              <Header signedInUser={userInfo} />
              <main className={s.main}>{children}</main>
              <Footer />
            </ProductProvider>
            <Analytics />
          </ProductContextProvider>
        </AuthProvider>

        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          strategy="beforeInteractive"
        />
        <Script
          src="https://kit.fontawesome.com/4804e83045.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
