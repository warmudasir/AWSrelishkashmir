import Image from "next/image";
import Header from "./components/header/header"
import Products from "./components/products";
import Footer from "./components/footer/footer";
import ImageCarousel from "./components/image-carousel/imageCarousel";
import LogoGrid from "./logogrid/page";
import cn from "classnames";
import s from "./page.module.scss"

export default function Home() {
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
 
  <div  className={cn("z-10 center",s["Header__background-text-container"])}>
      <h1 className={s["Header__background-text-container_background-text"]}>Harvested from the heights of Kashmir</h1>
       <h3 className={s["Header__background-text-container_background-text"]}>Purity you can taste, tradition you can trust</h3>
     </div>
    </div> 
    <Products/>
   </>
  );
}

 
      
