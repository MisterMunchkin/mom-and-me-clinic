'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

import Image from "next/image";
import Carousel1 from "@/public/carousel_1.jpeg";
import Carousel2 from "@/public/carousel_2.jpeg";
import Carousel3 from "@/public/carousel_3.jpeg";

export default function HeroCarousel() {
  return (
    <Swiper 
      className="w-full h-[300px] overflow-x-hidden md:rounded-lg md:w-8/12 md:h-[600px] max-w-[90rem] lg:h-[700px]"
      modules={[Autoplay]}
      loop={true}
      // pagination={{
      //   dynamicBullets: true,
      //   clickable: true,
      // }}
      grabCursor={true}
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
          placeholder='blur'
          sizes='(max-width: 720px) 100vw, (max-width: 1200px) 60vw, 40vw'
          fill
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image 
          src={Carousel2}
          alt="Image 2"
          className="h-full w-full object-cover"
          placeholder='blur'
          sizes='(max-width: 720px) 100vw, (max-width: 1200px) 60vw, 40vw'
          fill
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image 
          src={Carousel3}
          alt="Image 3"
          className="h-full w-full object-cover"
          placeholder='blur'
          sizes='(max-width: 720px) 100vw, (max-width: 1200px) 60vw, 40vw'
          fill
        />
      </SwiperSlide>
    </Swiper>
  )
}