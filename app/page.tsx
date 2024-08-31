import Image from "next/image";
import Header from "./components/header/header"
import Products from "./components/products";
import Footer from "./components/footer/footer";
import ImageCarousel from "./components/image-carousel/imageCarousel";
export default function Home() {
  return (
    <main>
      <Header/>
      <ImageCarousel/>
      <Products/>
      <Footer/>
    </main>
  );
}
