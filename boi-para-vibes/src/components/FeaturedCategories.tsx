import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, GraduationCap, Crown, Heart, Feather, Brain } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Bengali Literature",
    description: "Classic and contemporary Bengali works",
    bookCount: "2,450+",
    category: "Literature",
    icon: BookOpen,
    gradient: "from-vintage-burgundy to-red-600",
    bgGradient: "from-vintage-burgundy/10 to-red-100/20",
  },
  {
    name: "Academic Texts",
    description: "University textbooks and reference materials",
    bookCount: "3,200+",
    category: "Academic",
    icon: GraduationCap,
    gradient: "from-vintage-brown to-amber-700",
    bgGradient: "from-vintage-brown/10 to-amber-100/20",
  },
  {
    name: "Rare Collections",
    description: "First editions and vintage manuscripts",
    bookCount: "890+",
    category: "Rare",
    icon: Crown,
    gradient: "from-vintage-gold to-yellow-500",
    bgGradient: "from-vintage-gold/10 to-yellow-100/20",
  },
  {
    name: "Fiction & Novels",
    description: "Literary fiction from around the world",
    bookCount: "4,100+",
    category: "Fiction",
    icon: Heart,
    gradient: "from-vintage-sepia to-orange-600",
    bgGradient: "from-vintage-sepia/10 to-orange-100/20",
  },
  {
    name: "Poetry & Drama",
    description: "Verses and theatrical works",
    bookCount: "1,650+",
    category: "Poetry",
    icon: Feather,
    gradient: "from-purple-500 to-violet-600",
    bgGradient: "from-purple-100/20 to-violet-100/20",
  },
  {
    name: "Philosophy",
    description: "Philosophical treatises and essays",
    bookCount: "980+",
    category: "Philosophy",
    icon: Brain,
    gradient: "from-slate-600 to-gray-700",
    bgGradient: "from-slate-100/20 to-gray-100/20",
  },
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 bg-gradient-vintage">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-vintage-brown mb-4">
            Explore Our Collections
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From rare manuscripts to contemporary bestsellers, discover books that have shaped minds for generations
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 stagger-animation">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Link key={category.name} to={`/books?category=${encodeURIComponent(category.category)}`}>
                <Card 
                  className={`card-hover group cursor-pointer overflow-hidden border border-vintage-gold/20 h-full glass bg-gradient-to-br ${category.bgGradient} shadow-lg hover:shadow-2xl`}
                  style={{'--stagger-delay': index} as React.CSSProperties}
                >
                  <CardContent className="p-5 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                          <IconComponent className="h-7 w-7 text-white" />
                        </div>
                        <Badge className={`bg-gradient-to-r ${category.gradient} text-white px-3 py-1.5 text-xs font-bold shadow-md rounded-full hover:shadow-lg transition-shadow`}>
                          {category.bookCount}
                        </Badge>
                      </div>
                      
                      <h3 className="font-serif text-lg font-bold text-vintage-brown mb-3 group-hover:text-vintage-burgundy transition-all duration-300 leading-tight group-hover:scale-105">
                        {category.name}
                      </h3>
                      
                      <p className="text-vintage-brown/80 text-sm leading-relaxed mb-4">
                        {category.description}
                      </p>
                      
                      <div className="mt-auto">
                        <div className={`w-full h-2 bg-gradient-to-r ${category.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg transform scale-x-0 group-hover:scale-x-100`}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;