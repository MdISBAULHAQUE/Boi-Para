import { BookOpen } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-vintage-cream border-t-vintage-gold rounded-full animate-spin"></div>
        <BookOpen className="absolute inset-0 m-auto h-6 w-6 text-vintage-brown animate-pulse" />
      </div>
    </div>
  );
};

export default LoadingSpinner;