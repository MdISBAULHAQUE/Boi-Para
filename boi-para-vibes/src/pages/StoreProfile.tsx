import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Store, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const StoreProfile = () => {
  const [profileData, setProfileData] = useState({
    storeName: 'রবীন্দ্র পুস্তক ভবন',
    ownerName: 'অমিত চক্রবর্তী',
    shopNo: '15A',
    lane: 'College Street',
    contact: '+91 98765 43210',
    email: 'rabindra.books@gmail.com',
    description: 'রবীন্দ্রনাথের সম্পূর্ণ রচনাবলী এবং বাংলা সাহিত্যের বিশাল সংগ্রহ',
    established: '1965',
    specialization: 'Bengali Literature, Poetry'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Store profile has been updated successfully."
    });
  };

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
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-purple-400/30 via-pink-400/30 to-orange-400/30 rounded-full mb-4 shadow-lg">
            <h1 className="font-serif text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              🏢 Store Profile
            </h1>
          </div>
          <p className="text-vintage-brown/70 text-sm max-w-md mx-auto">Manage your store information and settings</p>
        </div>

        <Card className="max-w-4xl mx-auto bg-gradient-to-br from-white via-purple-50/30 via-pink-50/30 to-orange-50/30 shadow-xl border-0 rounded-2xl overflow-hidden">
          <CardHeader className="relative bg-gradient-to-r from-purple-50/50 via-pink-50/50 to-orange-50/50">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-300/20 via-pink-300/20 to-orange-300/20 rounded-bl-3xl"></div>
            <CardTitle className="flex items-center gap-2 relative z-10">
              <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl shadow-md">
                <Store className="h-4 w-4 text-purple-600" />
              </div>
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent font-semibold">Store Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input 
                    id="storeName"
                    value={profileData.storeName}
                    onChange={(e) => setProfileData({...profileData, storeName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="ownerName">Owner Name</Label>
                  <Input 
                    id="ownerName"
                    value={profileData.ownerName}
                    onChange={(e) => setProfileData({...profileData, ownerName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="shopNo">Shop Number</Label>
                  <Input 
                    id="shopNo"
                    value={profileData.shopNo}
                    onChange={(e) => setProfileData({...profileData, shopNo: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="lane">Lane/Street</Label>
                  <Input 
                    id="lane"
                    value={profileData.lane}
                    onChange={(e) => setProfileData({...profileData, lane: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input 
                    id="contact"
                    value={profileData.contact}
                    onChange={(e) => setProfileData({...profileData, contact: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="established">Established Year</Label>
                  <Input 
                    id="established"
                    value={profileData.established}
                    onChange={(e) => setProfileData({...profileData, established: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input 
                    id="specialization"
                    value={profileData.specialization}
                    onChange={(e) => setProfileData({...profileData, specialization: e.target.value})}
                    placeholder="e.g., Bengali Literature, Fiction"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Store Description</Label>
                <Textarea 
                  id="description"
                  value={profileData.description}
                  onChange={(e) => setProfileData({...profileData, description: e.target.value})}
                  rows={4}
                />
              </div>

              <div className="flex gap-4">
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Update Profile
                </Button>
                <Button type="button" variant="outline" className="px-6 py-3 rounded-xl">
                  Cancel Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Store Statistics */}
        <Card className="max-w-4xl mx-auto mt-6 bg-gradient-to-br from-white via-purple-50/20 to-pink-50/20 shadow-xl border-0 rounded-2xl">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent font-semibold">
              📊 Store Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <p className="text-2xl font-bold text-blue-600">4.8</p>
                <p className="text-sm text-blue-700">Average Rating</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-100 to-green-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <p className="text-2xl font-bold text-green-600">156</p>
                <p className="text-sm text-green-700">Total Reviews</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <p className="text-2xl font-bold text-purple-600">234</p>
                <p className="text-sm text-purple-700">Books in Stock</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <p className="text-2xl font-bold text-orange-600">89</p>
                <p className="text-sm text-orange-700">Regular Customers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default StoreProfile;