import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Cart = () => {
  const { state, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return state.items.reduce((total, item) => {
      const price = parseInt(item.price.replace('₹', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground" />
            <h1 className="text-3xl font-bold text-vintage-brown">Your cart is empty</h1>
            <p className="text-lg text-muted-foreground">
              Discover amazing books and add them to your cart
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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-vintage-brown mb-4 sm:mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <Card key={item.id} className="p-3 sm:p-4">
                <CardContent className="p-0">
                  <div className="flex gap-3 sm:gap-4">
                    <div className="w-16 h-20 sm:w-20 sm:h-28 bg-vintage-sepia rounded flex-shrink-0">
                      <img
                        src={item.cover}
                        alt={item.title}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-vintage-brown text-sm sm:text-base truncate">{item.title}</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground truncate">by {item.author}</p>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {item.condition}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 p-1 sm:p-2 flex-shrink-0"
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-6 sm:w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="text-left sm:text-right">
                          <p className="font-semibold text-vintage-brown text-sm sm:text-base">
                            ₹{parseInt(item.price.replace('₹', '')) * item.quantity}
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {item.price} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-4 sm:p-6 lg:sticky lg:top-4">
              <h2 className="text-lg sm:text-xl font-semibold text-vintage-brown mb-3 sm:mb-4">Order Summary</h2>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-muted-foreground">Subtotal ({state.items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="font-medium">₹{calculateTotal()}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="border-t pt-2 sm:pt-3">
                  <div className="flex justify-between font-semibold text-base sm:text-lg">
                    <span>Total</span>
                    <span className="text-vintage-brown">₹{calculateTotal()}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                <Button 
                  onClick={() => navigate('/checkout')}
                  className="w-full h-10 sm:h-11 text-sm sm:text-base bg-vintage-brown hover:bg-vintage-burgundy transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Proceed to Checkout
                </Button>
                
                <Link to="/books" className="block">
                  <Button variant="outline" className="w-full h-9 sm:h-10 text-sm sm:text-base border-vintage-brown/30 text-vintage-brown hover:bg-vintage-gold/10 transition-all duration-300">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;