import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Heart, ShoppingBag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const UserDashboard = () => {
  const stats = [
    { label: 'Books Purchased', value: '24', icon: BookOpen },
    { label: 'Wishlist Items', value: '8', icon: Heart },
    { label: 'Total Orders', value: '12', icon: ShoppingBag }
  ];

  const recentOrders = [
    { id: 1, title: 'The Mahabharata', price: '₹899', status: 'Delivered' },
    { id: 2, title: 'Gitanjali', price: '₹299', status: 'Shipped' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-vintage-cream/20 to-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-vintage-brown mb-8">Dashboard</h1>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-vintage-brown/70">{stat.label}</p>
                    <p className="text-2xl font-bold text-vintage-brown">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-vintage-gold" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="text-vintage-brown">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-vintage-brown">{order.title}</p>
                    <p className="text-sm text-vintage-brown/70">{order.price}</p>
                  </div>
                  <Badge className="bg-vintage-gold/20 text-vintage-brown">
                    {order.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
