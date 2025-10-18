import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, ShoppingCart, ArrowLeft, Phone, MapPin, Clock } from 'lucide-react';
import { useCart, Book } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { bookstores } from '@/data/bookstores';
import { getAllBooks } from '@/data/books';
import { getAllBengaliBooks } from '@/data/bengaliBooks';
import { updateBookCovers } from '@/utils/updateAllCovers';

const rawBooks = [...getAllBooks(), ...getAllBengaliBooks()];
const allBooks: Book[] = updateBookCovers(rawBooks);

const StorePage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const store = bookstores.find(s => s.id === parseInt(id || '0'));

  if (!store) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-vintage-brown mb-4">Store Not Found</h1>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Filter books based on store specialization
  const storeBooks = allBooks.filter(book => 
    store.specialization.some(spec => 
      book.category.toLowerCase().includes(spec.toLowerCase()) ||
      spec.toLowerCase().includes(book.category.toLowerCase())
    )
  ).slice(0, 12);

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
    <div className="min-h-screen bg-gradient-to-br from-vintage-cream via-white to-vintage-sepia/20">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-vintage-brown hover:text-vintage-burgundy mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Store Header */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="relative">
            <img
              src={store.image}
              alt={store.name}
              className="w-full h-64 object-cover rounded-xl shadow-lg"
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-vintage-brown mb-2">
                {store.name}
              </h1>
              <p className="text-lg text-vintage-brown/80">
                Owner: {store.ownerName}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-vintage-gold text-vintage-gold" />
              <span className="font-bold text-lg">{store.rating}</span>
              <span className="text-vintage-brown/60">({store.reviews} reviews)</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-vintage-brown/70">
                <MapPin className="h-4 w-4" />
                <span>Shop {store.shopNo}, {store.lane}</span>
              </div>
              <div className="flex items-center gap-2 text-vintage-brown/70">
                <Phone className="h-4 w-4" />
                <span>{store.contactNumber}</span>
              </div>
              <div className="flex items-center gap-2 text-vintage-brown/70">
                <Clock className="h-4 w-4" />
                <span>{store.openHours}</span>
              </div>
            </div>

            <div>
              <p className="text-vintage-brown/80 leading-relaxed mb-4">
                {store.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {store.specialization.map((spec, index) => (
                  <Badge key={index} className="bg-vintage-gold/20 text-vintage-brown">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Store Books */}
        <div className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-vintage-brown mb-6">
            Books Available at {store.name}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {storeBooks.map((book) => (
              <Card key={book.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 border-0 shadow-lg hover:shadow-purple-500/20 overflow-hidden rounded-2xl backdrop-blur-sm">
                <CardContent className="p-3">
                  <div className="relative mb-2">
                    <Link to={`/book/${book.id}`}>
                      <div className="aspect-[2/3] bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl overflow-hidden cursor-pointer group-hover:shadow-lg transition-shadow">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://dummyimage.com/150x200/3B82F6/ffffff&text=${encodeURIComponent(book.title.slice(0, 10))}`;
                          }}
                        />
                      </div>
                    </Link>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-1 right-1 h-6 w-6 p-0 bg-white/90 hover:bg-white rounded-full shadow-sm"
                      onClick={() => handleWishlistToggle(book)}
                    >
                      <Heart className={`h-3 w-3 ${isInWishlist(book.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-sm text-gray-900 line-clamp-1 group-hover:text-purple-600 transition-colors">
                      {book.title}
                    </h3>
                    
                    <p className="text-xs text-gray-500 line-clamp-1">
                      by {book.author}
                    </p>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium text-gray-700">{book.rating}</span>
                      </div>
                      <span className="font-bold text-sm text-gray-900">{book.price}</span>
                    </div>

                    <Button 
                      className="w-full bg-gradient-to-r from-vintage-brown via-vintage-burgundy to-vintage-brown hover:from-vintage-burgundy hover:to-vintage-brown text-white text-xs py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                      onClick={() => handleAddToCart(book)}
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StorePage;