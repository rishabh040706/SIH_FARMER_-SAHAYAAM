import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Wheat, ArrowLeft } from "lucide-react";
import { useTranslation } from 'react-i18next';
import farmHero from "@/assets/farm-hero.jpg";
import PermissionRequest from "@/components/PermissionRequest";
import LanguageSwitcher from '@/components/LanguageSwitcher';
const Login = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("+91 ");
  const [otp, setOtp] = useState("");
  const [showPermissions, setShowPermissions] = useState(false);
  const navigate = useNavigate();
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.replace("+91 ", "").length === 10) {
      setStep("otp");
    }
  };
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      setShowPermissions(true);
    }
  };

  const handlePermissionsComplete = () => {
    setShowPermissions(false);
    navigate("/homepage");
  };
  const handleBackToPhone = () => {
    setStep("phone");
    setOtp("");
  };
  return <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative" style={{
    backgroundImage: `url(${farmHero})`
  }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-md p-6">
        <Card className="backdrop-blur-sm bg-card/95 border-0 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Wheat className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold text-foreground">
                  {t('welcomeBack')}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {step === "phone" ? t('enterPhone') : t('enterOTP')}
                </CardDescription>
              </div>
              <LanguageSwitcher />
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {step === "phone" ? <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('phoneNumber')}</Label>
                  <Input id="phone" type="tel" placeholder="+91 98765 43210" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="text-lg py-3" defaultValue="+91 " required />
                </div>
                <Button type="submit" className="w-full py-3 text-lg font-semibold" disabled={phoneNumber.replace("+91 ", "").length !== 10}>{t('codeSent')}</Button>
              </form> : <form onSubmit={handleOtpSubmit} className="space-y-4">
                <Button type="button" variant="ghost" onClick={handleBackToPhone} className="p-0 h-auto font-normal text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  {t('changePhoneNumber')}
                </Button>
                
                <div className="space-y-2">
                  <Label>{t('enterOTP')}</Label>
                  <div className="flex justify-center">
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    {t('codeSent')} {phoneNumber}
                  </p>
                </div>
                
                <Button type="submit" className="w-full py-3 text-lg font-semibold" disabled={otp.length !== 6}>
                  {t('signIn')}
                </Button>
                
                <Button type="button" variant="ghost" className="w-full">
                  {t('resendOTP')}
                </Button>
              </form>}
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {t('dontHaveAccount')}{" "}
                <button onClick={() => navigate("/signup")} className="text-primary hover:underline font-medium">
                  {t('signUp')}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <PermissionRequest 
        open={showPermissions}
        onComplete={handlePermissionsComplete}
      />
    </div>;
};
export default Login;