import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Quote, RefreshCw, Heart } from 'lucide-react';

const quotes = [
  {
    text: "একটি বই হাজার বন্ধুর চেয়ে ভাল।",
    author: "রবীন্দ্রনাথ ঠাকুর",
    book: "গীতাঞ্জলি"
  },
  {
    text: "A room without books is like a body without a soul.",
    author: "Marcus Tullius Cicero",
    book: "Classical Wisdom"
  },
  {
    text: "বই পড়া মানে অন্যের চোখ দিয়ে জগৎ দেখা।",
    author: "শরৎচন্দ্র চট্টোপাধ্যায়",
    book: "দেবদাস"
  },
  {
    text: "Books are a uniquely portable magic.",
    author: "Stephen King",
    book: "On Writing"
  },
  {
    text: "জ্ঞানই শক্তি, আর বই জ্ঞানের ভাণ্ডার।",
    author: "কাজী নজরুল ইসলাম",
    book: "সাধনা"
  },
  {
    text: "The more that you read, the more things you will know.",
    author: "Dr. Seuss",
    book: "I Can Read With My Eyes Shut!"
  }
];

const BookQuotes = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(nextQuote, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-r from-vintage-brown/5 via-vintage-burgundy/5 to-vintage-sepia/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Quote className="h-8 w-8 text-vintage-gold" />
            <h2 className="font-serif text-3xl font-bold text-vintage-brown">
              Literary Inspirations
            </h2>
            <Quote className="h-8 w-8 text-vintage-gold rotate-180" />
          </div>

          <Card className={`bg-gradient-to-br from-white to-vintage-cream/30 border-0 shadow-2xl transition-all duration-500 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
            <CardContent className="p-12">
              <Quote className="h-12 w-12 text-vintage-gold/30 mx-auto mb-6" />
              
              <blockquote className="text-2xl md:text-3xl font-serif text-vintage-brown leading-relaxed mb-8 italic">
                "{quotes[currentQuote].text}"
              </blockquote>
              
              <div className="space-y-2">
                <p className="text-lg font-semibold text-vintage-burgundy">
                  — {quotes[currentQuote].author}
                </p>
                <p className="text-sm text-vintage-brown/70">
                  from "{quotes[currentQuote].book}"
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 mt-8">
                <Button
                  onClick={nextQuote}
                  variant="outline"
                  className="border-vintage-gold text-vintage-brown hover:bg-vintage-gold hover:text-vintage-brown"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Next Quote
                </Button>
                <Button
                  variant="ghost"
                  className="text-vintage-brown hover:bg-vintage-gold/10"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Save Quote
                </Button>
              </div>

              <div className="flex justify-center gap-2 mt-6">
                {quotes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuote(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentQuote ? 'bg-vintage-gold w-8' : 'bg-vintage-brown/30'
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BookQuotes;