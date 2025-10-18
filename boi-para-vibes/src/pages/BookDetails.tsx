import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, ShoppingCart, ArrowLeft, Share2 } from 'lucide-react';
import { useCart, Book } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllBooks } from '@/data/books';
import { getAllBengaliBooks } from '@/data/bengaliBooks';
import { updateBookCovers } from '@/utils/updateAllCovers';

const rawBooks = [...getAllBooks(), ...getAllBengaliBooks()];
const allBooks: Book[] = updateBookCovers(rawBooks);

const BookDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const book = allBooks.find(b => b.id === parseInt(id || '0'));

  if (!book) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-vintage-brown mb-4">Book Not Found</h1>
          <Link to="/books">
            <Button>Back to Books</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(book);
    toast({
      title: "Added to cart",
      description: `${book.title} has been added to your cart.`,
    });
  };

  const handleWishlistToggle = () => {
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `Check out "${book.title}" by ${book.author} on Boi Para`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Book link has been copied to clipboard.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vintage-cream via-white to-vintage-sepia/20">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/books" className="inline-flex items-center gap-2 text-vintage-brown hover:text-vintage-burgundy mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Books
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Book Cover */}
          <div className="space-y-6">
            <Card className="overflow-hidden shadow-2xl max-w-md mx-auto">
              <CardContent className="p-0">
                <img
                  src={book.cover}
                  alt={`Cover of ${book.title}`}
                  className="w-full h-[500px] object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://dummyimage.com/300x500/8B4513/ffffff&text=${encodeURIComponent(book.title.slice(0, 20))}`;
                  }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Book Details */}
          <div className="space-y-8">
            <div>
              <Badge className="mb-4 bg-gradient-to-r from-vintage-gold to-yellow-400 text-vintage-brown">
                {book.category}
              </Badge>
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-vintage-brown mb-4">
                {book.title}
              </h1>
              <p className="text-lg text-vintage-brown/80 mb-6">by {book.author}</p>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-vintage-gold text-vintage-gold" />
                  <span className="font-bold text-base">{book.rating}</span>
                  <span className="text-vintage-brown/60">({book.reviews} reviews)</span>
                </div>
                <Badge className="bg-vintage-burgundy/20 text-vintage-brown">
                  {book.condition}
                </Badge>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <span className="text-2xl font-bold text-vintage-brown">{book.price}</span>
                <span className="text-lg text-vintage-brown/60 line-through">{book.originalPrice}</span>
              </div>
            </div>

            <Card className="p-6 bg-gradient-to-br from-white to-vintage-cream/20">
              <CardContent className="p-0">
                <h3 className="font-serif text-lg font-bold text-vintage-brown mb-4">Description</h3>
                <p className="text-vintage-brown/80 leading-relaxed text-base">
                  {book.description}
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-vintage-sepia/10 to-vintage-brown/10">
              <CardContent className="p-0">
                <h3 className="font-serif text-lg font-bold text-vintage-brown mb-4">Book Details</h3>
                <div className="grid grid-cols-2 gap-4 text-vintage-brown/80">
                  <div>
                    <span className="font-semibold">Category:</span>
                    <p>{book.category}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Condition:</span>
                    <p>{book.condition}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Rating:</span>
                    <p>{book.rating}/5 ({book.reviews} reviews)</p>
                  </div>
                  <div>
                    <span className="font-semibold">Author:</span>
                    <p>{book.author}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-vintage-brown to-vintage-burgundy hover:from-vintage-burgundy hover:to-vintage-brown text-vintage-cream font-bold py-3 text-base"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                onClick={handleWishlistToggle}
                className="px-6 py-4 border-vintage-brown text-vintage-brown hover:bg-vintage-brown hover:text-vintage-cream"
              >
                <Heart className={`h-5 w-5 ${isInWishlist(book.id) ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button
                variant="outline"
                onClick={handleShare}
                className="px-6 py-4 border-vintage-brown text-vintage-brown hover:bg-vintage-brown hover:text-vintage-cream"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookDetails;