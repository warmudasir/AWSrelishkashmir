import Image from "next/image";
import Products from "./components/products";
import LogoGrid from "./logogrid/page";
import cn from "classnames";
import s from "./page.module.scss";
import { getProducts } from "./services/products/getproducts";
import { Product } from "./types/common";

export default async function Home() {
  const products: Product[] = await getProducts();
  return (
    <>
      <div className="relative w-full h-screen">
        <Image
          src="/main1.jpg"
          fill
          style={{ objectFit: "cover" }}
          alt="Background Image"
          className="z-0"
        />
        <div
          className={cn("z-10 center", s["Header__background-text-container"])}
        >
          <h1
            className={s["Header__background-text-container_background-text"]}
          >
            Harvested from the heights of Kashmir
          </h1>
          <h3
            className={s["Header__background-text-container_background-text"]}
          >
            Purity you can taste, tradition you can trust
          </h3>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          fontFamily: "sans-serif",
          fontSize: "20px",
        }}
      >
        Best of Jammu & Kashmir
      </div>
      <div
        style={{
          textAlign: "center",
          fontFamily: "sans-serif",
          fontSize: "20px",
        }}
      >
        <h2>
          Explore Collections{" "}
          <span style={{ color: "red", textDecoration: "underline" }}>
            Top Picks
          </span>
        </h2>
      </div>
      <Products products={products} />
      <LogoGrid />
    </>
  );
}
