"use client";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import s from "./header.module.scss";
import cn from "classnames";
import barssolid from "../../../public/bars-solid.svg";
import { useAuth } from "@/app/context/authcontext";
import type { HeaderUserData } from "@/app/types/type";

type HeaderProps = {
  isAdminLogin?: boolean;
  signedInUser?: HeaderUserData | null;
};

const Header = ({ isAdminLogin, signedInUser }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState<HeaderUserData | null>(null);
  const router = useRouter();
  const { setUser } = useAuth();

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
    <nav className={`${s.headerNav}`}>
      <div className="flex justify-between items-center w-full px-4">
        <div>
          <Link href={"/"}>
            <p className={s["Header"]}>
              Relish Kashmir
            </p>
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
          <div className={s.mobileMenu}>
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
