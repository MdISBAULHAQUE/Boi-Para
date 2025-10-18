import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Plus, Upload, Image } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AddBook = () => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    price: '',
    originalPrice: '',
    category: '',
    description: '',
    condition: 'New',
    stock: ''
  });
  
  const [bookImage, setBookImage] = useState<string | null>(null);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBookImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Book Added Successfully",
      description: `${bookData.title} has been added to your inventory.`
    });
    setBookData({
      title: '',
      author: '',
      price: '',
      originalPrice: '',
      category: '',
      description: '',
      condition: 'New',
      stock: ''
    });
  };

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
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-400/30 via-blue-400/30 to-purple-400/30 rounded-full mb-4 shadow-lg">
            <h1 className="font-serif text-xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              📚 Add New Book
            </h1>
          </div>
          <p className="text-vintage-brown/70 text-sm max-w-md mx-auto">Add a new book to your store inventory</p>
        </div>

        <Card className="max-w-2xl mx-auto bg-gradient-to-br from-white via-blue-50/50 via-purple-50/50 to-emerald-50/50 shadow-2xl border-0 rounded-2xl overflow-hidden">
          <CardHeader className="relative bg-gradient-to-r from-emerald-50/50 via-blue-50/50 to-purple-50/50">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-300/20 via-blue-300/20 to-purple-300/20 rounded-bl-3xl"></div>
            <CardTitle className="flex items-center gap-2 relative z-10">
              <div className="p-2 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-xl shadow-md">
                <Plus className="h-4 w-4 text-emerald-600" />
              </div>
              <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">Book Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Book Image Upload */}
              <div className="mb-6">
                <Label htmlFor="bookImage">Book Cover Image</Label>
                <div className="mt-2 flex items-center gap-4">
                  <div className="w-32 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                    {bookImage ? (
                      <img src={bookImage} alt="Book cover" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <div className="text-center">
                        <Image className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-xs text-gray-500">Book Cover</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      id="bookImage"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Label htmlFor="bookImage" className="cursor-pointer">
                      <Button type="button" variant="outline" className="flex items-center gap-2" asChild>
                        <span>
                          <Upload className="h-4 w-4" />
                          Upload Cover
                        </span>
                      </Button>
                    </Label>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Book Title</Label>
                  <Input 
                    id="title"
                    value={bookData.title}
                    onChange={(e) => setBookData({...bookData, title: e.target.value})}
                    placeholder="Enter book title"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input 
                    id="author"
                    value={bookData.author}
                    onChange={(e) => setBookData({...bookData, author: e.target.value})}
                    placeholder="Enter author name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Selling Price (₹)</Label>
                  <Input 
                    id="price"
                    type="number"
                    value={bookData.price}
                    onChange={(e) => setBookData({...bookData, price: e.target.value})}
                    placeholder="450"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="originalPrice">Original Price (₹)</Label>
                  <Input 
                    id="originalPrice"
                    type="number"
                    value={bookData.originalPrice}
                    onChange={(e) => setBookData({...bookData, originalPrice: e.target.value})}
                    placeholder="600"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select 
                    id="category"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={bookData.category}
                    onChange={(e) => setBookData({...bookData, category: e.target.value})}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Bengali Literature">Bengali Literature</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Academic">Academic</option>
                    <option value="Poetry">Poetry</option>
                    <option value="Philosophy">Philosophy</option>
                    <option value="Children's Books">Children's Books</option>
                    <option value="Rare Books">Rare Books</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input 
                    id="stock"
                    type="number"
                    value={bookData.stock}
                    onChange={(e) => setBookData({...bookData, stock: e.target.value})}
                    placeholder="25"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  value={bookData.description}
                  onChange={(e) => setBookData({...bookData, description: e.target.value})}
                  placeholder="Enter book description"
                  rows={4}
                  required
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 hover:from-emerald-600 hover:via-blue-600 hover:to-purple-600 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Book to Inventory
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default AddBook;