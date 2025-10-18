import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Star, Phone, Mail, MapPin, Clock, Shield, Users, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { bookstores } from '@/data/bookstores';

const BookstoreDirectory = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStores = bookstores.filter(store =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.specialization.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  return (
    <section className="py-24 bg-gradient-to-b from-blue-50/50 to-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-24">
          <div className="max-w-6xl mx-auto">
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-vintage-cream to-vintage-sepia/30 rounded-full text-vintage-brown text-sm font-bold mb-8 border border-vintage-gold/30">
              🏢 Heritage Bookstores
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-vintage-brown mb-6 tracking-tight leading-tight">
              Literary Heritage
              <span className="block bg-gradient-to-r from-vintage-gold to-yellow-400 bg-clip-text text-transparent">
                of Kolkata
              </span>
            </h2>
            
            <p className="text-base md:text-lg text-vintage-brown/80 max-w-4xl mx-auto mb-12 leading-relaxed">
              Explore authentic bookstores where passionate owners have been serving book lovers for over a century
            </p>
            
            {/* Search Store */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  className="pl-14 pr-6 py-4 text-lg border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 rounded-2xl shadow-sm focus:shadow-lg transition-all duration-300 w-full"
                  placeholder="Search bookstores..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Book Categories */}
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {['Bengali Literature', 'Philosophy', 'Children\'s Books', 'Poetry', 'Rare Books', 'History'].map((category) => (
                <Badge key={category} className="bg-vintage-cream text-vintage-brown hover:bg-vintage-gold/20 hover:text-vintage-burgundy border border-vintage-gold/30 hover:border-vintage-gold transition-all duration-200 px-6 py-3 text-sm font-medium rounded-full cursor-pointer">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 max-w-7xl mx-auto">
          {filteredStores.map((store) => (
            <Card
              key={store.id}
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 border-0 shadow-lg hover:shadow-purple-500/20 overflow-hidden rounded-3xl backdrop-blur-sm"
            >
              <CardContent className="p-0">
                {/* Store Image */}
                <div className="relative h-32 overflow-hidden rounded-t-3xl">
                  <img
                    src={store.image}
                    alt={store.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-blue-900/20 to-transparent"></div>

                  {store.isVerified && (
                    <Badge className="absolute top-3 right-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg border-0 rounded-full px-3 py-1 text-xs font-bold">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}

                  <Badge className="absolute top-3 left-3 bg-gradient-to-r from-vintage-gold to-yellow-400 text-vintage-brown font-bold shadow-lg border-0 rounded-full px-3 py-1 text-xs">
                    Est. {store.established}
                  </Badge>
                </div>

                <div className="p-2 space-y-1">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-vintage-brown line-clamp-2 group-hover:text-vintage-burgundy transition-all duration-300 leading-tight">
                      {store.name}
                    </h3>
                    <p className="text-vintage-brown/70 font-medium text-xs flex items-center gap-1 leading-tight mt-1">
                      <User className="h-3 w-3 text-vintage-gold flex-shrink-0" />
                      <span className="truncate">{store.ownerName}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 md:gap-2 min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                        <span className="font-bold text-vintage-brown text-xs md:text-sm">{store.rating}</span>
                      </div>
                      <span className="text-xs md:text-sm text-vintage-brown/60 truncate">({store.reviews})</span>
                    </div>
                    <Badge className="bg-gradient-to-r from-vintage-cream to-vintage-sepia/30 text-vintage-brown border border-vintage-gold/30 text-xs font-bold px-2 py-1 flex-shrink-0 shadow-sm">
                      {Math.floor(Math.random() * 500) + 800}+
                    </Badge>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-600 min-w-0">
                      <MapPin className="h-3 w-3 text-vintage-gold flex-shrink-0" />
                      <span className="text-xs truncate text-vintage-brown/70">{store.shopNo}, {store.lane}</span>
                    </div>
                    <div className="flex items-center gap-2 text-vintage-brown/70 min-w-0">
                      <Phone className="h-3 w-3 text-vintage-burgundy flex-shrink-0" />
                      <span className="text-xs truncate">{store.contactNumber}</span>
                    </div>
                  </div>

                  {/* Store Categories */}
                  <div className="flex flex-wrap gap-2">
                    {store.specialization.slice(0, 2).map((category) => (
                      <Badge
                        key={category}
                        className="bg-vintage-cream text-vintage-brown hover:bg-vintage-gold/20 border border-vintage-gold/30 hover:border-vintage-gold cursor-pointer transition-all duration-200 text-xs px-3 py-1.5 rounded-lg font-medium"
                      >
                        {category}
                      </Badge>
                    ))}
                    {store.specialization.length > 2 && (
                      <Badge className="bg-vintage-sepia/30 text-vintage-brown/60 text-xs px-3 py-1.5 rounded-lg border border-vintage-gold/20">
                        +{store.specialization.length - 2} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Link to={`/store/${store.id}`} className="flex-1">
                      <Button
                        className="w-full bg-gradient-to-r from-vintage-brown to-vintage-burgundy hover:from-vintage-burgundy hover:to-vintage-brown text-vintage-cream shadow-md hover:shadow-lg transition-all duration-200 rounded-lg font-semibold py-2 text-xs"
                      >
                        Visit Store
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border border-vintage-gold/30 text-vintage-brown hover:bg-vintage-gold/10 hover:border-vintage-gold transition-all duration-200 rounded-lg shadow-sm p-2"
                    >
                      <Phone className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="text-center mt-16 pb-12">
        <Link to="/bookstores">
          <Button
            size="lg"
            className="bg-gradient-to-r from-vintage-gold via-yellow-400 to-vintage-gold text-vintage-brown font-bold px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-vintage-gold/30 hover:border-vintage-gold/60 backdrop-blur-sm"
          >
            <Users className="h-5 w-5 mr-2" />
            Explore All 50+ Bookstores
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default BookstoreDirectory;
