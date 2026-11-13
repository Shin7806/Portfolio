import type { CSSProperties } from 'react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';
import { CircleCheckIcon, OctagonXIcon } from 'lucide-react';
import { useTheme } from '../../theme';

/** shadcn's Sonner wrapper, adapted to the site's own theme context and tokens. */
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme();
  return (
    <Sonner
      theme={theme}
      className="toaster group"
      position="bottom-center"
      icons={{ success: <CircleCheckIcon className="size-4" />, error: <OctagonXIcon className="size-4" /> }}
      style={{ '--normal-bg': 'var(--field)', '--normal-text': 'var(--ink)', '--normal-border': 'var(--line)', '--border-radius': '10px', fontFamily: 'var(--text)' } as CSSProperties}
      toastOptions={{ duration: 2400 }}
      {...props}
    />
  );
};

export { Toaster };
