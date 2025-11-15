import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, User, Save } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const EditUser = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    role: 'customer',
    status: 'active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "User Updated",
      description: `${userData.name} has been updated successfully.`
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vintage-sepia/10 via-vintage-cream/20 to-vintage-brown/5">
      <Navbar />
      
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="mb-6">
          <Link to="/user-management" className="inline-flex items-center gap-2 text-vintage-brown hover:text-vintage-burgundy transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to User Management</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
        
        <div className="text-center mb-6 md:mb-10">
          <div className="inline-block px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-emerald-400/30 rounded-full mb-4 shadow-lg">
            <h1 className="font-serif text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
              ✏️ Edit User
            </h1>
          </div>
          <p className="text-vintage-brown/70 text-sm max-w-md mx-auto px-4">Update user information and settings</p>
        </div>

        <Card className="max-w-2xl mx-auto bg-gradient-to-br from-white via-blue-50/20 to-purple-50/20 shadow-xl border-0 rounded-2xl overflow-hidden">
          <CardHeader className="relative bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-emerald-50/50 p-4 md:p-6">
            <div className="absolute top-0 right-0 w-16 md:w-20 h-16 md:h-20 bg-gradient-to-br from-blue-300/20 via-purple-300/20 to-emerald-300/20 rounded-bl-3xl"></div>
            <CardTitle className="flex items-center gap-2 relative z-10">
              <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-md">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent font-semibold text-sm md:text-base">User Information</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-4 md:p-6">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-sm md:text-base">Full Name</Label>
                  <Input 
                    id="name"
                    value={userData.name}
                    onChange={(e) => setUserData({...userData, name: e.target.value})}
                    className="text-sm md:text-base"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm md:text-base">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                    className="text-sm md:text-base"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="role" className="text-sm md:text-base">Role</Label>
                  <select 
                    id="role"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm md:text-base"
                    value={userData.role}
                    onChange={(e) => setUserData({...userData, role: e.target.value})}
                    required
                  >
                    <option value="customer">Customer</option>
                    <option value="store_admin">Store Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="status" className="text-sm md:text-base">Status</Label>
                  <select 
                    id="status"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm md:text-base"
                    value={userData.status}
                    onChange={(e) => setUserData({...userData, status: e.target.value})}
                    required
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 hover:from-blue-600 hover:via-purple-600 hover:to-emerald-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  <Save className="h-4 w-4" />
                  <span className="hidden sm:inline">Update User</span>
                  <span className="sm:hidden">Update</span>
                </Button>
                <Link to="/user-management">
                  <Button type="button" variant="outline" className="w-full px-4 md:px-6 py-2 md:py-3 rounded-xl text-sm md:text-base">
                    <span className="hidden sm:inline">Cancel Changes</span>
                    <span className="sm:hidden">Cancel</span>
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default EditUser;