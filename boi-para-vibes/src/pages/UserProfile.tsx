import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Phone, Edit, Save } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const UserProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Guest User',
    email: user?.email || 'guest@example.com',
    phone: user?.phone || '+91 00000 00000',
    address: user?.address || 'Not provided'
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-vintage-cream/20 to-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-vintage-brown mb-8">My Profile</h1>
        
        <Card className="max-w-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-vintage-brown">Personal Information</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="border-vintage-gold text-vintage-brown"
            >
              {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
              {isEditing ? 'Save' : 'Edit'}
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-vintage-gold" />
              {isEditing ? (
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                />
              ) : (
                <span className="text-vintage-brown">{formData.name}</span>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-vintage-gold" />
              {isEditing ? (
                <Input
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                />
              ) : (
                <span className="text-vintage-brown">{formData.email}</span>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-vintage-gold" />
              {isEditing ? (
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                />
              ) : (
                <span className="text-vintage-brown">{formData.phone}</span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
