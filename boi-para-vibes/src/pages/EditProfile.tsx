import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Save, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const EditProfile = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  if (!user) {
    return <div>Please login to edit profile</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user in context
      const updatedUser = { ...user, ...formData };
      login(updatedUser, localStorage.getItem('token') || '');
      
      toast({
        title: "Success!",
        description: "Profile updated successfully"
      });
      
      navigate('/profile');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vintage-sepia/10 via-vintage-cream/20 to-vintage-brown/5">
      <Navbar />
      
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={() => navigate('/profile')}
            variant="ghost"
            className="mb-4 text-vintage-brown hover:bg-vintage-brown/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Button>

          <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
            <CardHeader className="text-center p-4 md:p-6">
              <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-vintage-brown to-vintage-burgundy rounded-full flex items-center justify-center mb-3 md:mb-4">
                <User className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
              <CardTitle className="font-serif text-xl md:text-2xl text-vintage-brown">
                Edit Profile
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6">
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <Label htmlFor="name" className="text-vintage-brown text-sm md:text-base">
                    Full Name
                  </Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-vintage-brown/60" />
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="pl-10 border-vintage-brown/30 focus:border-vintage-brown text-sm md:text-base py-2 md:py-3"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-vintage-brown text-sm md:text-base">
                    Email Address
                  </Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-vintage-brown/60" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="pl-10 border-vintage-brown/30 focus:border-vintage-brown text-sm md:text-base py-2 md:py-3"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
                  <Button
                    type="button"
                    onClick={() => navigate('/profile')}
                    variant="outline"
                    className="flex-1 border-vintage-brown text-vintage-brown hover:bg-vintage-brown hover:text-white text-sm md:text-base py-2 md:py-3"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-vintage-brown to-vintage-burgundy hover:from-vintage-burgundy hover:to-vintage-brown text-white text-sm md:text-base py-2 md:py-3 disabled:opacity-50"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default EditProfile;