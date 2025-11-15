import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, Mail, Phone, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const StoreCustomers = () => {
  const customers = [
    { 
      id: 1, 
      name: 'রহিম উদ্দিন', 
      email: 'customer@example.com', 
      phone: '+880 1234567890',
      orders: 5, 
      totalSpent: '₹2,340',
      lastOrder: '2024-01-15',
      status: 'Regular'
    },
    { 
      id: 2, 
      name: 'সুমিত্রা দেবী', 
      email: 'sumitra@gmail.com', 
      phone: '+880 1987654321',
      orders: 3, 
      totalSpent: '₹1,560',
      lastOrder: '2024-01-10',
      status: 'New'
    },
    { 
      id: 3, 
      name: 'অনিল কুমার', 
      email: 'anil.kumar@yahoo.com', 
      phone: '+880 1122334455',
      orders: 8, 
      totalSpent: '₹4,200',
      lastOrder: '2024-01-18',
      status: 'VIP'
    },
    { 
      id: 4, 
      name: 'প্রিয়া চক্রবর্তী', 
      email: 'priya.c@hotmail.com', 
      phone: '+880 1555666777',
      orders: 2, 
      totalSpent: '₹890',
      lastOrder: '2024-01-05',
      status: 'New'
    },
    { 
      id: 5, 
      name: 'মোহাম্মদ আলী', 
      email: 'mohammad.ali@gmail.com', 
      phone: '+880 1777888999',
      orders: 12, 
      totalSpent: '₹6,750',
      lastOrder: '2024-01-20',
      status: 'VIP'
    },
    { 
      id: 6, 
      name: 'রীতা সেন', 
      email: 'rita.sen@outlook.com', 
      phone: '+880 1333444555',
      orders: 4, 
      totalSpent: '₹1,980',
      lastOrder: '2024-01-12',
      status: 'Regular'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VIP': return 'bg-purple-500';
      case 'Regular': return 'bg-blue-500';
      case 'New': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const totalCustomers = customers.length;
  const vipCustomers = customers.filter(c => c.status === 'VIP').length;
  const regularCustomers = customers.filter(c => c.status === 'Regular').length;
  const newCustomers = customers.filter(c => c.status === 'New').length;

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
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-400/30 via-blue-400/30 to-purple-400/30 rounded-full mb-4 shadow-lg">
            <h1 className="font-serif text-xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              👥 Customer Management ({totalCustomers} Customers)
            </h1>
          </div>
          <p className="text-vintage-brown/70 text-sm max-w-md mx-auto">Manage your customer relationships and data</p>
        </div>

        {/* Customer Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
          <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl">
            <CardContent className="p-3 text-center">
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl mx-auto mb-2 w-fit">
                <Users className="h-5 w-5 text-white" />
              </div>
              <p className="text-lg font-bold text-cyan-600">{totalCustomers}</p>
              <p className="text-xs text-cyan-700">Total Customers</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl">
            <CardContent className="p-3 text-center">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mx-auto mb-2 w-fit">
                <Users className="h-5 w-5 text-white" />
              </div>
              <p className="text-lg font-bold text-purple-600">{vipCustomers}</p>
              <p className="text-xs text-purple-700">VIP Customers</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl">
            <CardContent className="p-3 text-center">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl mx-auto mb-2 w-fit">
                <Users className="h-5 w-5 text-white" />
              </div>
              <p className="text-lg font-bold text-blue-600">{regularCustomers}</p>
              <p className="text-xs text-blue-700">Regular Customers</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl">
            <CardContent className="p-3 text-center">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mx-auto mb-2 w-fit">
                <Users className="h-5 w-5 text-white" />
              </div>
              <p className="text-lg font-bold text-green-600">{newCustomers}</p>
              <p className="text-xs text-green-700">New Customers</p>
            </CardContent>
          </Card>
        </div>

        {/* Customer List */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {customers.map((customer) => (
            <Card key={customer.id} className="bg-gradient-to-br from-white via-cyan-50/20 via-blue-50/20 to-purple-50/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl overflow-hidden group">
              <CardContent className="p-4 relative">
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-cyan-300/20 via-blue-300/20 to-purple-300/20 rounded-bl-2xl"></div>
                <div className="flex justify-between items-start mb-2 relative z-10">
                  <h3 className="font-semibold text-vintage-brown text-sm">{customer.name}</h3>
                  <Badge className={`${getStatusColor(customer.status)} text-white text-xs px-2 py-1 rounded-full`}>
                    {customer.status}
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-3 relative z-10">
                  <div className="p-2 bg-gradient-to-r from-cyan-50/50 to-blue-50/50 rounded-lg">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3 text-cyan-600" />
                      <span className="truncate text-xs text-gray-600">{customer.email}</span>
                    </div>
                  </div>
                  <div className="p-2 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-lg">
                    <div className="flex items-center gap-1">
                      <ShoppingBag className="h-3 w-3 text-blue-600" />
                      <span className="text-xs text-gray-600">{customer.orders} orders • {customer.totalSpent}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-1 relative z-10">
                  <Button size="sm" variant="outline" className="flex-1 text-xs h-7">
                    <span className="hidden sm:inline">View</span>
                    <span className="sm:hidden">👁️</span>
                  </Button>
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white text-xs h-7">
                    <span className="hidden sm:inline">Contact</span>
                    <span className="sm:hidden">📞</span>
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

export default StoreCustomers;