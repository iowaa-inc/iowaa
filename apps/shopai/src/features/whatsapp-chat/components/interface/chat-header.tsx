import CertifiedBadgeFill from '@/assets/icons/certified-badge.svg';
import { ArrowLeft } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/ui/avatar';

type WhatsappHeaderInfo = {
  avatarSrc?: string;
  name?: string; // defaults to Iowaa.shop
  showBadge?: boolean; // defaults to true
  businessType?: string; // defaults to "Business Account"
  fallback?: React.ReactNode; // Optional avatar fallback (default: AI)
};

type WhatsappChatHeaderProps = {
  children?: React.ReactNode;
  info?: WhatsappHeaderInfo;
};

export function ChatHeader({ children, info = {} }: WhatsappChatHeaderProps) {
  const {
    avatarSrc,
    name = 'Untitled',
    showBadge = true,
    businessType = 'Business Account',
    fallback,
  } = info;

  return (
    <div className="flex shrink-0 items-center gap-2 bg-[#202c33] px-2 py-2 pb-2">
      <ArrowLeft className="h-4 w-4" />

      <div className="mr-auto flex items-center gap-2">
        <Avatar className="size-8">
          {avatarSrc ? (
            <AvatarImage src={avatarSrc} alt={name} />
          ) : fallback ? (
            fallback
          ) : (
            <AvatarFallback className="bg-teal-600 text-xs text-teal-900">AI</AvatarFallback>
          )}
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <span className="text-sm text-white">{name}</span>
            {showBadge && <CertifiedBadgeFill className="h-3.5 w-3.5 text-blue-600" />}
          </div>
          {businessType && <div className="text-[11px] text-white/70">{businessType}</div>}
        </div>
      </div>

      <div className="jusify-center flex items-center gap-2">
        <svg
          className="size-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M21 16.42V19.9561C21 20.4811 20.5941 20.9167 20.0705 20.9537C19.6331 20.9846 19.2763 21 19 21C10.1634 21 3 13.8366 3 5C3 4.72371 3.01545 4.36687 3.04635 3.9295C3.08337 3.40588 3.51894 3 4.04386 3H7.5801C7.83678 3 8.05176 3.19442 8.07753 3.4498C8.10067 3.67907 8.12218 3.86314 8.14207 4.00202C8.34435 5.41472 8.75753 6.75936 9.3487 8.00303C9.44359 8.20265 9.38171 8.44159 9.20185 8.57006L7.04355 10.1118C8.35752 13.1811 10.8189 15.6425 13.8882 16.9565L15.4271 14.8019C15.5572 14.6199 15.799 14.5573 16.001 14.6532C17.2446 15.2439 18.5891 15.6566 20.0016 15.8584C20.1396 15.8782 20.3225 15.8995 20.5502 15.9225C20.8056 15.9483 21 16.1633 21 16.42Z"></path>
        </svg>
        <svg
          className="size-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"></path>
        </svg>
      </div>
      {children}
    </div>
  );
}
