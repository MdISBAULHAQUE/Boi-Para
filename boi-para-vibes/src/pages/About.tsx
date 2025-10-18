import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Users, Award, Clock, MapPin, Phone, Mail, Heart, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-vintage-cream via-white to-vintage-sepia/20">
      <Navbar />
      
      {/* Hero Section with Background */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-vintage-brown/10 via-vintage-burgundy/5 to-vintage-sepia/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h1 className="font-serif text-3xl md:text-4xl font-bold bg-gradient-to-r from-vintage-brown via-vintage-burgundy to-vintage-brown bg-clip-text text-transparent mb-6">
              About Boi Para
            </h1>
            <p className="text-base md:text-lg text-vintage-brown/80 max-w-4xl mx-auto leading-relaxed font-light">
              Since 1952, we've been preserving the literary heritage of Kolkata's famous College Street, 
              connecting readers with rare treasures and timeless classics in the heart of Bengal's intellectual capital.
            </p>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 pb-16">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          <Card className="text-center p-8 bg-gradient-to-br from-white to-vintage-cream/30 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-vintage-gold to-yellow-400 p-4 rounded-full w-fit mx-auto mb-6">
                <BookOpen className="h-12 w-12 text-vintage-brown" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-vintage-brown to-vintage-burgundy bg-clip-text text-transparent mb-2">50,000+</h3>
              <p className="text-sm text-vintage-brown/70 font-medium">Books Collection</p>
            </CardContent>
          </Card>
          <Card className="text-center p-8 bg-gradient-to-br from-white to-vintage-cream/30 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-vintage-gold to-yellow-400 p-4 rounded-full w-fit mx-auto mb-6">
                <Users className="h-12 w-12 text-vintage-brown" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-vintage-brown to-vintage-burgundy bg-clip-text text-transparent mb-2">100,000+</h3>
              <p className="text-sm text-vintage-brown/70 font-medium">Happy Readers</p>
            </CardContent>
          </Card>
          <Card className="text-center p-8 bg-gradient-to-br from-white to-vintage-cream/30 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-vintage-gold to-yellow-400 p-4 rounded-full w-fit mx-auto mb-6">
                <Award className="h-12 w-12 text-vintage-brown" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-vintage-brown to-vintage-burgundy bg-clip-text text-transparent mb-2">70+</h3>
              <p className="text-sm text-vintage-brown/70 font-medium">Years of Service</p>
            </CardContent>
          </Card>
          <Card className="text-center p-8 bg-gradient-to-br from-white to-vintage-cream/30 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-vintage-gold to-yellow-400 p-4 rounded-full w-fit mx-auto mb-6">
                <Clock className="h-12 w-12 text-vintage-brown" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-vintage-brown to-vintage-burgundy bg-clip-text text-transparent mb-2">24/7</h3>
              <p className="text-sm text-vintage-brown/70 font-medium">Online Access</p>
            </CardContent>
          </Card>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <Card className="p-10 bg-gradient-to-br from-white to-vintage-cream/20 border-0 shadow-xl">
            <CardContent className="p-0">
              <div className="flex items-center gap-3 mb-8">
                <Heart className="h-8 w-8 text-vintage-gold" />
                <h2 className="font-serif text-4xl font-bold bg-gradient-to-r from-vintage-brown to-vintage-burgundy bg-clip-text text-transparent">Our Story</h2>
              </div>
              <div className="space-y-6 text-vintage-brown/80 leading-relaxed">
                <p className="text-sm">
                  Founded in 1952 by Ramesh Chandra Das, Boi Para began as a small bookstall on College Street. 
                  What started as a passion for Bengali literature has grown into one of Kolkata's most beloved bookstores.
                </p>
                <p className="text-sm">
                  Through decades of political change, cultural evolution, and technological advancement, we've remained 
                  committed to our core mission: making quality literature accessible to everyone.
                </p>
                <p className="text-sm">
                  Today, we bridge the gap between traditional book culture and modern convenience, offering both 
                  physical browsing experiences and digital accessibility to book lovers worldwide.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="p-10 bg-gradient-to-br from-white to-vintage-sepia/20 border-0 shadow-xl">
            <CardContent className="p-0">
              <div className="flex items-center gap-3 mb-8">
                <Star className="h-8 w-8 text-vintage-gold" />
                <h2 className="font-serif text-4xl font-bold bg-gradient-to-r from-vintage-brown to-vintage-burgundy bg-clip-text text-transparent">Our Mission</h2>
              </div>
              <div className="space-y-6 text-vintage-brown/80 leading-relaxed">
                <p className="text-sm">
                  To preserve and promote Bengali literature while embracing global literary traditions. 
                  We believe books are bridges between cultures, generations, and ideas.
                </p>
                <p className="text-sm">
                  Our curated collection spans from rare manuscripts and first editions to contemporary bestsellers, 
                  ensuring every reader finds their perfect match.
                </p>
                <p className="text-sm">
                  We're not just a bookstore – we're a cultural institution dedicated to fostering intellectual 
                  curiosity and literary appreciation in the digital age.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <section className="mb-20">
          <h2 className="font-serif text-3xl font-bold bg-gradient-to-r from-vintage-brown via-vintage-burgundy to-vintage-brown bg-clip-text text-transparent text-center mb-16">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <Card className="p-8 bg-gradient-to-br from-vintage-gold/10 to-yellow-400/10 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-3">
              <CardContent className="p-0 text-center">
                <div className="bg-gradient-to-r from-vintage-gold to-yellow-400 p-4 rounded-full w-fit mx-auto mb-6">
                  <BookOpen className="h-10 w-10 text-vintage-brown" />
                </div>
                <h3 className="font-serif text-base font-bold text-vintage-brown mb-6">Literary Heritage</h3>
                <p className="text-vintage-brown/70 text-xs leading-relaxed">
                  Preserving Bengal's rich literary tradition while embracing contemporary voices and global perspectives.
                </p>
              </CardContent>
            </Card>
            <Card className="p-8 bg-gradient-to-br from-vintage-burgundy/10 to-vintage-brown/10 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-3">
              <CardContent className="p-0 text-center">
                <div className="bg-gradient-to-r from-vintage-gold to-yellow-400 p-4 rounded-full w-fit mx-auto mb-6">
                  <Users className="h-10 w-10 text-vintage-brown" />
                </div>
                <h3 className="font-serif text-base font-bold text-vintage-brown mb-6">Accessibility</h3>
                <p className="text-vintage-brown/70 text-xs leading-relaxed">
                  Making quality literature affordable and accessible to readers from all walks of life.
                </p>
              </CardContent>
            </Card>
            <Card className="p-8 bg-gradient-to-br from-vintage-sepia/10 to-vintage-cream/20 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-3">
              <CardContent className="p-0 text-center">
                <div className="bg-gradient-to-r from-vintage-gold to-yellow-400 p-4 rounded-full w-fit mx-auto mb-6">
                  <Heart className="h-10 w-10 text-vintage-brown" />
                </div>
                <h3 className="font-serif text-base font-bold text-vintage-brown mb-6">Community</h3>
                <p className="text-vintage-brown/70 text-xs leading-relaxed">
                  Building connections between readers, authors, and literary enthusiasts across generations.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Info */}
        <Card className="p-12 bg-gradient-to-br from-vintage-brown/5 via-vintage-burgundy/5 to-vintage-sepia/10 border-0 shadow-2xl">
          <CardContent className="p-0">
            <h2 className="font-serif text-3xl font-bold bg-gradient-to-r from-vintage-brown via-vintage-burgundy to-vintage-brown bg-clip-text text-transparent text-center mb-12">Visit Us</h2>
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-vintage-gold to-yellow-400 p-6 rounded-full w-fit mx-auto">
                  <MapPin className="h-12 w-12 text-vintage-brown" />
                </div>
                <h3 className="font-serif text-base font-bold text-vintage-brown">Location</h3>
                <p className="text-vintage-brown/70 text-xs leading-relaxed">
                  College Street, Shyama Charan Dey Area<br />
                  Kolkata, West Bengal 700073
                </p>
              </div>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-vintage-gold to-yellow-400 p-6 rounded-full w-fit mx-auto">
                  <Phone className="h-12 w-12 text-vintage-brown" />
                </div>
                <h3 className="font-serif text-base font-bold text-vintage-brown">Phone</h3>
                <p className="text-vintage-brown/70 text-xs leading-relaxed">
                  +91 33 2241 5678<br />
                  +91 98765 43210
                </p>
              </div>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-vintage-gold to-yellow-400 p-6 rounded-full w-fit mx-auto">
                  <Mail className="h-12 w-12 text-vintage-brown" />
                </div>
                <h3 className="font-serif text-base font-bold text-vintage-brown">Email</h3>
                <p className="text-vintage-brown/70 text-xs leading-relaxed">
                  info@boipara.com<br />
                  books@boipara.com
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;