import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MapPin, Camera, Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PermissionRequestProps {
  open: boolean;
  onComplete: () => void;
}

const PermissionRequest = ({ open, onComplete }: PermissionRequestProps) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  
  const permissions = [
    { icon: MapPin, key: 'location' },
    { icon: Camera, key: 'camera' },
    { icon: Bell, key: 'notifications' }
  ];

  const handleAllow = () => {
    if (step < permissions.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const currentPermission = permissions[step];
  const Icon = currentPermission.icon;

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('permissions.title')}</DialogTitle>
        </DialogHeader>
        <div className="text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">
              {t(`permissions.${currentPermission.key}.title`)}
            </h3>
            <p className="text-muted-foreground text-sm">
              {t(`permissions.${currentPermission.key}.description`)}
            </p>
          </div>
          <div className="space-y-2">
            <Button onClick={handleAllow} className="w-full">
              {t('permissions.allow')}
            </Button>
            <Button variant="ghost" onClick={onComplete} className="w-full">
              {t('permissions.skip')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PermissionRequest;