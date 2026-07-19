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
import jwt, { JwtPayload } from "jsonwebtoken";
export const metadata: Metadata = {
  title: "Relish Kashmir",
  description: "Essence Of Kashmir",
};
type User = {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  iat: number;
  exp: number;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies()?.get("token")?.value as string;
  const userInfo = jwt.decode(cookieStore) as User | null;
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
      </head>
      <body style={{ backgroundColor: "#024950", color: "#E0E0E0" }}>
        <AuthProvider>
          <ProductContextProvider>
            <Header signedInUser={userInfo} />
            <main style={{ paddingTop: "80px" }}>{children}</main>
            <Footer />
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
