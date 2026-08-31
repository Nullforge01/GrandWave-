// Line-style SVG icon symbols used across GrandWave. No emoji, ever.
type IconProps = { size?: number; color?: string };

const base = (children: React.ReactNode, { size = 18, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

export const WaveIcon = (p: IconProps) => base(<path d="M1 12c1.5-4 3-4 4.5 0s3 4 4.5 0 3-4 4.5 0 3 4 4.5 0 3-4 4.5 0" />, p);
export const PlugIcon = (p: IconProps) => base(<><path d="M8 3v4M16 3v4M6 7h12v3a6 6 0 0 1-12 0V7Z" /><path d="M12 16v5" /></>, p);
export const FilmIcon = (p: IconProps) => base(<><rect x="3.5" y="5" width="17" height="14" rx="2" /><path d="M8 5v14M16 5v14" /></>, p);
export const LinkIcon = (p: IconProps) => base(<><path d="M9 15 15 9" /><path d="M11 6l1-1a4 4 0 0 1 6 6l-1 1" /><path d="M13 18l-1 1a4 4 0 0 1-6-6l1-1" /></>, p);
export const CheckIcon = (p: IconProps) => base(<><rect x="4" y="4" width="16" height="16" rx="4" /><path d="m8.5 12 2.5 2.5L16 9.5" /></>, p);
export const MapIcon = (p: IconProps) => base(<path d="M9 18 3 21V6l6-3 6 3 6-3v15l-6 3-6-3Z" />, p);
export const EyeIcon = (p: IconProps) => base(<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></>, p);
export const PlusIcon = (p: IconProps) => base(<path d="M12 5v14M5 12h14" />, p);
export const ChatIcon = (p: IconProps) => base(<><path d="M21 12a8 8 0 1 1-3.4-6.5" /><path d="M21 4l-6.5 6.5" /></>, p);
