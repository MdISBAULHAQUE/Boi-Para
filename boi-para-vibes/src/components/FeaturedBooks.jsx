import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart, Book } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "@/hooks/use-toast";
import { getAllBooks } from "@/data/books";
import { getAllBengaliBooks } from "@/data/bengaliBooks";
import { updateBookCovers } from "@/utils/updateAllCovers";

const rawBooks = [...getAllBooks(), ...getAllBengaliBooks()];
const allBooksData = updateBookCovers(rawBooks);

// Add shop information to books
const shops = [
  'রবীন্দ্র পুস্তক ভবন',
  'Academic Corner', 
  'দেশ বিদেশের বই',
  'Rare Books Emporium',
  'শিশু কিশোর গ্রন্থালয়',
  'Philosophy & Wisdom'
];

const featuredBooks = allBooksData.slice(0, 6).map((book, index) => ({
  ...book,
  shopName: shops[index % shops.length],
  shopId: (index % shops.length) + 1
}));

const FeaturedBooks = () => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (book: Book) => {
    addToCart(book);
    toast({
      title: "Added to cart",
      description: `${book.title} has been added to your cart.`,
    });
  };

  const handleWishlistToggle = (book: Book) => {
    if (isInWishlist(book.id)) {
      removeFromWishlist(book.id);
      toast({
        title: "Removed from wishlist",
        description: `${book.title} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(book);
      toast({
        title: "Added to wishlist",
        description: `${book.title} has been added to your wishlist.`,
      });
    }
  };
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-blue-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-vintage-cream to-vintage-sepia/30 rounded-full text-vintage-brown text-sm font-semibold mb-6 border border-vintage-gold/30">
            📚 Curated Selection
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-vintage-brown mb-6 tracking-tight leading-tight">
            Featured Books
          </h2>
          <p className="text-base md:text-lg text-vintage-brown/80 max-w-4xl mx-auto leading-relaxed">
            Discover handpicked literary masterpieces from our exclusive collection
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 max-w-7xl mx-auto stagger-animation">
          {featuredBooks.map((book, index) => (
            <Card 
              key={book.id}
              className="book-card group glass bg-white/80 border border-vintage-gold/20 shadow-lg hover:shadow-2xl overflow-hidden rounded-2xl"
              style={{'--stagger-delay': index} as React.CSSProperties}
            >
              <CardContent className="p-3">
                {/* Book Cover */}
                <div className="relative mb-2">
                  <Link to={`/book/${book.id}`}>
                    <div className="aspect-[2/3] bg-vintage-sepia rounded-xl overflow-hidden cursor-pointer group-hover:shadow-lg transition-shadow">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://dummyimage.com/150x200/8B4513/ffffff&text=${encodeURIComponent(book.title.slice(0, 10))}`;
                        }}
                      />
                    </div>
                  </Link>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 h-8 w-8 p-0 glass bg-white/90 hover:bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
                    onClick={() => handleWishlistToggle(book)}
                  >
                    <Heart className={`h-4 w-4 transition-all duration-200 ${isInWishlist(book.id) ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-400 hover:text-red-400'}`} />
                  </Button>
                </div>

                {/* Book Info */}
                <div className="space-y-1.5">
                  <h3 className="font-semibold text-sm text-vintage-brown line-clamp-2 group-hover:text-vintage-burgundy transition-colors leading-tight h-8">
                    {book.title}
                  </h3>
                  
                  <p className="text-xs text-vintage-brown/70 line-clamp-1 h-4">
                    by {book.author}
                  </p>
                  
                  <div className="flex items-center gap-1 h-4">
                    <Store className="h-3 w-3 text-vintage-brown/60 flex-shrink-0" />
                    <Link to={`/store/${book.shopId}`} className="text-xs text-vintage-brown/60 hover:text-vintage-brown hover:underline line-clamp-1">
                      {book.shopName}
                    </Link>
                  </div>

                  <div className="flex items-center justify-between pt-1 h-5">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-vintage-gold text-vintage-gold" />
                      <span className="text-xs font-medium text-vintage-brown">{book.rating}</span>
                    </div>
                    <span className="font-bold text-sm text-vintage-brown">{book.price}</span>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-vintage-brown via-vintage-burgundy to-vintage-brown hover:from-vintage-burgundy hover:to-vintage-brown text-vintage-cream text-xs py-2.5 rounded-xl shadow-md hover:shadow-lg btn-modern btn-shimmer transition-all duration-300 h-8 mt-2"
                    onClick={() => handleAddToCart(book)}
                  >
                    <ShoppingCart className="h-3 w-3 mr-1.5" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link to="/books">
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-vintage-brown text-vintage-brown hover:bg-vintage-brown hover:text-vintage-cream px-10 py-3 rounded-xl font-semibold btn-modern btn-shimmer shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View All Books
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;