import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2, AlertTriangle } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const DeleteUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  
  const userData = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'customer',
    status: 'active'
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Remove user from localStorage or state management
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.filter((user: any) => user.id !== parseInt(id || '0'));
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    toast({
      title: "User Deleted",
      description: `${userData.name} has been permanently deleted.`,
      variant: "destructive"
    });
    
    navigate('/user-management');
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
          <div className="inline-block px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-red-400/30 via-orange-400/30 to-yellow-400/30 rounded-full mb-4 shadow-lg">
            <h1 className="font-serif text-lg md:text-xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
              🗑️ Delete User
            </h1>
          </div>
          <p className="text-vintage-brown/70 text-sm max-w-md mx-auto px-4">Permanently remove user from the system</p>
        </div>

        <Card className="max-w-2xl mx-auto bg-gradient-to-br from-white via-red-50/20 to-orange-50/20 shadow-xl border-0 rounded-2xl overflow-hidden">
          <CardHeader className="relative bg-gradient-to-r from-red-50/50 via-orange-50/50 to-yellow-50/50 p-4 md:p-6">
            <div className="absolute top-0 right-0 w-16 md:w-20 h-16 md:h-20 bg-gradient-to-br from-red-300/20 via-orange-300/20 to-yellow-300/20 rounded-bl-3xl"></div>
            <CardTitle className="flex items-center gap-2 relative z-10">
              <div className="p-2 bg-gradient-to-r from-red-100 to-orange-100 rounded-xl shadow-md">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
              <span className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent font-semibold text-sm md:text-base">Confirm Deletion</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-4 md:p-6">
            <div className="space-y-4 md:space-y-6">
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-800 text-sm md:text-base">Warning: This action cannot be undone</h3>
                    <p className="text-red-700 text-xs md:text-sm mt-1">
                      Deleting this user will permanently remove all their data, including orders, reviews, and account information.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-vintage-brown mb-3 text-sm md:text-base">User Details:</h4>
                <div className="space-y-2 text-xs md:text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{userData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{userData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Role:</span>
                    <span className="font-medium capitalize">{userData.role.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium capitalize">{userData.status}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" />
                  {isDeleting ? (
                    <span>Deleting...</span>
                  ) : (
                    <>
                      <span className="hidden sm:inline">Delete User Permanently</span>
                      <span className="sm:hidden">Delete</span>
                    </>
                  )}
                </Button>
                <Link to="/user-management">
                  <Button type="button" variant="outline" className="w-full px-4 md:px-6 py-2 md:py-3 rounded-xl text-sm md:text-base">
                    <span className="hidden sm:inline">Cancel & Go Back</span>
                    <span className="sm:hidden">Cancel</span>
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default DeleteUser;