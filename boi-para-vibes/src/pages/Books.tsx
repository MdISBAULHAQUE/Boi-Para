import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Heart, ShoppingCart, Search, Store } from 'lucide-react';
import { useCart, Book } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllBooks } from '@/data/books';
import { getAllBengaliBooks } from '@/data/bengaliBooks';
import { updateBookCovers } from '@/utils/updateAllCovers';

const rawBooks = [...getAllBooks(), ...getAllBengaliBooks()];
const booksWithCovers = updateBookCovers(rawBooks);

// Add shop information to all books
const shops = [
  'রবীন্দ্র পুস্তক ভবন',
  'Academic Corner', 
  'দেশ বিদেশের বই',
  'Rare Books Emporium',
  'শিশু কিশোর গ্রন্থালয়',
  'Philosophy & Wisdom'
];

const allBooks: Book[] = booksWithCovers.map((book, index) => ({
  ...book,
  shopName: shops[index % shops.length],
  shopId: (index % shops.length) + 1
}));

const Books = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    if (categoryParam) {
      setSelectedCategory(categoryParam.toLowerCase());
    }
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

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

  const filteredBooks = allBooks
    .filter(book => {
      const matchesSearch = searchQuery === '' || 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || 
        book.category.toLowerCase() === selectedCategory.toLowerCase();
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return parseInt(a.price.replace('₹', '')) - parseInt(b.price.replace('₹', ''));
        case 'rating':
          return b.rating - a.rating;
        case 'title':
        default:
          return a.title.localeCompare(b.title);
      }
    });

  const categories = ['all', 'fiction', 'literature', 'poetry', 'history', 'philosophy', 'academic', 'rare'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <div className="text-center">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-vintage-cream to-vintage-sepia/30 rounded-full text-vintage-brown text-sm font-semibold mb-6 border border-vintage-gold/30">
              📚 Complete Collection
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 tracking-tight">All Books</h1>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">Discover our complete collection of literary treasures from around the world</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="Search books, authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredBooks.map((book) => (
            <Card 
              key={book.id}
              className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-white border-0 shadow-md hover:shadow-blue-500/20 overflow-hidden rounded-2xl backdrop-blur-sm"
            >
              <CardContent className="p-2">
                <div className="relative mb-2">
                  <Link to={`/book/${book.id}`}>
                    <div className="aspect-[2/3] bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl overflow-hidden cursor-pointer group-hover:shadow-lg transition-shadow">
                      <img
                        src={book.cover}
                        alt={`Cover of ${book.title}`}
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

                <div className="space-y-1.5">
                  <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight h-8">
                    {book.title}
                  </h3>
                  
                  <p className="text-xs text-gray-500 line-clamp-1 h-4">
                    by {book.author}
                  </p>
                  
                  <div className="flex items-center gap-1 h-4">
                    <Store className="h-3 w-3 text-gray-400 flex-shrink-0" />
                    <Link to={`/store/${book.shopId}`} className="text-xs text-gray-400 hover:text-vintage-brown hover:underline line-clamp-1">
                      {book.shopName}
                    </Link>
                  </div>

                  <div className="flex items-center justify-between pt-1 h-5">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium text-gray-700">{book.rating}</span>
                    </div>
                    <span className="font-bold text-sm text-gray-900">{book.price}</span>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-vintage-brown via-vintage-burgundy to-vintage-brown hover:from-vintage-burgundy hover:to-vintage-brown text-vintage-cream text-xs py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 h-8 mt-2"
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

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No books found matching your criteria.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Books;