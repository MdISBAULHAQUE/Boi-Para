import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, RefreshCw, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAllBooks } from '@/data/books';
import { getAllBengaliBooks } from '@/data/bengaliBooks';
import { updateBookCovers } from '@/utils/updateAllCovers';

const rawBooks = [...getAllBooks(), ...getAllBengaliBooks()];
const allBooks = updateBookCovers(rawBooks);

const BookRecommendations = () => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateRecommendations = () => {
    setIsLoading(true);
    setTimeout(() => {
      const shuffled = [...allBooks].sort(() => 0.5 - Math.random());
      setRecommendations(shuffled.slice(0, 5));
      setIsLoading(false);
    }, 800);
  };

  useEffect(() => {
    generateRecommendations();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-vintage-cream/30 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-vintage-cream to-vintage-sepia/30 rounded-full text-vintage-brown text-sm font-bold mb-8 border border-vintage-gold/30">
            ✨ AI Powered
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-vintage-brown mb-4 tracking-tight leading-tight">
            Smart Recommendations
          </h2>
          <p className="text-base md:text-lg text-vintage-brown/80 max-w-3xl mx-auto mb-6 leading-relaxed">
            Discover your next favorite read with our intelligent AI recommendation system
          </p>
          <Button 
            onClick={generateRecommendations}
            disabled={isLoading}
            className="bg-gradient-to-r from-vintage-gold to-yellow-400 hover:from-yellow-400 hover:to-vintage-gold text-vintage-brown font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isLoading ? (
              <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
            ) : (
              <Sparkles className="h-5 w-5 mr-2" />
            )}
            Get New Recommendations
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {recommendations.map((book, index) => (
            <Card key={book.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-vintage-cream/30 border border-vintage-gold/20 hover:border-vintage-gold shadow-md hover:shadow-vintage-gold/20 overflow-hidden rounded-2xl">
              <CardContent className="p-2">
                <div className="relative mb-1">
                  <Link to={`/book/${book.id}`}>
                    <div className="aspect-[2/3] bg-vintage-sepia rounded-xl overflow-hidden cursor-pointer group-hover:shadow-lg transition-shadow">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://dummyimage.com/120x180/8B4513/ffffff&text=${encodeURIComponent(book.title.slice(0, 8))}`;
                        }}
                      />
                    </div>
                  </Link>
                  <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-vintage-gold to-yellow-400 text-vintage-brown text-xs px-2 py-1 rounded-full shadow-lg font-bold">
                    #{index + 1}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <h3 className="font-semibold text-sm text-vintage-brown line-clamp-2 group-hover:text-vintage-burgundy transition-colors leading-tight">
                    {book.title}
                  </h3>
                  
                  <p className="text-xs text-vintage-brown/70 line-clamp-1 mt-1">
                    by {book.author}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-vintage-gold text-vintage-gold" />
                      <span className="text-xs font-medium text-vintage-brown">{book.rating}</span>
                    </div>
                    <span className="font-bold text-xs text-vintage-brown">{book.price}</span>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-vintage-brown to-vintage-burgundy hover:from-vintage-burgundy hover:to-vintage-brown text-vintage-cream text-xs py-1 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                    onClick={() => {}}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookRecommendations;