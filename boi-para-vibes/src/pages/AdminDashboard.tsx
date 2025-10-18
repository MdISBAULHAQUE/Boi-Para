import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Store, BookOpen, Package, TrendingUp, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user || user.role !== 'super_admin') {
    return <div>Access denied. Super Admin only.</div>;
  }

  const handleAction = (action: string) => {
    toast({
      title: "Feature Coming Soon",
      description: `${action} functionality will be available soon.`
    });
  };

  const stats = [
    { title: 'Total Users', value: '1,234', icon: Users, color: 'bg-blue-500' },
    { title: 'Active Stores', value: '56', icon: Store, color: 'bg-green-500' },
    { title: 'Total Books', value: '12,456', icon: BookOpen, color: 'bg-purple-500' },
    { title: 'Orders Today', value: '89', icon: Package, color: 'bg-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-vintage-sepia/10 via-vintage-cream/20 to-vintage-brown/5">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-red-500/20 to-vintage-brown/20 rounded-full mb-4">
            <h1 className="font-serif text-2xl font-bold text-vintage-brown">
              🛡️ Super Admin Dashboard
            </h1>
          </div>
          <p className="text-vintage-brown/70 text-sm max-w-2xl mx-auto">Manage the entire Boi Para platform with comprehensive administrative controls</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="bg-gradient-to-br from-white via-vintage-cream/10 to-vintage-sepia/5 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl overflow-hidden group">
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

        {/* Management Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-white via-vintage-cream/10 to-vintage-sepia/5 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 rounded-2xl overflow-hidden group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2 text-vintage-brown text-sm">
                <div className="p-2 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-vintage-brown/70 mb-4 leading-relaxed text-xs">Manage all users, roles, and permissions</p>
              <Button 
                onClick={() => navigate('/user-management')}
                className="w-full bg-gradient-to-r from-vintage-brown to-vintage-burgundy hover:from-vintage-burgundy hover:to-vintage-brown text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Users className="h-4 w-4 mr-2" />
                Manage Users
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white via-vintage-cream/10 to-vintage-sepia/5 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 rounded-2xl overflow-hidden group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2 text-vintage-brown text-sm">
                <div className="p-2 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                  <Store className="h-4 w-4 text-green-600" />
                </div>
                Store Management
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-vintage-brown/70 mb-4 leading-relaxed text-xs">Add, edit, and verify bookstores</p>
              <Button 
                onClick={() => navigate('/bookstores')}
                className="w-full bg-gradient-to-r from-vintage-brown to-vintage-burgundy hover:from-vintage-burgundy hover:to-vintage-brown text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Store className="h-4 w-4 mr-2" />
                Manage Stores
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white via-vintage-cream/10 to-vintage-sepia/5 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 rounded-2xl overflow-hidden group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2 text-vintage-brown text-sm">
                <div className="p-2 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
                  <BookOpen className="h-4 w-4 text-purple-600" />
                </div>
                Book Catalog
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-vintage-brown/70 mb-4 leading-relaxed text-xs">Oversee all books and categories</p>
              <Button 
                onClick={() => navigate('/books')}
                className="w-full bg-gradient-to-r from-vintage-brown to-vintage-burgundy hover:from-vintage-burgundy hover:to-vintage-brown text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Manage Books
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white via-vintage-cream/10 to-vintage-sepia/5 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 rounded-2xl overflow-hidden group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2 text-vintage-brown text-sm">
                <div className="p-2 bg-orange-100 rounded-xl group-hover:bg-orange-200 transition-colors">
                  <Package className="h-4 w-4 text-orange-600" />
                </div>
                Order Management
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-vintage-brown/70 mb-4 leading-relaxed text-xs">Monitor all orders and transactions</p>
              <Button 
                onClick={() => navigate('/admin-orders')}
                className="w-full bg-gradient-to-r from-vintage-brown to-vintage-burgundy hover:from-vintage-burgundy hover:to-vintage-brown text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Package className="h-4 w-4 mr-2" />
                View Orders
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white via-vintage-cream/10 to-vintage-sepia/5 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 rounded-2xl overflow-hidden group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2 text-vintage-brown text-sm">
                <div className="p-2 bg-emerald-100 rounded-xl group-hover:bg-emerald-200 transition-colors">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                </div>
                Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-vintage-brown/70 mb-4 leading-relaxed text-xs">View platform statistics and reports</p>
              <Button 
                onClick={() => navigate('/admin-analytics')}
                className="w-full bg-gradient-to-r from-vintage-brown to-vintage-burgundy hover:from-vintage-burgundy hover:to-vintage-brown text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white via-vintage-cream/10 to-vintage-sepia/5 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 rounded-2xl overflow-hidden group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-slate-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2 text-vintage-brown text-sm">
                <div className="p-2 bg-gray-100 rounded-xl group-hover:bg-gray-200 transition-colors">
                  <Settings className="h-4 w-4 text-gray-600" />
                </div>
                System Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-vintage-brown/70 mb-4 leading-relaxed text-xs">Configure platform settings</p>
              <Button 
                onClick={() => navigate('/system-settings')}
                className="w-full bg-gradient-to-r from-vintage-brown to-vintage-burgundy hover:from-vintage-burgundy hover:to-vintage-brown text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;