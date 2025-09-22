import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wheat, Users, TrendingUp, MapPin } from "lucide-react";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const Index = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  return <div className="min-h-screen bg-gradient-to-br from-field to-background">
      {/* Header */}
      <header className="w-full p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Wheat className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">{t('appTitle')}</h1>
          </div>
          <div className="flex items-center space-x-3">
            <LanguageSwitcher />
            <Button variant="ghost" onClick={() => navigate("/login")} className="text-slate-50 bg-green-700 hover:bg-green-600 rounded-sm">
              {t('signIn')}/{t('getStarted')}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground">
            {t('smartFarming')}
            <span className="block text-primary">{t('simplified')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('landingDescription')}
          </p>
          <div className="space-x-4">
            <Button size="lg" onClick={() => navigate("/signup")} className="px-8 py-3 text-lg">
              {t('joinCommunity')}
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/login")} className="px-8 py-3 text-lg">
              {t('signIn')}
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle className="text-xl">{t('connectFarmers')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                {t('connectDescription')}
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle className="text-xl">{t('trackCrops')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                {t('trackDescription')}
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle className="text-xl">{t('marketAccess')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                {t('marketDescription')}
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>;
};

export default Index;