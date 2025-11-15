import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Phone, MapPin, Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAllBookstores } from '@/data/bookstores';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AllBookstores = () => {
  const allBookstores = getAllBookstores();

  return (
    <div className="min-h-screen bg-gradient-to-br from-vintage-sepia/10 via-vintage-cream/20 to-vintage-brown/5">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <Link to="/admin" className="inline-flex items-center gap-2 text-vintage-brown hover:text-vintage-burgundy">
            <ArrowLeft className="h-4 w-4" />
            Back to Admin Dashboard
          </Link>
          <Link to="/add-store">
            <Button className="bg-gradient-to-r from-vintage-brown to-vintage-burgundy hover:from-vintage-burgundy hover:to-vintage-brown text-white px-4 sm:px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
              <span className="hidden sm:inline">+ Add New Store</span>
              <span className="sm:hidden">+ Add Store</span>
            </Button>
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold bg-gradient-to-r from-vintage-brown via-vintage-burgundy to-vintage-brown bg-clip-text text-transparent mb-4">
            All College Street Bookstores
          </h1>
          <p className="text-lg text-vintage-brown/80 max-w-3xl mx-auto">
            Discover all {allBookstores.length} authentic bookshops in Kolkata's famous book district
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allBookstores.map((store) => (
            <Card key={store.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-vintage-cream/30 border-0 overflow-hidden">
              <CardContent className="p-0">
                {/* Store Image */}
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={store.image}
                    alt={store.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {store.isVerified && (
                    <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  
                  <Badge className="absolute top-2 left-2 bg-vintage-gold text-vintage-brown font-semibold">
                    Est. {store.established}
                  </Badge>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-vintage-brown mb-1 line-clamp-1">
                      {store.name}
                    </h3>
                    <p className="text-vintage-brown/70 font-medium text-sm">
                      Owner: {store.ownerName}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-vintage-gold text-vintage-gold" />
                      <span className="font-semibold text-vintage-brown">{store.rating}</span>
                    </div>
                    <span className="text-sm text-vintage-brown/60">({store.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center gap-2 text-vintage-brown/70">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">Shop {store.shopNo}, {store.lane}</span>
                  </div>

                  <div className="flex items-center gap-2 text-vintage-brown/70">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">{store.contactNumber}</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Link to={`/store/${store.id}`} className="flex-1">
                      <Button 
                        size="sm" 
                        className="w-full bg-gradient-to-r from-vintage-brown to-vintage-burgundy hover:from-vintage-burgundy hover:to-vintage-brown text-vintage-cream"
                      >
                        Visit Store
                      </Button>
                    </Link>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-vintage-brown text-vintage-brown hover:bg-vintage-brown hover:text-vintage-cream"
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
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

export default AllBookstores;