/**
 * Centralized image path management
 * Default path: /images/products/
 * Fallback: /images/products/default-tire.jpg
 */

export const IMAGE_BASE_PATH = '/images/products'
export const LOGO_PATH = '/images/Goodyear-Bicyle-Logo-Black-320x-20px.png'
export const DEFAULT_PRODUCT_IMAGE = `${IMAGE_BASE_PATH}/peak-sl.jpg`

/**
 * Get product image path with fallback
 */
export function getProductImagePath(
  imageName?: string | null,
  fallback: string = DEFAULT_PRODUCT_IMAGE
): string {
  if (!imageName) return fallback
  
  // If already a full path, return as-is
  if (imageName.startsWith('/')) return imageName
  
  // Otherwise, prepend base path
  return `${IMAGE_BASE_PATH}/${imageName}`
}

/**
 * Image size presets for consistent sizing
 */
export const IMAGE_SIZES = {
  hero: { width: 1920, height: 1080 },
  product: { width: 800, height: 800 },
  thumbnail: { width: 300, height: 300 },
  card: { width: 600, height: 600 },
  logo: { width: 200, height: 43 },
} as const

/**
 * Generate responsive sizes string
 */
export function getResponsiveSizes(type: keyof typeof IMAGE_SIZES): string {
  const sizeMap = {
    hero: '100vw',
    product: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px',
    thumbnail: '(max-width: 768px) 50vw, 300px',
    card: '(max-width: 768px) 100vw, 600px',
    logo: '200px',
  }
  
  return sizeMap[type]
}
