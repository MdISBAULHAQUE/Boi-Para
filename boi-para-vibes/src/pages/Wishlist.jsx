import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Trash2, Lock } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Wishlist = () => {
  const { user } = useAuth();
  const { state, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  // Redirect if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <Lock className="h-24 w-24 mx-auto text-muted-foreground" />
            <h1 className="text-3xl font-bold text-amber-800">Please log in to view your wishlist</h1>
            <p className="text-lg text-muted-foreground">
              You need to be logged in to access your personal wishlist
            </p>
            <Link to="/auth">
              <Button className="bg-amber-700 hover:bg-amber-800 text-white">
                Log In
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = (book: any) => {
    addToCart(book);
    toast({
      title: "Added to cart",
      description: `${book.title} has been added to your cart.`,
    });
  };

  const handleRemoveFromWishlist = (book: any) => {
    removeFromWishlist(book.id);
    toast({
      title: "Removed from wishlist",
      description: `${book.title} has been removed from your wishlist.`,
    });
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <Heart className="h-24 w-24 mx-auto text-muted-foreground" />
            <h1 className="text-3xl font-bold text-amber-800">Your wishlist is empty</h1>
            <p className="text-lg text-muted-foreground">
              Save books you love for later
            </p>
            <Link to="/books">
              <Button className="bg-amber-700 hover:bg-amber-800 text-white">
                Browse Books
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-800 mb-2">My Wishlist</h1>
          <p className="text-muted-foreground">
            {state.items.length} books saved for {user.name}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {state.items.map((book) => (
            <Card key={book.id} className="group hover:shadow-book transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <div className="aspect-[3/4] bg-sky-50 rounded-lg flex items-center justify-center mb-3 overflow-hidden">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 h-8 w-8 p-0 bg-background/80 hover:bg-background"
                    onClick={() => handleRemoveFromWishlist(book)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                  <Badge className="absolute top-2 left-2 bg-sky-400 text-white">
                    {book.condition}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs border-sky-200 text-amber-700">
                    {book.category}
                  </Badge>
                  
                  <h3 className="font-serif text-lg font-semibold text-amber-800 line-clamp-2">
                    {book.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground">
                    by {book.author}
                  </p>

                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-800">{book.price}</span>
                    <span className="text-sm text-muted-foreground line-through">
                      {book.originalPrice}
                    </span>
                  </div>

                  <Button 
                    className="w-full bg-amber-700 hover:bg-amber-800 text-white mt-3"
                    size="sm"
                    onClick={() => handleAddToCart(book)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Wishlist;