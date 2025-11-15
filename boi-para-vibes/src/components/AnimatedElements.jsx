import { ReactNode } from 'react';

interface AnimatedElementProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const FadeInUp = ({ children, className = '', delay = 0 }: AnimatedElementProps) => (
  <div 
    className={`animate-fadeInUp ${className}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

export const SlideInLeft = ({ children, className = '', delay = 0 }: AnimatedElementProps) => (
  <div 
    className={`animate-slideInLeft ${className}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

export const SlideInRight = ({ children, className = '', delay = 0 }: AnimatedElementProps) => (
  <div 
    className={`animate-slideInRight ${className}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

export const ScaleIn = ({ children, className = '', delay = 0 }: AnimatedElementProps) => (
  <div 
    className={`animate-scaleIn ${className}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

export const FloatingBook = ({ children, className = '' }: AnimatedElementProps) => (
  <div className={`animate-float ${className}`}>
    {children}
  </div>
);