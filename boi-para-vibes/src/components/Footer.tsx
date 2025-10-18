import { BookOpen, Phone, Mail, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-vintage-brown text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 group">
              <div className="p-3 bg-gradient-to-br from-vintage-gold via-yellow-400 to-vintage-gold rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <BookOpen className="h-7 w-7 text-vintage-brown" />
              </div>
              <span className="font-serif text-3xl font-bold text-gradient group-hover:scale-105 transition-transform duration-300">
                Boi Para
              </span>
            </div>
            <p className="text-gray-200 text-base leading-relaxed max-w-sm">
              Preserving the literary heritage of Kolkata's famous Boi Para since 1952. 
              Your gateway to timeless knowledge and rare literary treasures.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-xl font-semibold mb-6 text-vintage-gold">
              Quick Links
            </h3>
            <ul className="space-y-3 text-base">
              <li><a href="/" onClick={handleHomeClick} className="text-gray-200 hover:text-vintage-gold transition-all duration-300 cursor-pointer hover:translate-x-1 inline-block">Home</a></li>
              <li><Link to="/books" className="text-gray-200 hover:text-vintage-gold transition-all duration-300 hover:translate-x-1 inline-block">All Books</Link></li>
              <li><Link to="/bookstores" className="text-gray-200 hover:text-vintage-gold transition-all duration-300 hover:translate-x-1 inline-block">Bookstores</Link></li>
              <li><Link to="/books?category=Literature" className="text-gray-200 hover:text-vintage-gold transition-all duration-300 hover:translate-x-1 inline-block">Bengali Literature</Link></li>
              <li><Link to="/books?category=Academic" className="text-gray-200 hover:text-vintage-gold transition-all duration-300 hover:translate-x-1 inline-block">Academic Texts</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-serif text-xl font-semibold mb-6 text-yellow-400">
              Categories
            </h3>
            <ul className="space-y-3 text-base">
              <li><Link to="/books?category=Fiction" className="text-gray-200 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1 inline-block">Fiction & Novels</Link></li>
              <li><Link to="/books?category=Poetry" className="text-gray-200 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1 inline-block">Poetry & Drama</Link></li>
              <li><Link to="/books?category=Philosophy" className="text-gray-200 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1 inline-block">Philosophy</Link></li>
              <li><Link to="/books?category=History" className="text-gray-200 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1 inline-block">History</Link></li>
              <li><Link to="/about" className="text-gray-200 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1 inline-block">About Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-xl font-semibold mb-6 text-vintage-gold">
              Visit Us
            </h3>
            <div className="space-y-4 text-base">
              <div className="flex items-start space-x-3 group">
                <MapPin className="h-5 w-5 mt-1 text-vintage-gold group-hover:scale-110 transition-transform" />
                <span className="text-gray-200 leading-relaxed">
                  College Street, Shyama Charan Dey Area,<br />
                  Kolkata, West Bengal 700073
                </span>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer">
                <Phone className="h-5 w-5 text-yellow-400 group-hover:scale-110 transition-transform" />
                <span className="text-gray-200 group-hover:text-yellow-400 transition-colors">+91 33 2241 5678</span>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer">
                <Mail className="h-5 w-5 text-vintage-gold group-hover:scale-110 transition-transform" />
                <span className="text-gray-200 group-hover:text-vintage-gold transition-colors">books@boipara.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 mt-12 pt-8 text-center">
          <p className="text-base text-gray-300 font-medium">
            © 2024 <span className="text-vintage-gold font-semibold">Boi Para</span>. All rights reserved. | Proudly serving book lovers since 1952
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;