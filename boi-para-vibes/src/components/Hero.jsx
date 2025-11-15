import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bookstore.png";
import { Link } from "react-router-dom";
import { FloatingBook } from "@/components/AnimatedElements";

const Hero = () => {
  return (
    <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Vintage bookstore with warm lighting and stacked books"
          className="w-full h-full object-cover"
          loading="eager"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-vintage-brown/60 via-vintage-burgundy/40 to-vintage-sepia/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20"></div>
      </div>



      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 will-change-transform">
        <FloatingBook>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-vintage-cream mb-6 drop-shadow-2xl animate-fadeInUp">
            Welcome to
            <span className="block text-transparent bg-gradient-to-r from-vintage-gold via-yellow-300 to-vintage-gold bg-clip-text drop-shadow-lg animate-float">Boi Para</span>
          </h1>
        </FloatingBook>
        
        <p className="text-xl md:text-2xl text-vintage-cream/90 mb-16 max-w-4xl mx-auto font-light leading-relaxed drop-shadow-lg animate-slideInLeft" style={{animationDelay: '300ms'}}>
          Discover rare literary treasures and timeless classics in Kolkata's most beloved bookstore district
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-scaleIn" style={{animationDelay: '600ms'}}>
          <Link to="/books">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-vintage-gold via-yellow-400 to-vintage-gold text-vintage-brown font-bold px-10 py-5 text-lg shadow-2xl rounded-2xl border-2 border-vintage-gold/50 btn-modern btn-shimmer hover:shadow-vintage-gold/25 focus-ring"
            >
               Explore Collection
            </Button>
          </Link>
          <Link to="/bookstores">
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-vintage-cream text-vintage-cream hover:bg-vintage-cream hover:text-vintage-brown px-10 py-5 text-lg rounded-2xl font-semibold glass shadow-xl btn-modern btn-shimmer focus-ring"
            >
              Find Bookstores
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;