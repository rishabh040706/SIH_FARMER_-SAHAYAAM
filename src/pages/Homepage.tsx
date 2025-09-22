import React, { useState } from 'react';
import { Home, Search, Mic, User, Leaf, Bug, ShoppingCart, Calendar, BookOpen, Bell, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import CropRecommendationBot from '@/components/CropRecommendationBot';
import MarketBot from '@/components/MarketBot';
import DiseaseDetectionBot from '@/components/DiseaseDetectionBot';
import LanguageSwitcher from '@/components/LanguageSwitcher';
const Homepage = () => {
  const { t } = useTranslation();
  const [isCropBotOpen, setIsCropBotOpen] = useState(false);
  const [isMarketBotOpen, setIsMarketBotOpen] = useState(false);
  const [isDiseaseBotOpen, setIsDiseaseBotOpen] = useState(false);

  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b bg-green-700">
        <Home className="h-6 w-6 text-primary bg-slate-50 rounded-sm" />
        <h1 className="text-xl font-semibold text-slate-50">{t('appTitle')}</h1>
        <div className="flex items-center space-x-2">
          <LanguageSwitcher />
          <User className="h-6 w-6 text-primary bg-slate-50" />
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder={t('search')} className="pl-10 pr-12 py-3 text-lg" />
          <Button size="sm" variant="ghost" className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1">
            <Mic className="h-4 w-4" />
          </Button>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card 
            className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setIsCropBotOpen(true)}
          >
            <Leaf className="h-8 w-8 mx-auto mb-3 text-primary" />
            <h3 className="font-medium text-foreground">{t('cropRecommendation')}</h3>
            <p className="text-sm text-muted-foreground mt-1">Crop Recommendation</p>
          </Card>

          <Card 
            className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setIsDiseaseBotOpen(true)}
          >
            <Bug className="h-8 w-8 mx-auto mb-3 text-primary" />
            <h3 className="font-medium text-foreground">{t('diseaseDetection')}</h3>
            <p className="text-sm text-muted-foreground mt-1">Disease Detection</p>
          </Card>

          <Card 
            className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setIsMarketBotOpen(true)}
          >
            <ShoppingCart className="h-8 w-8 mx-auto mb-3 text-primary" />
            <h3 className="font-medium text-foreground">{t('market')}</h3>
            <p className="text-sm text-muted-foreground mt-1">Market</p>
          </Card>

          <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
            <Calendar className="h-8 w-8 mx-auto mb-3 text-primary" />
            <h3 className="font-medium text-foreground">{t('weatherForecast')}</h3>
            <p className="text-sm text-muted-foreground mt-1">Weather Forecast</p>
          </Card>

          <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
            <BookOpen className="h-8 w-8 mx-auto mb-3 text-primary" />
            <h3 className="font-medium text-foreground">{t('tutorials')}</h3>
            <p className="text-sm text-muted-foreground mt-1">Learning Center</p>
          </Card>

          <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
            <Bell className="h-8 w-8 mx-auto mb-3 text-primary" />
            <h3 className="font-medium text-foreground">{t('forum')}</h3>
            <p className="text-sm text-muted-foreground mt-1">Community Forum</p>
          </Card>
        </div>

        {/* Camera Button */}
        <div className="fixed bottom-6 right-6">
          <Button size="lg" className="rounded-full p-4 shadow-lg">
            <Camera className="h-6 w-6" />
          </Button>
        </div>

      <CropRecommendationBot 
        open={isCropBotOpen} 
        onOpenChange={setIsCropBotOpen}
      />
      <MarketBot 
        open={isMarketBotOpen} 
        onOpenChange={setIsMarketBotOpen}
      />
      <DiseaseDetectionBot 
        open={isDiseaseBotOpen} 
        onOpenChange={setIsDiseaseBotOpen}
      />
    </div>
  </div>;
};
export default Homepage;