import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingUp, DollarSign, ShoppingCart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SalesAnalytics = () => {
  const salesData = [
    { period: 'Today', amount: '₹2,340', orders: 12, color: 'bg-green-500' },
    { period: 'This Week', amount: '₹15,670', orders: 45, color: 'bg-blue-500' },
    { period: 'This Month', amount: '₹45,670', orders: 156, color: 'bg-purple-500' },
    { period: 'Total Revenue', amount: '₹2,34,560', orders: 890, color: 'bg-orange-500' }
  ];

  const topBooks = [
    { title: 'গীতাঞ্জলি', sold: 45, revenue: '₹20,250' },
    { title: 'পথের পাঁচালী', sold: 32, revenue: '₹12,160' },
    { title: 'চোখের বালি', sold: 28, revenue: '₹11,760' },
    { title: 'To Kill a Mockingbird', sold: 25, revenue: '₹11,250' },
    { title: 'Introduction to Algorithms', sold: 15, revenue: '₹18,000' }
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
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-amber-400/30 via-orange-400/30 to-red-400/30 rounded-full mb-4 shadow-lg">
            <h1 className="font-serif text-xl font-bold bg-gradient-to-r from-amber-700 via-orange-700 to-red-700 bg-clip-text text-transparent">
              📊 Sales Analytics
            </h1>
          </div>
          <p className="text-vintage-brown/70 text-sm max-w-md mx-auto">Track your store performance and sales insights</p>
        </div>

        {/* Revenue Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {salesData.map((data, index) => (
            <Card key={index} className="bg-gradient-to-br from-white via-amber-50/20 via-orange-50/20 to-red-50/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl overflow-hidden group">
              <CardContent className="p-4 relative">
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-amber-300/20 via-orange-300/20 to-red-300/20 rounded-bl-2xl"></div>
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <p className="text-xs text-gray-600 font-medium">{data.period}</p>
                    <p className="text-lg font-bold text-vintage-brown group-hover:scale-105 transition-transform">{data.amount}</p>
                    <p className="text-xs text-gray-500">{data.orders} orders</p>
                  </div>
                  <div className={`p-2 rounded-xl ${data.color} text-white shadow-md group-hover:scale-110 transition-transform`}>
                    <DollarSign className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Selling Books */}
          <Card className="bg-gradient-to-br from-white via-amber-50/20 to-orange-50/20 shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-vintage-brown">
                <div className="p-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl">
                  <TrendingUp className="h-4 w-4 text-amber-600" />
                </div>
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent font-semibold text-sm">Top Selling Books</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topBooks.map((book, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gradient-to-r from-amber-50/50 to-orange-50/50 rounded-xl border border-amber-200/30 hover:shadow-md transition-all duration-300">
                    <div>
                      <h4 className="font-semibold text-sm text-vintage-brown">{book.title}</h4>
                      <p className="text-xs text-amber-600">{book.sold} copies sold</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm text-amber-700">{book.revenue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Performance */}
          <Card className="bg-gradient-to-br from-white via-orange-50/20 to-red-50/20 shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-vintage-brown">
                <div className="p-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl">
                  <ShoppingCart className="h-4 w-4 text-orange-600" />
                </div>
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent font-semibold text-sm">Monthly Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['January', 'February', 'March', 'April', 'May'].map((month, index) => (
                  <div key={month} className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50/50 to-red-50/50 rounded-xl border border-orange-200/30">
                    <span className="font-medium text-sm text-vintage-brown">{month}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full" 
                          style={{ width: `${Math.random() * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-orange-700">₹{(Math.random() * 50000 + 10000).toFixed(0)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SalesAnalytics;