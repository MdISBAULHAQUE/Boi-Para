import { useState } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import LoadingSpinner from './LoadingSpinner';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
}

const LazyImage = ({ src, alt, className = '', fallback }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });

  const handleLoad = () => setIsLoaded(true);
  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      {hasIntersected && (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-vintage-cream/50">
              <LoadingSpinner />
            </div>
          )}
          <img
            src={hasError && fallback ? fallback : src}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
          />
        </>
      )}
    </div>
  );
};

export default LazyImage;