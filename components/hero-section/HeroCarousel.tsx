// import { Carousel } from "@/utilities/material-tailwind-export";
'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import Image from "next/image";
import Carousel1 from "@/public/carousel_1.jpeg";
import Carousel2 from "@/public/carousel_2.jpeg";
import Carousel3 from "@/public/carousel_3.jpeg";

export default function HeroCarousel() {
  return (
    <Swiper 
      className="pagination-slider w-full h-full overflow-x-hidden md:rounded-lg md:w-8/12"
      modules={[Pagination, Autoplay]}
      loop={true}
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      autoplay={{
        delay: 5000
      }}
      speed={500}
    >
      <SwiperSlide>
        <Image 
          src={Carousel1}
          alt="Image 1"
          className="h-full w-full object-cover"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image 
          src={Carousel2}
          alt="Image 1"
          className="h-full w-full object-cover"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image 
          src={Carousel3}
          alt="Image 1"
          className="h-full w-full object-cover"
        />
      </SwiperSlide>
    </Swiper>
  )
}