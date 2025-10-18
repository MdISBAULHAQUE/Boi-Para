import { Search, ShoppingCart, Menu, BookOpen, Heart, User, LogOut, Settings, Package, Shield, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { debounce } from '@/utils/performance';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { getCartCount } = useCart();
  const { state: wishlistState } = useWishlist();
  const { user, logout, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const debouncedSearch = debounce((query: string) => {
    if (query.trim()) {
      navigate(`/books?search=${encodeURIComponent(query.trim())}`);
    }
  }, 300);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  return (
    <nav className="bg-white border-b border-sky-200 shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-3 bg-gradient-to-br from-sky-400 to-sky-500 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <span className="font-serif text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-800 to-amber-900 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              Boi Para
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-lg mx-4 md:mx-8">
            <form onSubmit={handleSearch} className="relative w-full group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-700/60 h-5 w-5 transition-all group-hover:text-amber-700 group-hover:scale-110" />
              <Input
                className="pl-12 pr-4 py-3 text-base bg-sky-50/50 border-2 border-sky-200 rounded-2xl focus:border-sky-400 focus:ring-4 focus:ring-sky-100 transition-all duration-300 placeholder:text-amber-700/60 hover:bg-sky-50 focus:bg-white"
                placeholder="Search books, authors, genres..."
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-2">
            <Link to="/books">
              <Button variant="ghost" className="hidden lg:flex text-amber-800 hover:text-amber-900 hover:bg-sky-100 rounded-xl px-5 py-2.5 font-medium transition-all duration-300 btn-modern">
                Books
              </Button>
            </Link>
            <Link to="/bookstores">
              <Button variant="ghost" className="hidden lg:flex text-amber-800 hover:text-amber-900 hover:bg-sky-100 rounded-xl px-5 py-2.5 font-medium transition-all duration-300 btn-modern">
                Stores
              </Button>
            </Link>
            <Link to="/wishlist">
              <Button variant="ghost" className="relative p-3 hover:bg-red-50 rounded-xl transition-all duration-300 group btn-modern">
                <Heart className="h-5 w-5 text-amber-800 group-hover:text-red-500 transition-colors group-hover:scale-110" />
                {wishlistState.items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {wishlistState.items.length}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" className="relative p-3 hover:bg-sky-100 rounded-xl transition-all duration-300 group btn-modern">
                <ShoppingCart className="h-5 w-5 text-amber-800 group-hover:text-amber-900 transition-colors group-hover:scale-110" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-600 to-amber-700 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-bounce">
                    {getCartCount()}
                  </span>
                )}
              </Button>
            </Link>
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white px-3 sm:px-5 py-2.5 rounded-xl font-medium btn-modern btn-shimmer shadow-lg hover:shadow-xl focus-ring">
                    <User className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline ml-1 truncate max-w-24">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Profile Settings
                  </DropdownMenuItem>
                  {user?.role === 'customer' && (
                    <DropdownMenuItem onClick={() => navigate('/orders')}>
                      <Package className="mr-2 h-4 w-4" />
                      Purchase History
                    </DropdownMenuItem>
                  )}
                  {user?.role === 'super_admin' && (
                    <DropdownMenuItem onClick={() => navigate('/admin')}>
                      <Shield className="mr-2 h-4 w-4" />
                      Admin Dashboard
                    </DropdownMenuItem>
                  )}
                  {user?.role === 'store_admin' && (
                    <DropdownMenuItem onClick={() => navigate('/store-admin')}>
                      <Store className="mr-2 h-4 w-4" />
                      Store Management
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white px-3 sm:px-5 py-2.5 rounded-xl font-medium btn-modern btn-shimmer shadow-lg hover:shadow-xl focus-ring">
                  <User className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline ml-1">Login</span>
                </Button>
              </Link>
            )}
            <Button variant="ghost" className="lg:hidden p-3 hover:bg-sky-100 rounded-xl transition-all duration-300 btn-modern">
              <Menu className="h-5 w-5 text-amber-800" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;