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
        <Image
          src="/main1.jpg"
          fill
          alt="Background Image"
          className={s.heroImage}
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
