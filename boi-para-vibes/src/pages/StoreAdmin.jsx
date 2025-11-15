import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Package, TrendingUp, Plus, Edit, Users, Bell, Check, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useOrder } from '@/contexts/OrderContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

const StoreAdmin = () => {
  const { user } = useAuth();
  const { state: orderState, updateOrderStatus } = useOrder();
  const navigate = useNavigate();
  const [showOrders, setShowOrders] = useState(false);
  const [showAddBook, setShowAddBook] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showCustomers, setShowCustomers] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '', price: '', category: '', description: '' });

  if (!user || user.role !== 'store_admin') {
    return <div>Access denied. Store Admin only.</div>;
  }

  // Get orders for books from this store (simplified - in real app would filter by store)
  const storeOrders = orderState.orders.filter(order => 
    order.status === 'confirmed' || order.status === 'pending'
  );

  const handleAcceptOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'shipped');
    toast({
      title: "Order Accepted",
      description: "Order has been accepted and marked as shipped."
    });
  };

  const handleRejectOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'cancelled');
    toast({
      title: "Order Rejected",
      description: "Order has been cancelled."
    });
  };

  const handleAction = (action: string) => {
    toast({
      title: "Feature Coming Soon",
      description: `${action} functionality will be available soon.`
    });
  };

  const stats = [
    { title: 'My Books', value: '234', icon: BookOpen, color: 'bg-blue-500' },
    { title: 'Pending Orders', value: storeOrders.length.toString(), icon: Bell, color: 'bg-red-500' },
    { title: 'Total Sales', value: '₹45,670', icon: TrendingUp, color: 'bg-purple-500' },
    { title: 'Customers', value: '89', icon: Users, color: 'bg-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-vintage-sepia/5 via-vintage-cream/10 to-vintage-brown/5">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-vintage-gold/20 to-vintage-brown/20 rounded-full mb-3">
            <h1 className="font-serif text-xl md:text-2xl font-bold text-vintage-brown">
              Store Management
            </h1>
          </div>
          <p className="text-vintage-brown/70 text-sm max-w-2xl mx-auto">Manage your bookstore inventory, orders, and business operations from one central dashboard</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl overflow-hidden group">
                <CardContent className="p-4 relative">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-vintage-gold/10 to-transparent rounded-bl-2xl"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-xs text-vintage-brown/60 font-medium">{stat.title}</p>
                      <p className="text-lg font-bold text-vintage-brown mt-1 group-hover:scale-105 transition-transform">{stat.value}</p>
                    </div>
                    <div className={`p-2 rounded-xl ${stat.color} text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Order Notifications */}
        {storeOrders.length > 0 && (
          <Card className="mb-6 bg-red-50 border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <Bell className="h-5 w-5" />
                New Orders ({storeOrders.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => setShowOrders(!showOrders)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {showOrders ? 'Hide Orders' : 'View Orders'}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Orders List */}
        {showOrders && (
          <div className="mb-6 space-y-4">
            {storeOrders.map((order) => (
              <Card key={order.id} className="bg-white border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id.slice(-6)}</CardTitle>
                      <p className="text-sm text-gray-600">{new Date(order.orderDate).toLocaleDateString()}</p>
                    </div>
                    <Badge variant={order.status === 'confirmed' ? 'default' : 'secondary'}>
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.title} x{item.quantity}</span>
                        <span>₹{parseInt(item.price.replace('₹', '')) * item.quantity}</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 font-semibold">
                      Total: ₹{order.total}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleAcceptOrder(order.id)}
                      className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
                      size="sm"
                    >
                      <Check className="h-4 w-4" />
                      Accept
                    </Button>
                    <Button 
                      onClick={() => handleRejectOrder(order.id)}
                      variant="destructive"
                      className="flex items-center gap-1"
                      size="sm"
                    >
                      <X className="h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Management Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white/95 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 rounded-2xl overflow-hidden group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2 text-vintage-brown text-sm">
                <div className="p-2 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                  <Plus className="h-4 w-4 text-green-600" />
                </div>
                Add New Book
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-vintage-brown/70 mb-4 leading-relaxed text-xs">Add books to your store inventory and expand your collection</p>
              <Button 
                onClick={() => navigate('/add-book')}
                className="w-full bg-gradient-to-r from-vintage-brown to-vintage-burgundy hover:from-vintage-burgundy hover:to-vintage-brown text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Book
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 rounded-2xl overflow-hidden group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2 text-vintage-brown text-sm">
                <div className="p-2 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                </div>
                My Inventory
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-vintage-brown/70 mb-4 leading-relaxed text-xs">Manage your book collection and stock levels</p>
              <Button 
                onClick={() => navigate('/store-inventory')}
                className="w-full bg-gradient-to-r from-vintage-brown to-vintage-burgundy hover:from-vintage-burgundy hover:to-vintage-brown text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                View Books
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 rounded-2xl overflow-hidden group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2 text-vintage-brown text-sm">
                <div className="p-2 bg-orange-100 rounded-xl group-hover:bg-orange-200 transition-colors">
                  <Package className="h-4 w-4 text-orange-600" />
                </div>
                Orders
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-vintage-brown/70 mb-4 leading-relaxed text-xs">Track and manage customer orders efficiently</p>
              <Button 
                onClick={() => navigate('/store-orders')}
                className="w-full bg-gradient-to-r from-vintage-brown to-vintage-burgundy hover:from-vintage-burgundy hover:to-vintage-brown text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Package className="h-4 w-4 mr-2" />
                View All Orders ({orderState.orders.length})
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 rounded-2xl overflow-hidden group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2 text-vintage-brown text-sm">
                <div className="p-2 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
                  <Edit className="h-4 w-4 text-purple-600" />
                </div>
                Store Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-vintage-brown/70 mb-4 leading-relaxed text-xs">Update store information and details</p>
              <Button 
                onClick={() => navigate('/store-profile')}
                className="w-full bg-gradient-to-r from-vintage-brown to-vintage-burgundy hover:from-vintage-burgundy hover:to-vintage-brown text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Store
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 rounded-2xl overflow-hidden group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2 text-vintage-brown text-sm">
                <div className="p-2 bg-emerald-100 rounded-xl group-hover:bg-emerald-200 transition-colors">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                </div>
                Sales Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-vintage-brown/70 mb-4 leading-relaxed text-xs">View your store performance</p>
              <Button 
                onClick={() => navigate('/sales-analytics')}
                className="w-full bg-gradient-to-r from-vintage-brown to-vintage-burgundy hover:from-vintage-burgundy hover:to-vintage-brown text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 rounded-2xl overflow-hidden group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2 text-vintage-brown text-sm">
                <div className="p-2 bg-cyan-100 rounded-xl group-hover:bg-cyan-200 transition-colors">
                  <Users className="h-4 w-4 text-cyan-600" />
                </div>
                Customers
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-vintage-brown/70 mb-4 leading-relaxed text-xs">View your customer base (89 customers)</p>
              <Button 
                onClick={() => navigate('/store-customers')}
                className="w-full bg-gradient-to-r from-vintage-brown to-vintage-burgundy hover:from-vintage-burgundy hover:to-vintage-brown text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Users className="h-4 w-4 mr-2" />
                View Customers
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Add New Book Section */}
        {showAddBook && (
          <Card className="mt-6 bg-white border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle>Add New Book</CardTitle>
              <Button onClick={() => setShowAddBook(false)} className="ml-auto" variant="outline" size="sm">Close</Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  placeholder="Book Title" 
                  className="p-2 border rounded" 
                  value={newBook.title}
                  onChange={(e) => setNewBook({...newBook, title: e.target.value})}
                />
                <input 
                  placeholder="Author" 
                  className="p-2 border rounded" 
                  value={newBook.author}
                  onChange={(e) => setNewBook({...newBook, author: e.target.value})}
                />
                <input 
                  placeholder="Price (₹)" 
                  className="p-2 border rounded" 
                  value={newBook.price}
                  onChange={(e) => setNewBook({...newBook, price: e.target.value})}
                />
                <select 
                  className="p-2 border rounded" 
                  value={newBook.category}
                  onChange={(e) => setNewBook({...newBook, category: e.target.value})}
                >
                  <option value="">Select Category</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Bengali Literature">Bengali Literature</option>
                  <option value="Academic">Academic</option>
                  <option value="Poetry">Poetry</option>
                </select>
                <textarea 
                  placeholder="Description" 
                  className="p-2 border rounded md:col-span-2" 
                  value={newBook.description}
                  onChange={(e) => setNewBook({...newBook, description: e.target.value})}
                />
              </div>
              <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">
                Add Book to Inventory
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Inventory Section */}
        {showInventory && (
          <Card className="mt-6 bg-white border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle>My Inventory (234 Books)</CardTitle>
              <Button onClick={() => setShowInventory(false)} className="ml-auto" variant="outline" size="sm">Close</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['গীতাঞ্জলি', 'To Kill a Mockingbird', 'Introduction to Algorithms', 'The Republic'].map((book, i) => (
                  <div key={i} className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <h4 className="font-medium">{book}</h4>
                      <p className="text-sm text-gray-600">Stock: {Math.floor(Math.random() * 50) + 10}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="destructive">Delete</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Store Profile Section */}
        {showProfile && (
          <Card className="mt-6 bg-white border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle>Store Profile</CardTitle>
              <Button onClick={() => setShowProfile(false)} className="ml-auto" variant="outline" size="sm">Close</Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Store Name" className="p-2 border rounded" defaultValue="রবীন্দ্র পুস্তক ভবন" />
                <input placeholder="Owner Name" className="p-2 border rounded" defaultValue="অমিত চক্রবর্তী" />
                <input placeholder="Shop Number" className="p-2 border rounded" defaultValue="15A" />
                <input placeholder="Lane" className="p-2 border rounded" defaultValue="College Street" />
                <input placeholder="Contact" className="p-2 border rounded" defaultValue="+91 98765 43210" />
                <input placeholder="Email" className="p-2 border rounded" defaultValue="rabindra.books@gmail.com" />
                <textarea placeholder="Description" className="p-2 border rounded md:col-span-2" defaultValue="রবীন্দ্রনাথের সম্পূর্ণ রচনাবলী এবং বাংলা সাহিত্যের বিশাল সংগ্রহ" />
              </div>
              <Button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white">
                Update Profile
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Sales Analytics Section */}
        {showAnalytics && (
          <Card className="mt-6 bg-white border-l-4 border-l-orange-500">
            <CardHeader>
              <CardTitle>Sales Analytics</CardTitle>
              <Button onClick={() => setShowAnalytics(false)} className="ml-auto" variant="outline" size="sm">Close</Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-green-50 rounded">
                  <h3 className="font-semibold text-green-700">Today's Sales</h3>
                  <p className="text-2xl font-bold text-green-600">₹2,340</p>
                </div>
                <div className="p-4 bg-blue-50 rounded">
                  <h3 className="font-semibold text-blue-700">This Month</h3>
                  <p className="text-2xl font-bold text-blue-600">₹45,670</p>
                </div>
                <div className="p-4 bg-purple-50 rounded">
                  <h3 className="font-semibold text-purple-700">Total Revenue</h3>
                  <p className="text-2xl font-bold text-purple-600">₹2,34,560</p>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">Top Selling Books</h4>
                {['গীতাঞ্জলি - 45 sold', 'পথের পাঁচালী - 32 sold', 'চোখের বালি - 28 sold'].map((item, i) => (
                  <div key={i} className="flex justify-between p-2 bg-gray-50 rounded">
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Customers Section */}
        {showCustomers && (
          <Card className="mt-6 bg-white border-l-4 border-l-indigo-500">
            <CardHeader>
              <CardTitle>Customer Details (89 Total Customers)</CardTitle>
              <Button onClick={() => setShowCustomers(false)} className="ml-auto" variant="outline" size="sm">Close</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'রহিম উদ্দিন', email: 'customer@example.com', orders: 5, spent: '₹2,340' },
                  { name: 'সুমিত্রা দেবী', email: 'sumitra@gmail.com', orders: 3, spent: '₹1,560' },
                  { name: 'অনিল কুমার', email: 'anil.kumar@yahoo.com', orders: 8, spent: '₹4,200' },
                  { name: 'প্রিয়া চক্রবর্তী', email: 'priya.c@hotmail.com', orders: 2, spent: '₹890' }
                ].map((customer, i) => (
                  <div key={i} className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <h4 className="font-medium">{customer.name}</h4>
                      <p className="text-sm text-gray-600">{customer.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{customer.spent}</p>
                      <p className="text-sm text-gray-600">{customer.orders} orders</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default StoreAdmin;