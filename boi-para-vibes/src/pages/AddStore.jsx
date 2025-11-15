import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Store, Save, Upload, Image } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AddStore = () => {
  const [storeData, setStoreData] = useState({
    storeName: '',
    ownerName: '',
    shopNo: '',
    lane: '',
    contact: '',
    email: '',
    description: '',
    established: '',
    specialization: ''
  });
  
  const [storeImage, setStoreImage] = useState<string | null>(null);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setStoreImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Store Added Successfully",
      description: `${storeData.storeName} has been added to the platform.`
    });
    setStoreData({
      storeName: '',
      ownerName: '',
      shopNo: '',
      lane: '',
      contact: '',
      email: '',
      description: '',
      established: '',
      specialization: ''
    });
    setStoreImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vintage-sepia/10 via-vintage-cream/20 to-vintage-brown/5">
      <Navbar />
      
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="mb-6">
          <Link to="/bookstores" className="inline-flex items-center gap-2 text-vintage-brown hover:text-vintage-burgundy transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Store Management</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
        
        <div className="text-center mb-6 md:mb-10">
          <div className="inline-block px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-green-400/30 via-emerald-400/30 to-teal-400/30 rounded-full mb-4 shadow-lg">
            <h1 className="font-serif text-lg md:text-xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              🏪 Add New Store
            </h1>
          </div>
          <p className="text-vintage-brown/70 text-sm max-w-md mx-auto px-4">Add a new bookstore to the platform</p>
        </div>

        <Card className="max-w-4xl mx-auto bg-gradient-to-br from-white via-green-50/20 to-emerald-50/20 shadow-xl border-0 rounded-2xl overflow-hidden">
          <CardHeader className="relative bg-gradient-to-r from-green-50/50 via-emerald-50/50 to-teal-50/50 p-4 md:p-6">
            <div className="absolute top-0 right-0 w-16 md:w-20 h-16 md:h-20 bg-gradient-to-br from-green-300/20 via-emerald-300/20 to-teal-300/20 rounded-bl-3xl"></div>
            <CardTitle className="flex items-center gap-2 relative z-10">
              <div className="p-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl shadow-md">
                <Store className="h-4 w-4 text-green-600" />
              </div>
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent font-semibold text-sm md:text-base">Store Information</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-4 md:p-6">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* Store Image Upload */}
              <div className="mb-4 md:mb-6">
                <Label htmlFor="storeImage" className="text-sm md:text-base">Store Image</Label>
                <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-full sm:w-32 h-32 sm:h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                    {storeImage ? (
                      <img src={storeImage} alt="Store" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <div className="text-center">
                        <Image className="h-6 md:h-8 w-6 md:w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-xs text-gray-500">Store Image</p>
                      </div>
                    )}
                  </div>
                  <div className="w-full sm:w-auto">
                    <input
                      type="file"
                      id="storeImage"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Label htmlFor="storeImage" className="cursor-pointer">
                      <Button type="button" variant="outline" className="flex items-center gap-2 w-full sm:w-auto text-sm" asChild>
                        <span>
                          <Upload className="h-4 w-4" />
                          <span className="hidden sm:inline">Upload Image</span>
                          <span className="sm:hidden">Upload</span>
                        </span>
                      </Button>
                    </Label>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="storeName" className="text-sm md:text-base">Store Name</Label>
                  <Input 
                    id="storeName"
                    value={storeData.storeName}
                    onChange={(e) => setStoreData({...storeData, storeName: e.target.value})}
                    placeholder="Enter store name"
                    className="text-sm md:text-base"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="ownerName" className="text-sm md:text-base">Owner Name</Label>
                  <Input 
                    id="ownerName"
                    value={storeData.ownerName}
                    onChange={(e) => setStoreData({...storeData, ownerName: e.target.value})}
                    placeholder="Enter owner name"
                    className="text-sm md:text-base"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="shopNo" className="text-sm md:text-base">Shop Number</Label>
                  <Input 
                    id="shopNo"
                    value={storeData.shopNo}
                    onChange={(e) => setStoreData({...storeData, shopNo: e.target.value})}
                    placeholder="15A"
                    className="text-sm md:text-base"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lane" className="text-sm md:text-base">Lane/Street</Label>
                  <Input 
                    id="lane"
                    value={storeData.lane}
                    onChange={(e) => setStoreData({...storeData, lane: e.target.value})}
                    placeholder="College Street"
                    className="text-sm md:text-base"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contact" className="text-sm md:text-base">Contact Number</Label>
                  <Input 
                    id="contact"
                    value={storeData.contact}
                    onChange={(e) => setStoreData({...storeData, contact: e.target.value})}
                    placeholder="+91 98765 43210"
                    className="text-sm md:text-base"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm md:text-base">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={storeData.email}
                    onChange={(e) => setStoreData({...storeData, email: e.target.value})}
                    placeholder="store@example.com"
                    className="text-sm md:text-base"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="established" className="text-sm md:text-base">Established Year</Label>
                  <Input 
                    id="established"
                    value={storeData.established}
                    onChange={(e) => setStoreData({...storeData, established: e.target.value})}
                    placeholder="1965"
                    className="text-sm md:text-base"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="specialization" className="text-sm md:text-base">Specialization</Label>
                  <Input 
                    id="specialization"
                    value={storeData.specialization}
                    onChange={(e) => setStoreData({...storeData, specialization: e.target.value})}
                    placeholder="Bengali Literature, Fiction"
                    className="text-sm md:text-base"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description" className="text-sm md:text-base">Store Description</Label>
                <Textarea 
                  id="description"
                  value={storeData.description}
                  onChange={(e) => setStoreData({...storeData, description: e.target.value})}
                  placeholder="Enter store description"
                  rows={4}
                  className="text-sm md:text-base"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  <Save className="h-4 w-4" />
                  <span className="hidden sm:inline">Add Store to Platform</span>
                  <span className="sm:hidden">Add Store</span>
                </Button>
                <Button type="button" variant="outline" className="px-4 md:px-6 py-2 md:py-3 rounded-xl text-sm md:text-base">
                  <span className="hidden sm:inline">Cancel Changes</span>
                  <span className="sm:hidden">Cancel</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default AddStore;