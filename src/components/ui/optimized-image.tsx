'use client'
import Image from 'next/image'
import { useState } from 'react'
import { getProductImagePath, IMAGE_SIZES, getResponsiveSizes } from '@/lib/image-utils'

interface OptimizedImageProps {
  src?: string | null
  alt: string
  type?: keyof typeof IMAGE_SIZES
  className?: string
  priority?: boolean
  fill?: boolean
}

export function OptimizedImage({
  src,
  alt,
  type = 'product',
  className = '',
  priority = false,
  fill = false,
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(getProductImagePath(src))
  const [isLoading, setIsLoading] = useState(true)
  
  const size = IMAGE_SIZES[type]
  const sizes = getResponsiveSizes(type)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-neutral-100 skeleton" />
      )}
      
      <Image
        src={imgSrc}
        alt={alt}
        width={fill ? undefined : size.width}
        height={fill ? undefined : size.height}
        fill={fill}
        sizes={sizes}
        priority={priority}
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setImgSrc(getProductImagePath()) // Use default fallback
        }}
      />
    </div>
  )
}
