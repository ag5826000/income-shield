import { ShieldIcon } from 'lucide-react';

import { useAppConfig } from '@/hooks/useAppConfig';

export const Logo = (props: { hideLogoText?: boolean }) => {
  const AppConfig = useAppConfig();

  return (
    <div className="flex items-center gap-3">
      <ShieldIcon className="h-10 w-10 text-blue-600" />

      {!props.hideLogoText && (
        <span className="text-lg font-bold">{AppConfig.name}</span>
      )}
    </div>
  );
};
