import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, Edit, Trash2, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const UserManagement = () => {
  const initialUsers = [
    { id: 1, name: 'রহিম উদ্দিন', email: 'customer@example.com', role: 'Customer', status: 'Active', joinDate: '2024-01-15' },
    { id: 2, name: 'অমিত চক্রবর্তী', email: 'amit@rabindra.com', role: 'Store Admin', status: 'Active', joinDate: '2023-12-10' },
    { id: 3, name: 'Dr. Rajesh Kumar', email: 'rajesh@academic.com', role: 'Store Admin', status: 'Active', joinDate: '2023-11-20' },
    { id: 4, name: 'সুমিত্রা দেবী', email: 'sumitra@gmail.com', role: 'Customer', status: 'Inactive', joinDate: '2024-01-08' },
    { id: 5, name: 'Admin User', email: 'admin@boipara.com', role: 'Super Admin', status: 'Active', joinDate: '2023-10-01' }
  ];

  const [users, setUsers] = useState(initialUsers);

  useEffect(() => {
    // Load users from localStorage if available
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      // Save initial users to localStorage
      localStorage.setItem('users', JSON.stringify(initialUsers));
    }
  }, []);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Super Admin': return 'bg-red-500';
      case 'Store Admin': return 'bg-blue-500';
      case 'Customer': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/50 via-white to-sky-100/30">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/admin" className="inline-flex items-center gap-2 text-amber-800 hover:text-amber-900 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
        
        <div className="text-center mb-10">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-sky-100 to-sky-200 rounded-full mb-4">
            <h1 className="font-serif text-xl font-bold text-amber-800">
              👥 User Management ({users.length} Users)
            </h1>
          </div>
          <p className="text-amber-700/70 text-sm max-w-md mx-auto">Manage user accounts, roles, and permissions</p>
        </div>

        {/* Add User Button */}
        <div className="mb-8 text-center">
          <Button className="bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <UserPlus className="h-4 w-4 mr-2" />
            Add New User
          </Button>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {users.map((user) => (
            <Card key={user.id} className="bg-gradient-to-br from-white via-sky-50/30 to-sky-100/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl overflow-hidden group">
              <CardContent className="p-4 relative">
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-sky-200/30 to-transparent rounded-bl-2xl"></div>
                
                <div className="flex justify-between items-start mb-3 relative z-10">
                  <div>
                    <h3 className="font-semibold text-amber-800 text-sm">{user.name}</h3>
                    <p className="text-xs text-gray-500">ID: #{user.id}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Badge className={`${getRoleColor(user.role)} text-white text-xs px-2 py-1 rounded-full`}>
                      {user.role}
                    </Badge>
                    <Badge className={`${getStatusColor(user.status)} text-xs px-2 py-1 rounded-full`}>
                      {user.status}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2 mb-4 relative z-10">
                  <div className="p-2 bg-vintage-cream/30 rounded-lg">
                    <p className="text-xs text-gray-600">
                      <strong>Email:</strong> {user.email}
                    </p>
                  </div>
                  <div className="p-2 bg-vintage-cream/30 rounded-lg">
                    <p className="text-xs text-gray-600">
                      <strong>Joined:</strong> {new Date(user.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2 relative z-10">
                  <Link to={`/edit-user/${user.id}`} className="flex-1">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full text-xs h-7"
                    >
                      <Edit className="h-3 w-3 sm:mr-1" />
                      <span className="hidden sm:inline">Edit</span>
                    </Button>
                  </Link>
                  <Link to={`/delete-user/${user.id}`} className="flex-1">
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      className="w-full text-xs h-7"
                    >
                      <Trash2 className="h-3 w-3 sm:mr-1" />
                      <span className="hidden sm:inline">Delete</span>
                    </Button>
                  </Link>
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

export default UserManagement;