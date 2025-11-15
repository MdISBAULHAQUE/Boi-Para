import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CreditCard, Truck, ArrowLeft, Smartphone } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useOrder } from '@/contexts/OrderContext';
import { Link, useNavigate } from 'react-router-dom';
import { FadeInUp, SlideInLeft, SlideInRight, ScaleIn } from '@/components/AnimatedElements';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Checkout = () => {
  const { state, clearCart } = useCart();
  const { addOrder } = useOrder();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showUpiDialog, setShowUpiDialog] = useState(false);
  const [selectedUpi, setSelectedUpi] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    phone: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const upiOptions = [
    { id: 'paytm', name: 'Paytm', number: '9876543210@paytm' },
    { id: 'phonepe', name: 'PhonePe', number: '9876543210@ybl' },
    { id: 'gpay', name: 'Google Pay', number: '9876543210@okaxis' },
    { id: 'bhim', name: 'BHIM UPI', number: '9876543210@upi' }
  ];

  const calculateTotal = () => {
    return state.items.reduce((total, item) => {
      const price = parseInt(item.price.replace('₹', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = async () => {
    if (!validateForm()) {
      alert('Please fill in all required fields');
      return;
    }

    if (paymentMethod === 'online') {
      setShowUpiDialog(true);
      return;
    }

    processOrder();
  };

  const processOrder = () => {
    setIsProcessing(true);
    
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + (paymentMethod === 'online' ? 3 : 5));
    
    const orderData = {
      items: state.items,
      total: calculateTotal(),
      paymentMethod: paymentMethod as 'online' | 'cod',
      status: 'confirmed' as const,
      deliveryAddress: formData,
      expectedDeliveryDate: deliveryDate.toISOString()
    };
    
    setTimeout(() => {
      addOrder(orderData);
      clearCart();
      setIsProcessing(false);
      setShowUpiDialog(false);
      alert(`Order placed successfully with ${paymentMethod === 'online' ? 'Online Payment' : 'Cash on Delivery'}!`);
      navigate('/orders');
    }, 2000);
  };

  const handleUpiPayment = (upiId: string) => {
    setSelectedUpi(upiId);
    alert(`Payment initiated via ${upiOptions.find(u => u.id === upiId)?.name}`);
    processOrder();
  };

  if (state.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <Link to="/cart">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-vintage-brown">Checkout</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 animate-fadeInUp">
          {/* Payment Options */}
          <div className="space-y-4 sm:space-y-6 animate-slideInLeft">
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-lg sm:text-xl">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3 sm:space-y-4">
                  <div className="flex items-center space-x-3 p-3 sm:p-4 border rounded-lg hover:bg-vintage-gold/5 transition-colors">
                    <RadioGroupItem value="online" id="online" />
                    <Label htmlFor="online" className="flex items-center gap-2 sm:gap-3 cursor-pointer flex-1">
                      <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-vintage-brown" />
                      <div>
                        <div className="font-medium text-sm sm:text-base">Online Payment</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">Pay securely with card/UPI</div>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 sm:p-4 border rounded-lg hover:bg-vintage-gold/5 transition-colors">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex items-center gap-2 sm:gap-3 cursor-pointer flex-1">
                      <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-vintage-brown" />
                      <div>
                        <div className="font-medium text-sm sm:text-base">Cash on Delivery</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">Pay when you receive</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-lg sm:text-xl">Delivery Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm">First Name</Label>
                    <Input 
                      id="firstName" 
                      placeholder="John" 
                      className={`mt-1 ${errors.firstName ? 'border-red-500' : ''}`}
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      required
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm">Last Name</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Doe" 
                      className={`mt-1 ${errors.lastName ? 'border-red-500' : ''}`}
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      required
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="address" className="text-sm">Address</Label>
                  <Input 
                    id="address" 
                    placeholder="123 Main Street" 
                    className={`mt-1 ${errors.address ? 'border-red-500' : ''}`}
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    required
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <Label htmlFor="city" className="text-sm">City</Label>
                    <Input 
                      id="city" 
                      placeholder="Dhaka" 
                      className={`mt-1 ${errors.city ? 'border-red-500' : ''}`}
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      required
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm">Phone</Label>
                    <Input 
                      id="phone" 
                      placeholder="+880 1234567890" 
                      className={`mt-1 ${errors.phone ? 'border-red-500' : ''}`}
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="animate-slideInRight">
            <Card className="lg:sticky lg:top-4">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-lg sm:text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex gap-3 pb-3 border-b last:border-b-0 last:pb-0">
                      <div className="w-12 h-16 sm:w-16 sm:h-20 bg-vintage-sepia rounded flex-shrink-0">
                        <img src={item.cover} alt={item.title} className="w-full h-full object-cover rounded" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm sm:text-base truncate">{item.title}</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="font-semibold text-sm sm:text-base text-vintage-brown">
                          ₹{parseInt(item.price.replace('₹', '')) * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="space-y-2 pt-3 border-t">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span>Subtotal</span>
                      <span>₹{calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between font-semibold text-base sm:text-lg pt-2 border-t">
                      <span>Total</span>
                      <span className="text-vintage-brown">₹{calculateTotal()}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full mt-4 sm:mt-6 h-10 sm:h-12 text-sm sm:text-base bg-vintage-brown hover:bg-vintage-burgundy transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 btn-shimmer"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : paymentMethod === 'online' ? 'Pay Now' : 'Place Order (COD)'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* UPI Payment Dialog */}
      <Dialog open={showUpiDialog} onOpenChange={setShowUpiDialog}>
        <DialogContent className="sm:max-w-md animate-in zoom-in-95 duration-300">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 animate-in slide-in-from-top duration-500">
              <Smartphone className="h-5 w-5 animate-pulse" />
              Choose UPI Payment Method
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {upiOptions.map((upi, index) => (
              <div key={upi.id} className="animate-scaleIn" style={{ animationDelay: `${index * 100}ms` }}>
                <Button
                  variant="outline"
                  className="w-full justify-start p-4 h-auto transform transition-all duration-200 hover:scale-105 hover:shadow-md hover:bg-vintage-gold/10 btn-shimmer"
                  onClick={() => handleUpiPayment(upi.id)}
                >
                  <div className="text-left">
                    <div className="font-medium">{upi.name}</div>
                    <div className="text-sm text-muted-foreground">{upi.number}</div>
                  </div>
                </Button>
              </div>
            ))}
            <div className="animate-fadeInUp" style={{ animationDelay: '500ms' }}>
              <Button 
                variant="ghost" 
                className="w-full transform transition-all duration-200 hover:scale-105" 
                onClick={() => setShowUpiDialog(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Checkout;