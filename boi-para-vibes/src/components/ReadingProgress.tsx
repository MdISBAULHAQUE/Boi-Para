import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Target, Trophy, Calendar } from 'lucide-react';

const ReadingProgress = () => {
  const [yearlyGoal] = useState(50);
  const [booksRead] = useState(23);
  const [currentlyReading] = useState(3);
  const [pagesRead] = useState(8450);

  const progressPercentage = (booksRead / yearlyGoal) * 100;

  return (
    <section className="py-16 bg-gradient-to-br from-vintage-sepia/10 via-vintage-cream/20 to-vintage-gold/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-vintage-brown mb-4">
            Your Reading Journey
          </h2>
          <p className="text-lg text-vintage-brown/80 max-w-2xl mx-auto">
            Track your progress and celebrate your literary achievements
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="bg-blue-500 p-3 rounded-full w-fit mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-700 mb-2">{booksRead}</h3>
              <p className="text-blue-600 font-medium">Books Read</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="bg-green-500 p-3 rounded-full w-fit mx-auto mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-green-700 mb-2">{yearlyGoal}</h3>
              <p className="text-green-600 font-medium">Yearly Goal</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="bg-purple-500 p-3 rounded-full w-fit mx-auto mb-4">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-purple-700 mb-2">{currentlyReading}</h3>
              <p className="text-purple-600 font-medium">Currently Reading</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="bg-orange-500 p-3 rounded-full w-fit mx-auto mb-4">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-orange-700 mb-2">{pagesRead.toLocaleString()}</h3>
              <p className="text-orange-600 font-medium">Pages Read</p>
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-2xl mx-auto bg-gradient-to-br from-white to-vintage-cream/30 border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h3 className="font-serif text-2xl font-bold text-vintage-brown mb-2">
                2024 Reading Challenge
              </h3>
              <p className="text-vintage-brown/70">
                {booksRead} of {yearlyGoal} books completed
              </p>
            </div>

            <div className="space-y-4">
              <Progress value={progressPercentage} className="h-4" />
              
              <div className="flex justify-between text-sm text-vintage-brown/70">
                <span>0 books</span>
                <span className="font-semibold text-vintage-brown">
                  {Math.round(progressPercentage)}% complete
                </span>
                <span>{yearlyGoal} books</span>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-vintage-brown/80 mb-4">
                You're {yearlyGoal - booksRead} books away from your goal!
              </p>
              <Button className="bg-gradient-to-r from-vintage-gold to-yellow-400 text-vintage-brown font-semibold px-6 py-3 rounded-xl">
                Update Progress
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ReadingProgress;