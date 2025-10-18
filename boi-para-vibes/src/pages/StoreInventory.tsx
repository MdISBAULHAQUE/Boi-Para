import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const StoreInventory = () => {
  const books = [
    { id: 1, title: 'গীতাঞ্জলি', author: 'রবীন্দ্রনাথ ঠাকুর', price: '₹450', stock: 50, category: 'Bengali Literature' },
    { id: 2, title: 'পথের পাঁচালী', author: 'বিভূতিভূষণ বন্দ্যোপাধ্যায়', price: '₹380', stock: 35, category: 'Bengali Literature' },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', price: '₹450', stock: 25, category: 'Fiction' },
    { id: 4, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', price: '₹1200', stock: 15, category: 'Academic' },
    { id: 5, title: 'The Republic', author: 'Plato', price: '₹420', stock: 18, category: 'Philosophy' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-vintage-sepia/10 via-vintage-cream/20 to-vintage-brown/5">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/store-admin" className="inline-flex items-center gap-2 text-vintage-brown hover:text-vintage-burgundy transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Store Admin
          </Link>
        </div>
        
        <div className="text-center mb-10">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-emerald-400/30 rounded-full mb-4 shadow-lg">
            <h1 className="font-serif text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
              📚 My Inventory ({books.length} Books)
            </h1>
          </div>
          <p className="text-vintage-brown/70 text-sm max-w-md mx-auto">Manage your book collection and stock levels</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {books.map((book) => (
            <Card key={book.id} className="bg-gradient-to-br from-white via-blue-50/30 via-purple-50/30 to-emerald-50/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl overflow-hidden group">
              <CardContent className="p-4 relative">
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-blue-300/20 via-purple-300/20 to-emerald-300/20 rounded-bl-2xl"></div>
                <div className="flex items-start justify-between mb-2 relative z-10">
                  <div className="p-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                  </div>
                  <Badge variant={book.stock > 20 ? 'default' : book.stock > 5 ? 'secondary' : 'destructive'} className="text-xs px-2 py-1 rounded-full">
                    {book.stock}
                  </Badge>
                </div>
                
                <h3 className="font-medium text-vintage-brown text-sm mb-1">{book.title}</h3>
                <p className="text-xs text-gray-600 mb-1">by {book.author}</p>
                <p className="text-sm font-bold text-vintage-brown mb-2">{book.price}</p>
                <Badge variant="outline" className="text-xs mb-3">{book.category}</Badge>
                
                <div className="flex gap-1 relative z-10">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 text-xs h-7"
                    onClick={() => alert(`Edit ${book.title}`)}
                  >
                    <Edit className="h-3 w-3 sm:mr-1" />
                    <span className="hidden sm:inline">Edit</span>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    className="flex-1 text-xs h-7"
                    onClick={() => confirm(`Delete ${book.title}?`) && alert('Book deleted!')}
                  >
                    <Trash2 className="h-3 w-3 sm:mr-1" />
                    <span className="hidden sm:inline">Delete</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link to="/add-book">
            <Button className="bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 hover:from-blue-600 hover:via-purple-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              📚 Add New Book
            </Button>
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default StoreInventory;