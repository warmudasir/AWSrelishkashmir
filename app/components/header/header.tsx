"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import s from "./header.module.scss";
import cn from "classnames";
import barssolid from "../../../public/bars-solid.svg";
import { useAuth } from "@/app/context/authcontext";

type HeaderProps = {
  isAdminLogin?: boolean;
  signedInUser?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: string;
    iat?: number;
    exp?: number;
  } | null;
};

const Header = ({ isAdminLogin, signedInUser }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();
  const { user, setUser } = useAuth();

  const handleLogout = useCallback(async () => {
    await fetch("/api/logout", {
      method: "POST",
    });
    setUserData(null);
    router.replace("/login");
    router.refresh();
  }, []);

  const openMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-20 h-20 flex items-center justify-between px-4"
      style={{ backgroundColor: "black", color: "white" }}
    >
      <div className="flex justify-between items-center w-full px-4">
        <div>
          <Link href={"/"}>
            <h1 className="text-white">Relish Kashmir</h1>
          </Link>
        </div>
        <div className={cn(s["Header__nav-links"])}>
          {userData?.role !== "admin" && (
            <>
              <Link href="/about" className="text-white hover:text-gray-300">
                About
              </Link>
              <Link href="/shop" className="text-white hover:text-gray-300">
                Shop here
              </Link>
              <Link href="/myorders" className="text-white hover:text-gray-300">
                My Orders
              </Link>
            </>
          )}

          {signedInUser ? (
            <button
              onClick={handleLogout}
              className="text-white hover:text-gray-300"
            >
              Welcome {signedInUser.firstName ?? "User"}
            </button>
          ) : (
            <Link href="/login" className="text-white hover:text-gray-300">
              Login
            </Link>
          )}
        </div>
        <div className={s["Header__breadcrumb"]}>
          <button onClick={openMenu}>
            <Image src={barssolid} width={30} height={30} alt="bars" />
          </button>
        </div>
      </div>
      {menuOpen && (
        <>
          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px ",
            }}
          >
            <Link href="/about" className="text-white hover:text-gray-300">
              About
            </Link>
            <Link href="/shop" className="text-white hover:text-gray-300">
              Shop here
            </Link>
            <Link href="/myorders" className="text-white hover:text-gray-300">
              My Orders
            </Link>
            {userData ? (
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300"
              >
                Logout
              </button>
            ) : (
              <Link href="/login" className="text-white hover:text-gray-300">
                Login
              </Link>
            )}
          </div>
        </>
      )}
    </nav>
  );
};

export default Header;
