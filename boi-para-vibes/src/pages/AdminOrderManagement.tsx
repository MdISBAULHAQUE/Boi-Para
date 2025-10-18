import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Package, Eye, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useOrder } from '@/contexts/OrderContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AdminOrderManagement = () => {
  const { state: orderState, updateOrderStatus } = useOrder();

  const handleUpdateStatus = (orderId: string, status: string) => {
    updateOrderStatus(orderId, status as any);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500';
      case 'shipped': return 'bg-blue-500';
      case 'confirmed': return 'bg-purple-500';
      case 'pending': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const orderStats = {
    total: orderState.orders.length,
    pending: orderState.orders.filter(o => o.status === 'pending').length,
    confirmed: orderState.orders.filter(o => o.status === 'confirmed').length,
    shipped: orderState.orders.filter(o => o.status === 'shipped').length,
    delivered: orderState.orders.filter(o => o.status === 'delivered').length,
    cancelled: orderState.orders.filter(o => o.status === 'cancelled').length
  };

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
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500/20 to-vintage-brown/20 rounded-full mb-4">
            <h1 className="font-serif text-xl font-bold text-vintage-brown">
              📦 Order Management ({orderStats.total} Orders)
            </h1>
          </div>
          <p className="text-vintage-brown/70 text-sm max-w-md mx-auto">Monitor and manage all customer orders</p>
        </div>

        {/* Order Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          <Card className="bg-gradient-to-br from-white via-vintage-cream/10 to-vintage-sepia/5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl">
            <CardContent className="p-3 text-center relative">
              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-vintage-gold/10 to-transparent rounded-bl-xl"></div>
              <p className="text-lg font-bold text-vintage-brown">{orderStats.total}</p>
              <p className="text-xs text-gray-600">Total Orders</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl">
            <CardContent className="p-3 text-center">
              <p className="text-lg font-bold text-yellow-600">{orderStats.pending}</p>
              <p className="text-xs text-gray-600">Pending</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl">
            <CardContent className="p-3 text-center">
              <p className="text-lg font-bold text-purple-600">{orderStats.confirmed}</p>
              <p className="text-xs text-gray-600">Confirmed</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl">
            <CardContent className="p-3 text-center">
              <p className="text-lg font-bold text-blue-600">{orderStats.shipped}</p>
              <p className="text-xs text-gray-600">Shipped</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl">
            <CardContent className="p-3 text-center">
              <p className="text-lg font-bold text-green-600">{orderStats.delivered}</p>
              <p className="text-xs text-gray-600">Delivered</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-50 to-red-100/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl">
            <CardContent className="p-3 text-center">
              <p className="text-lg font-bold text-red-600">{orderStats.cancelled}</p>
              <p className="text-xs text-gray-600">Cancelled</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {orderState.orders.map((order) => (
            <Card key={order.id} className="bg-gradient-to-br from-white via-vintage-cream/10 to-vintage-sepia/5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl overflow-hidden group">
              <CardContent className="p-4 relative">
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-vintage-gold/10 to-transparent rounded-bl-2xl"></div>
                
                <div className="flex justify-between items-start mb-3 relative z-10">
                  <div>
                    <h3 className="font-semibold text-vintage-brown text-sm">Order #{order.id.slice(-6)}</h3>
                    <p className="text-xs text-gray-500">{new Date(order.orderDate).toLocaleDateString()}</p>
                  </div>
                  <Badge className={`${getStatusColor(order.status)} text-white text-xs px-2 py-1 rounded-full`}>
                    {order.status}
                  </Badge>
                </div>
                <div className="space-y-2 mb-4 relative z-10">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-vintage-cream/30 rounded-lg">
                      <p className="text-xs text-gray-600"><strong>Items:</strong> {order.items.length}</p>
                    </div>
                    <div className="p-2 bg-vintage-cream/30 rounded-lg">
                      <p className="text-xs text-gray-600"><strong>Total:</strong> ₹{order.total}</p>
                    </div>
                  </div>
                  <div className="p-2 bg-vintage-cream/30 rounded-lg">
                    <p className="text-xs text-gray-600"><strong>Customer:</strong> {order.deliveryAddress.firstName} {order.deliveryAddress.lastName}</p>
                  </div>
                  {order.expectedDeliveryDate && (
                    <div className="p-2 bg-green-50 rounded-lg">
                      <p className="text-xs text-green-600"><strong>Expected:</strong> {new Date(order.expectedDeliveryDate).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-1 flex-wrap relative z-10">
                  <Button size="sm" variant="outline" className="text-xs h-6 flex-1">
                    <Eye className="h-3 w-3" />
                  </Button>
                  {order.status === 'pending' && (
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700 text-white text-xs h-6 flex-1"
                      onClick={() => handleUpdateStatus(order.id, 'confirmed')}
                    >
                      <Check className="h-3 w-3" />
                    </Button>
                  )}
                  {order.status === 'confirmed' && (
                    <Button 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-6 flex-1"
                      onClick={() => handleUpdateStatus(order.id, 'shipped')}
                    >
                      Ship
                    </Button>
                  )}
                  {order.status === 'shipped' && (
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700 text-white text-xs h-6 flex-1"
                      onClick={() => handleUpdateStatus(order.id, 'delivered')}
                    >
                      Deliver
                    </Button>
                  )}
                  {order.status === 'delivered' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-xs h-6 flex-1"
                      onClick={() => handleUpdateStatus(order.id, 'shipped')}
                    >
                      Undo
                    </Button>
                  )}
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

export default AdminOrderManagement;