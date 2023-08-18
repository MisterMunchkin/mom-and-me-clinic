import { Carousel } from "@/utilities/material-tailwind-export";
import Image from "next/image";
import Carousel1 from "@/public/carousel_1.jpeg";
import Carousel2 from "@/public/carousel_2.jpeg";
import Carousel3 from "@/public/carousel_3.jpeg";

export default function HeroCarousel() {
  return (
    <Carousel 
      className="md:rounded-lg md:w-8/12"
      loop={true}
      autoplay={true}
    >
      <Image 
        src={Carousel1}
        alt="Image 1"
        className="h-full w-full object-cover"
      />
      <Image 
        src={Carousel2}
        alt="Image 1"
        className="h-full w-full object-cover"
      />
      <Image 
        src={Carousel3}
        alt="Image 1"
        className="h-full w-full object-cover"
      />
    </Carousel>
  )
}