import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Settings, Save, Database, Mail, Shield, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'Boi Para',
    siteDescription: 'Your Literary Paradise in College Street',
    adminEmail: 'admin@boipara.com',
    supportEmail: 'support@boipara.com',
    enableRegistration: true,
    enableNotifications: true,
    enableReviews: true,
    maintenanceMode: false,
    maxFileSize: '5',
    sessionTimeout: '30',
    backupFrequency: 'daily'
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "System settings have been updated successfully."
    });
  };

  const handleBackup = () => {
    toast({
      title: "Backup Started",
      description: "Database backup has been initiated."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vintage-sepia/10 via-vintage-cream/20 to-vintage-brown/5">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/admin" className="inline-flex items-center gap-2 text-vintage-brown hover:text-vintage-burgundy transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
        
        <div className="text-center mb-10">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-gray-500/20 to-vintage-brown/20 rounded-full mb-4">
            <h1 className="font-serif text-xl font-bold text-vintage-brown">
              ⚙️ System Settings
            </h1>
          </div>
          <p className="text-vintage-brown/70 text-sm max-w-md mx-auto">Configure platform settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* General Settings */}
          <Card className="bg-gradient-to-br from-white via-vintage-cream/10 to-vintage-sepia/5 shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-vintage-brown text-sm">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <Globe className="h-4 w-4 text-blue-600" />
                </div>
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="siteName">Site Name</Label>
                <Input 
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="siteDescription">Site Description</Label>
                <Input 
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="adminEmail">Admin Email</Label>
                <Input 
                  id="adminEmail"
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) => setSettings({...settings, adminEmail: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="supportEmail">Support Email</Label>
                <Input 
                  id="supportEmail"
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="bg-gradient-to-br from-white via-vintage-cream/10 to-vintage-sepia/5 shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-vintage-brown text-sm">
                <div className="p-2 bg-red-100 rounded-xl">
                  <Shield className="h-4 w-4 text-red-600" />
                </div>
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
                <Input 
                  id="maxFileSize"
                  type="number"
                  value={settings.maxFileSize}
                  onChange={(e) => setSettings({...settings, maxFileSize: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input 
                  id="sessionTimeout"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => setSettings({...settings, sessionTimeout: e.target.value})}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                <Switch 
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Feature Settings */}
          <Card className="bg-gradient-to-br from-white via-vintage-cream/10 to-vintage-sepia/5 shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-vintage-brown text-sm">
                <div className="p-2 bg-green-100 rounded-xl">
                  <Settings className="h-4 w-4 text-green-600" />
                </div>
                Feature Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="enableRegistration">Enable User Registration</Label>
                <Switch 
                  id="enableRegistration"
                  checked={settings.enableRegistration}
                  onCheckedChange={(checked) => setSettings({...settings, enableRegistration: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="enableNotifications">Enable Notifications</Label>
                <Switch 
                  id="enableNotifications"
                  checked={settings.enableNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, enableNotifications: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="enableReviews">Enable Book Reviews</Label>
                <Switch 
                  id="enableReviews"
                  checked={settings.enableReviews}
                  onCheckedChange={(checked) => setSettings({...settings, enableReviews: checked})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Database Settings */}
          <Card className="bg-gradient-to-br from-white via-vintage-cream/10 to-vintage-sepia/5 shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-vintage-brown text-sm">
                <div className="p-2 bg-purple-100 rounded-xl">
                  <Database className="h-4 w-4 text-purple-600" />
                </div>
                Database Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="backupFrequency">Backup Frequency</Label>
                <select 
                  id="backupFrequency"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={settings.backupFrequency}
                  onChange={(e) => setSettings({...settings, backupFrequency: e.target.value})}
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div className="space-y-2">
                <Button 
                  onClick={handleBackup}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Database className="h-4 w-4 mr-2" />
                  Create Backup Now
                </Button>
                <p className="text-sm text-gray-600">Last backup: Today at 3:00 AM</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        <div className="mt-8 text-center">
          <Button 
            onClick={handleSave}
            className="bg-vintage-brown hover:bg-vintage-burgundy text-white px-8 py-3 text-lg"
          >
            <Save className="h-5 w-5 mr-2" />
            Save All Settings
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SystemSettings;