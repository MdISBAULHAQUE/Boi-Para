import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const dismissPrompt = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  if (!showPrompt || localStorage.getItem('pwa-prompt-dismissed')) {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 bg-white border border-vintage-gold/30 rounded-lg shadow-xl p-4 max-w-sm z-40">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-vintage-brown">Install Boi Para</h3>
        <Button variant="ghost" size="sm" onClick={dismissPrompt}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <p className="text-sm text-vintage-brown/80 mb-3">
        Install our app for a better reading experience with offline access!
      </p>
      
      <Button
        onClick={handleInstall}
        className="w-full bg-vintage-brown hover:bg-vintage-burgundy text-white"
        size="sm"
      >
        <Download className="h-4 w-4 mr-2" />
        Install App
      </Button>
    </div>
  );
};

export default PWAInstallPrompt;