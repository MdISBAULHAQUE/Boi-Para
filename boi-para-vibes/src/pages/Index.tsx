import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedBooks from "@/components/FeaturedBooks";
import BookstoreDirectory from "@/components/BookstoreDirectory";
import BookRecommendations from "@/components/BookRecommendations";
import BookQuotes from "@/components/BookQuotes";
import Footer from "@/components/Footer";
import { FadeInUp } from "@/components/AnimatedElements";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <div className="animate-fadeInUp">
        <Hero />
      </div>
      <FadeInUp delay={200}>
        <FeaturedCategories />
      </FadeInUp>
      <FadeInUp delay={400}>
        <FeaturedBooks />
      </FadeInUp>
      <FadeInUp delay={600}>
        <BookstoreDirectory />
      </FadeInUp>
      <FadeInUp delay={800}>
        <BookRecommendations />
      </FadeInUp>
      <FadeInUp delay={1000}>
        <BookQuotes />
      </FadeInUp>
      <Footer />
    </div>
  );
};

export default Index;
