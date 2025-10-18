import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Accessibility, Plus, Minus, RotateCcw } from 'lucide-react';

const AccessibilityMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);

  const increaseFontSize = () => {
    const newSize = Math.min(fontSize + 10, 150);
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - 10, 80);
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.documentElement.classList.toggle('high-contrast');
  };

  const resetSettings = () => {
    setFontSize(100);
    setHighContrast(false);
    document.documentElement.style.fontSize = '100%';
    document.documentElement.classList.remove('high-contrast');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full w-12 h-12 bg-vintage-brown hover:bg-vintage-burgundy text-white shadow-lg"
        aria-label="Accessibility Menu"
      >
        <Accessibility className="h-6 w-6" />
      </Button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white border border-vintage-gold/30 rounded-lg shadow-xl p-4 min-w-[200px]">
          <h3 className="font-semibold text-vintage-brown mb-3">Accessibility</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-vintage-brown">Font Size</span>
              <div className="flex gap-1">
                <Button size="sm" variant="outline" onClick={decreaseFontSize}>
                  <Minus className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline" onClick={increaseFontSize}>
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <Button
              variant={highContrast ? "default" : "outline"}
              size="sm"
              onClick={toggleHighContrast}
              className="w-full"
            >
              High Contrast
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={resetSettings}
              className="w-full"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Reset
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityMenu;