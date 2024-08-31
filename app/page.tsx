import Image from "next/image";
import Header from "./components/header/header"
import Products from "./components/products";
import Footer from "./components/footer/footer";
import ImageCarousel from "./components/image-carousel/imageCarousel";
export default function Home() {
  return (
    <main>
      <Header/>
      {/* <div style={{height:'10px',backgroundColor:'red'}}></div> */}
      <ImageCarousel/>
      <Products/>
      <Footer/>
    </main>
  );
}

// mongodb://localhost:27017
// mongodb://localhost:27017