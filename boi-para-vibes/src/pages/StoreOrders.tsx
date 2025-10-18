import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check, X } from 'lucide-react';
import { useOrder } from '@/contexts/OrderContext';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const StoreOrders = () => {
  const { state: orderState, updateOrderStatus } = useOrder();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-vintage-sepia/10 via-vintage-cream/20 to-vintage-brown/5">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/store-admin">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-vintage-brown">
            All Orders ({orderState.orders.length})
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {orderState.orders.map((order) => (
            <Card key={order.id} className="bg-white border-l-4 border-l-orange-500">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-sm">Order #{order.id.slice(-6)}</h3>
                    <p className="text-xs text-gray-600">{new Date(order.orderDate).toLocaleDateString()}</p>
                  </div>
                  <Badge variant={order.status === 'confirmed' ? 'default' : 'secondary'} className="text-xs">
                    {order.status}
                  </Badge>
                </div>
                
                <div className="space-y-1 mb-3">
                  {order.items.slice(0, 2).map((item) => (
                    <div key={item.id} className="flex justify-between text-xs">
                      <span className="truncate">{item.title} x{item.quantity}</span>
                      <span>₹{parseInt(item.price.replace('₹', '')) * item.quantity}</span>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <p className="text-xs text-gray-500">+{order.items.length - 2} more items</p>
                  )}
                  <div className="border-t pt-1 font-semibold text-sm">
                    Total: ₹{order.total}
                  </div>
                  {order.expectedDeliveryDate && (
                    <p className="text-xs text-green-600 mt-1">Expected: {new Date(order.expectedDeliveryDate).toLocaleDateString()}</p>
                  )}
                </div>
                
                <div className="flex gap-1 flex-wrap">
                  {(order.status === 'confirmed' || order.status === 'pending') && (
                    <>
                      <Button 
                        onClick={() => handleAcceptOrder(order.id)}
                        className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1 flex-1 text-xs h-7"
                        size="sm"
                      >
                        <Check className="h-3 w-3" />
                        Accept
                      </Button>
                      <Button 
                        onClick={() => handleRejectOrder(order.id)}
                        variant="destructive"
                        className="flex items-center gap-1 flex-1 text-xs h-7"
                        size="sm"
                      >
                        <X className="h-3 w-3" />
                        Reject
                      </Button>
                    </>
                  )}
                  {order.status === 'shipped' && (
                    <Button 
                      onClick={() => updateOrderStatus(order.id, 'confirmed')}
                      variant="outline"
                      className="text-xs h-7 w-full"
                      size="sm"
                    >
                      Revert to Confirmed
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

export default StoreOrders;