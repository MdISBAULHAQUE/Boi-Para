import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { AuthProvider } from "./contexts/AuthContext";
import { OrderProvider } from "./contexts/OrderContext";
import ErrorBoundary from "./components/ErrorBoundary";
import { logger } from "@/utils/logger";
const Index = lazy(() => import("./pages/Index"));
const Books = lazy(() => import("./pages/Books"));
const BookDetails = lazy(() => import("./pages/BookDetails"));
const StorePage = lazy(() => import("./pages/StorePage"));
const AllBookstores = lazy(() => import("./pages/AllBookstores"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const About = lazy(() => import("./pages/About"));
const AuthPage = lazy(() => import("./pages/Auth"));
const Profile = lazy(() => import("./pages/Profile"));
const EditProfile = lazy(() => import("./pages/EditProfile"));
const Orders = lazy(() => import("./pages/Orders"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const StoreAdmin = lazy(() => import("./pages/StoreAdmin"));
const NotFound = lazy(() => import("./pages/NotFound"));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));
const UserSettings = lazy(() => import('./pages/UserSettings'));
const StoreOrders = lazy(() => import('./pages/StoreOrders'));
const AddBook = lazy(() => import('./pages/AddBook'));
const StoreInventory = lazy(() => import('./pages/StoreInventory'));
const SalesAnalytics = lazy(() => import('./pages/SalesAnalytics'));
const StoreProfile = lazy(() => import('./pages/StoreProfile'));
const StoreCustomers = lazy(() => import('./pages/StoreCustomers'));
const UserManagement = lazy(() => import('./pages/UserManagement'));
const AdminOrderManagement = lazy(() => import('./pages/AdminOrderManagement'));
const AdminAnalytics = lazy(() => import('./pages/AdminAnalytics'));
const SystemSettings = lazy(() => import('./pages/SystemSettings'));
const AddStore = lazy(() => import('./pages/AddStore'));
const EditUser = lazy(() => import('./pages/EditUser'));
const DeleteUser = lazy(() => import('./pages/DeleteUser'));


const queryClient = new QueryClient();

const App = () => {
  logger.info('Application started');
  
  return (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <OrderProvider>
          <CartProvider>
            <WishlistProvider>
            <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
            <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/books" element={<Books />} />
              <Route path="/book/:id" element={<BookDetails />} />
              <Route path="/store/:id" element={<StorePage />} />
              <Route path="/bookstores" element={<AllBookstores />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/about" element={<About />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/settings" element={<UserSettings />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/store-admin" element={<StoreAdmin />} />
              <Route path="/store-orders" element={<StoreOrders />} />
              <Route path="/add-book" element={<AddBook />} />
              <Route path="/store-inventory" element={<StoreInventory />} />
              <Route path="/sales-analytics" element={<SalesAnalytics />} />
              <Route path="/store-profile" element={<StoreProfile />} />
              <Route path="/store-customers" element={<StoreCustomers />} />
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/admin-orders" element={<AdminOrderManagement />} />
              <Route path="/admin-analytics" element={<AdminAnalytics />} />
              <Route path="/system-settings" element={<SystemSettings />} />
              <Route path="/add-store" element={<AddStore />} />
              <Route path="/edit-user/:id" element={<EditUser />} />
              <Route path="/delete-user/:id" element={<DeleteUser />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
          </BrowserRouter>
            </TooltipProvider>
            </WishlistProvider>
          </CartProvider>
        </OrderProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
  );
};

export default App;
