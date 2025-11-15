import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Shield, Store, Edit } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <div>Please login to view profile</div>;
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-red-500';
      case 'store_admin': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'super_admin': return Shield;
      case 'store_admin': return Store;
      default: return User;
    }
  };

  const RoleIcon = getRoleIcon(user.role);

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/50 via-white to-sky-100/30">
      <Navbar />
      
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gradient-to-br from-white via-sky-50/30 to-sky-100/20 backdrop-blur-sm shadow-2xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className="text-center p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-sky-200/30 to-transparent rounded-bl-3xl"></div>
              <div className="relative z-10">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-amber-700 to-amber-800 rounded-full flex items-center justify-center mb-4 shadow-xl ring-4 ring-sky-200">
                  <User className="h-10 w-10 text-white" />
                </div>
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-sky-100 to-sky-200 rounded-full mb-2">
                  <CardTitle className="font-serif text-xl text-amber-800">
                    👤 My Profile
                  </CardTitle>
                </div>
                <p className="text-amber-700/70 text-sm">Manage your account information</p>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6 p-6 relative z-10">
              <div className="grid gap-4">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-sky-50/60 to-sky-100/40 rounded-xl border border-sky-200 hover:shadow-md transition-all duration-300">
                  <div className="p-2 bg-amber-100 rounded-full">
                    <User className="h-5 w-5 text-amber-700" />
                  </div>
                  <div>
                    <p className="text-sm text-amber-700/60 font-medium">Full Name</p>
                    <p className="font-semibold text-amber-800">{user.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-sky-50/60 to-sky-100/40 rounded-xl border border-sky-200 hover:shadow-md transition-all duration-300">
                  <div className="p-2 bg-amber-100 rounded-full">
                    <Mail className="h-5 w-5 text-amber-700" />
                  </div>
                  <div>
                    <p className="text-sm text-amber-700/60 font-medium">Email Address</p>
                    <p className="font-semibold text-amber-800 break-all">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-sky-50/60 to-sky-100/40 rounded-xl border border-sky-200 hover:shadow-md transition-all duration-300">
                  <div className="p-2 bg-amber-100 rounded-full">
                    <RoleIcon className="h-5 w-5 text-amber-700" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-amber-700/60 font-medium">Account Type</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={`${getRoleColor(user.role)} text-white px-3 py-1 rounded-full shadow-md`}>
                        {user.role.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-sky-200">
                <Button 
                  onClick={handleEditProfile}
                  className="w-full bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;