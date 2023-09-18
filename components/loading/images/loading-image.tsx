'use client'

import { shadcn } from '@/shared/utilities/shadcn';
import Image from 'next/image';
import React from 'react';
import { useState } from 'react';

interface LoadingImageCircleProps {
  src: string;
  alt: string;
  height: number;
  width: number;
  className: string;
}

export default function LoadingImage(
  {height, width, src, alt, className}: LoadingImageCircleProps
) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <div 
        className={shadcn(
          loading ? 'block' : 'hidden',
          'absolute',
          'animate-pulse bg-gray-300',
          `w-[100px] h-[100px]`,
          'z-10',
          className
        )}
      /> 
      <Image 
        className={shadcn(
          className
        )}
        src={src} 
        alt={alt}
        width={width}
        height={height}
        onLoadingComplete={() => setLoading(false)}
      />
    </>
  )
}