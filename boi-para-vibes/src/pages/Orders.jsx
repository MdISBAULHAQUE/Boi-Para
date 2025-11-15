import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Calendar, CreditCard, MapPin, ShoppingBag, X, Truck, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useOrder } from '@/contexts/OrderContext';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Orders = () => {
  const { user } = useAuth();
  const { state, cancelOrder } = useOrder();

  if (!user) {
    return <div>Please login to view orders</div>;
  }

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

  const getTrackingSteps = (status: string) => {
    const steps = [
      { label: 'Order Confirmed', status: 'confirmed', icon: CheckCircle },
      { label: 'Shipped', status: 'shipped', icon: Truck },
      { label: 'Delivered', status: 'delivered', icon: Package }
    ];
    
    const statusOrder = ['confirmed', 'shipped', 'delivered'];
    const currentIndex = statusOrder.indexOf(status);
    
    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex
    }));
  };

  const canCancelOrder = (status: string) => {
    return status === 'pending' || status === 'confirmed';
  };

  const handleCancelOrder = (orderId: string) => {
    if (confirm('Are you sure you want to cancel this order?')) {
      cancelOrder(orderId);
    }
  };

  if (state.orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-vintage-sepia/10 via-vintage-cream/20 to-vintage-brown/5">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground" />
            <h1 className="text-3xl font-bold text-vintage-brown">No orders yet</h1>
            <p className="text-lg text-muted-foreground">
              Start shopping to see your purchase history here
            </p>
            <Link to="/books">
              <Button className="bg-vintage-brown hover:bg-vintage-burgundy">
                Browse Books
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-vintage-sepia/10 via-vintage-cream/20 to-vintage-brown/5">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-vintage-gold/20 to-vintage-brown/20 rounded-full mb-4">
              <h1 className="font-serif text-2xl font-bold text-vintage-brown">
                📚 Purchase History
              </h1>
            </div>
            <p className="text-vintage-brown/70 text-sm max-w-md mx-auto">Track your book orders and delivery status</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {state.orders.map((order) => (
              <Card key={order.id} className="bg-gradient-to-br from-white via-vintage-cream/10 to-vintage-sepia/5 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-2xl overflow-hidden">
                <CardContent className="p-5 relative">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-vintage-gold/10 to-transparent rounded-bl-3xl"></div>
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                      <h3 className="font-semibold text-vintage-brown text-sm">Order #{order.id.slice(-6)}</h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-vintage-brown/70">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(order.orderDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <CreditCard className="h-3 w-3" />
                          ₹{order.total}
                        </div>
                      </div>
                      {order.expectedDeliveryDate && (
                        <div className="flex items-center gap-1 mt-1 text-xs text-green-600">
                          <Calendar className="h-3 w-3" />
                          Expected: {new Date(order.expectedDeliveryDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`${getStatusColor(order.status)} text-white text-xs`}>
                        {order.status.toUpperCase()}
                      </Badge>
                      {canCancelOrder(order.status) && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCancelOrder(order.id)}
                          className="text-red-600 border-red-200 hover:bg-red-50 h-6 text-xs"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-2 relative z-10">
                      {order.items.slice(0, 2).map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gradient-to-r from-vintage-cream/30 to-vintage-sepia/10 rounded-xl border border-vintage-gold/20">
                          <div>
                            <h4 className="font-semibold text-vintage-brown text-sm">{item.title}</h4>
                            <p className="text-xs text-vintage-brown/60">by {item.author}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-vintage-brown text-sm">{item.price}</p>
                            <p className="text-xs text-vintage-brown/60">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <div className="text-center py-2">
                          <span className="text-xs text-vintage-brown/60 bg-vintage-cream/40 px-3 py-1 rounded-full">+{order.items.length - 2} more items</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Order Tracking */}
                    {order.status !== 'cancelled' && (
                      <div className="border-t border-vintage-gold/20 pt-4 relative z-10">
                        <h4 className="font-semibold text-vintage-brown mb-3 text-sm flex items-center gap-2">
                          <div className="w-2 h-2 bg-vintage-brown rounded-full"></div>
                          Order Tracking
                        </h4>
                        <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-vintage-cream/20 to-vintage-sepia/10 p-3 rounded-xl">
                          {getTrackingSteps(order.status).map((step, index) => {
                            const Icon = step.icon;
                            return (
                              <div key={step.status} className="flex flex-col items-center flex-1">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
                                  step.completed ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white scale-110' : 
                                  step.active ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white scale-105' : 'bg-gray-200 text-gray-400'
                                }`}>
                                  <Icon className="h-3 w-3" />
                                </div>
                                <p className={`text-xs mt-2 text-center font-medium ${
                                  step.completed ? 'text-green-600' : 
                                  step.active ? 'text-blue-600' : 'text-gray-400'
                                }`}>
                                  {step.label}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                        
                        {/* Delivery Address */}
                        <div className="p-3 bg-gradient-to-r from-vintage-cream/30 to-vintage-sepia/10 rounded-xl border border-vintage-gold/20 text-xs">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="p-1 bg-vintage-brown/10 rounded-full">
                              <MapPin className="h-3 w-3 text-vintage-brown" />
                            </div>
                            <span className="font-semibold text-vintage-brown">Delivery Address</span>
                          </div>
                          <p className="text-vintage-brown/70 ml-6">
                            {order.deliveryAddress.firstName} {order.deliveryAddress.lastName}, {order.deliveryAddress.city}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>


        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Orders;