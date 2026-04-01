/**
 * Image Optimization Guidelines
 * 
 * Next.js Image Optimization Best Practices
 * 
 * USAGE:
 * import Image from 'next/image';
 * 
 * <Image
 *   src="/path/to/image.jpg"
 *   alt="Description"
 *   width={1200}
 *   height={630}
 *   priority={false}  // Set to true for above-fold images
 *   quality={75}      // Default: 75, adjust based on content
 *   placeholder="blur" // Show blur placeholder while loading
 * />
 * 
 * OPTIMIZATION TECHNIQUES:
 * 1. Always specify width/height (prevents CLS)
 * 2. Use placeholder="blur" for above-fold images
 * 3. Set priority={true} for hero/LCP images
 * 4. Use appropriate image formats (WebP, AVIF)
 * 5. Lazy-load below-fold images (default behavior)
 * 6. Optimize source images before upload
 */

export const IMAGE_OPTIMIZATION_CONFIG = {
  // Recommended devices sizes for responsive images
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

  // Recommended image sizes for responsive srcsets
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

  // Supported formats (in priority order)
  formats: ["image/webp", "image/avif"],

  // Default quality for optimization
  defaultQuality: 75,

  // Maximum width for optimization
  maxWidth: 4096,
};

/**
 * Get optimized image props for common use cases
 */
export function getOptimizedImageProps(
  src: string,
  type: "hero" | "card" | "thumbnail" | "avatar"
) {
  const configs = {
    hero: {
      priority: true,
      quality: 85,
      placeholder: "blur",
      sizes: "100vw",
    },
    card: {
      priority: false,
      quality: 75,
      placeholder: "blur",
      sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    },
    thumbnail: {
      priority: false,
      quality: 70,
      placeholder: "empty",
      sizes: "(max-width: 768px) 50vw, 25vw",
    },
    avatar: {
      priority: false,
      quality: 60,
      placeholder: "empty",
      sizes: "64px",
    },
  };

  return {
    src,
    ...configs[type],
  };
}
