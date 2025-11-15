import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingUp, Users, Store, BookOpen, Package, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AdminAnalytics = () => {
  const platformStats = [
    { title: 'Total Revenue', value: '₹12,45,670', icon: DollarSign, color: 'bg-green-500', change: '+12.5%' },
    { title: 'Total Users', value: '1,234', icon: Users, color: 'bg-blue-500', change: '+8.2%' },
    { title: 'Active Stores', value: '56', icon: Store, color: 'bg-purple-500', change: '+5.1%' },
    { title: 'Books Sold', value: '8,945', icon: BookOpen, color: 'bg-orange-500', change: '+15.3%' },
    { title: 'Total Orders', value: '2,156', icon: Package, color: 'bg-red-500', change: '+9.8%' },
    { title: 'Growth Rate', value: '23.4%', icon: TrendingUp, color: 'bg-indigo-500', change: '+2.1%' }
  ];

  const topStores = [
    { name: 'রবীন্দ্র পুস্তক ভবন', sales: '₹2,34,560', orders: 156 },
    { name: 'Academic Corner', sales: '₹1,89,340', orders: 134 },
    { name: 'দেশ বিদেশের বই', sales: '₹1,67,890', orders: 98 },
    { name: 'Rare Books Emporium', sales: '₹1,45,230', orders: 87 },
    { name: 'Philosophy & Wisdom', sales: '₹1,23,450', orders: 76 }
  ];

  const monthlyData = [
    { month: 'Jan', revenue: 89000, orders: 145 },
    { month: 'Feb', revenue: 95000, orders: 167 },
    { month: 'Mar', revenue: 112000, orders: 189 },
    { month: 'Apr', revenue: 98000, orders: 156 },
    { month: 'May', revenue: 125000, orders: 203 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-vintage-sepia/10 via-vintage-cream/20 to-vintage-brown/5">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/admin" className="inline-flex items-center gap-2 text-vintage-brown hover:text-vintage-burgundy transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
        
        <div className="text-center mb-10">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-vintage-brown/20 rounded-full mb-4">
            <h1 className="font-serif text-xl font-bold text-vintage-brown">
              📊 Platform Analytics
            </h1>
          </div>
          <p className="text-vintage-brown/70 text-sm max-w-md mx-auto">Comprehensive platform statistics and insights</p>
        </div>

        {/* Platform Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {platformStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="bg-gradient-to-br from-white via-vintage-cream/10 to-vintage-sepia/5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl overflow-hidden group">
                <CardContent className="p-4 relative">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-vintage-gold/10 to-transparent rounded-bl-2xl"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-xs text-gray-600 font-medium">{stat.title}</p>
                      <p className="text-lg font-bold text-vintage-brown group-hover:scale-105 transition-transform">{stat.value}</p>
                      <p className="text-xs text-green-600 font-medium">{stat.change}</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Performing Stores */}
          <Card className="bg-gradient-to-br from-white via-vintage-cream/10 to-vintage-sepia/5 shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-vintage-brown text-sm">
                <div className="p-2 bg-green-100 rounded-xl">
                  <Store className="h-4 w-4 text-green-600" />
                </div>
                Top Performing Stores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topStores.map((store, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <h4 className="font-medium">{store.name}</h4>
                      <p className="text-sm text-gray-600">{store.orders} orders</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-vintage-brown">{store.sales}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Performance */}
          <Card className="bg-gradient-to-br from-white via-vintage-cream/10 to-vintage-sepia/5 shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-vintage-brown text-sm">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
                Monthly Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((data, index) => (
                  <div key={data.month} className="flex justify-between items-center">
                    <span className="font-medium">{data.month} 2024</span>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">₹{data.revenue.toLocaleString()}</p>
                        <p className="text-xs text-gray-600">{data.orders} orders</p>
                      </div>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-vintage-brown h-2 rounded-full" 
                          style={{ width: `${(data.revenue / 125000) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="bg-gradient-to-br from-white via-vintage-cream/10 to-vintage-sepia/5 shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-xl">
            <CardHeader>
              <CardTitle className="text-vintage-brown text-sm">User Demographics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Customers</span>
                  <span className="font-semibold">1,156 (93.7%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Store Admins</span>
                  <span className="font-semibold">76 (6.2%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Super Admins</span>
                  <span className="font-semibold">2 (0.1%)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white via-vintage-cream/10 to-vintage-sepia/5 shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-xl">
            <CardHeader>
              <CardTitle className="text-vintage-brown text-sm">Popular Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Bengali Literature</span>
                  <span className="font-semibold">34.2%</span>
                </div>
                <div className="flex justify-between">
                  <span>Academic</span>
                  <span className="font-semibold">28.7%</span>
                </div>
                <div className="flex justify-between">
                  <span>Fiction</span>
                  <span className="font-semibold">19.5%</span>
                </div>
                <div className="flex justify-between">
                  <span>Poetry</span>
                  <span className="font-semibold">17.6%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminAnalytics;