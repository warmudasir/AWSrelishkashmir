import Image from "next/image";
import Products from "./components/products";
import LogoGrid from "./logogrid/page";
import cn from "classnames";
import s from "./page.module.scss";
import { getProducts } from "./services/products/getproducts";
import type { Product } from "./types/common";

export default async function Home() {
  const products: Product[] = await getProducts();
  return (
    <>
      <div className={s.heroSection}>
        {/* <Image
          src="/main1.jpg"
          fill
          alt="Background Image"
          className={s.heroImage}
        /> */}
        <div
          className={cn("z-10 center", s["Header__background-text-container"])}
        >
          <p
            className={s["Header__background-text-container_background-text"]}
          >
            Harvested from the heights of Kashmir
          </p>
          <p
            className={s["Header__background-text-container_background-text"]}
          >
            Purity you can taste, tradition you can trust
          </p>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "50px", }}>
            <a href="#collections" className={s["Header__background-text-container_link"]}>
              Explore Our Collections
            </a>
          </div>
        </div>
      </div>
      <div className={s.heroIntro}>Best of Jammu & Kashmir</div>
      <div className={s.heroIntro}>
        <h2>
          Explore Collections{" "}
          <span className={s.highlightText}>Top Picks</span>
        </h2>
      </div>
      <Products products={products} />
      <LogoGrid />
    </>
  );
}
