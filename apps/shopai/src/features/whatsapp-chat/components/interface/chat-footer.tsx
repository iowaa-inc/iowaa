import React from 'react';

type WhatsappChatFooterProps = {
  children?: React.ReactNode;
};

export function ChatFooter({ children }: WhatsappChatFooterProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<string>('');

  const hasText = inputValue.trim().length > 0;
  const shouldSwapIcons = isFocused && hasText;
  const slideCamera = shouldSwapIcons
    ? 'translate-x-8 opacity-0 pointer-events-none'
    : 'translate-x-0 opacity-100';
  const slideAttachment = shouldSwapIcons
    ? 'translate-x-8 opacity-100'
    : 'translate-x-0 opacity-100';

  return (
    <div className="flex shrink-0 items-center gap-1 bg-transparent px-4 pt-2 pb-3">
      <div className="relative flex flex-1 items-center rounded-full bg-white px-2 py-2 pr-3 transition-all duration-200">
        {/* Emoji button */}
        <svg
          className="mr-1 h-5 w-5 shrink-0 text-[#8696A0] transition-all duration-200 hover:text-black focus:outline-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M10.5199 19.8634C10.5955 18.6615 10.8833 17.5172 11.3463 16.4676C9.81124 16.3252 8.41864 15.6867 7.33309 14.7151L8.66691 13.2248C9.55217 14.0172 10.7188 14.4978 12 14.4978C12.1763 14.4978 12.3501 14.4887 12.5211 14.471C14.227 12.2169 16.8661 10.7083 19.8634 10.5199C19.1692 6.80877 15.9126 4 12 4C7.58172 4 4 7.58172 4 12C4 15.9126 6.80877 19.1692 10.5199 19.8634ZM19.0233 12.636C15.7891 13.2396 13.2396 15.7891 12.636 19.0233L19.0233 12.636ZM22 12C22 12.1677 21.9959 12.3344 21.9877 12.5L12.5 21.9877C12.3344 21.9959 12.1677 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM10 10C10 10.8284 9.32843 11.5 8.5 11.5C7.67157 11.5 7 10.8284 7 10C7 9.17157 7.67157 8.5 8.5 8.5C9.32843 8.5 10 9.17157 10 10ZM17 10C17 10.8284 16.3284 11.5 15.5 11.5C14.6716 11.5 14 10.8284 14 10C14 9.17157 14.6716 8.5 15.5 8.5C16.3284 8.5 17 9.17157 17 10Z"></path>
        </svg>
        {/* Text input */}
        <input
          type="text"
          placeholder="Message"
          value={inputValue}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full bg-transparent px-0 text-sm text-[#303030] outline-none placeholder:text-[#8696A0]"
          style={{ minHeight: 24 }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && inputValue.trim() !== '') {
              // you could optionally trigger "send"
              setInputValue('');
            }
          }}
        />
        {/* Trailing icons: both visible when idle; swap smoothly when typing */}
        <div className="ml-1 flex h-5 w-12 shrink-0 items-center justify-end gap-2 overflow-hidden">
          {/* Attachment icon */}
          <svg
            className={`h-5 w-5 shrink-0 text-[#8696A0] transition-all duration-300 hover:text-black focus:outline-none ${slideAttachment}`}
            style={{ transition: 'transform 0.2s, opacity 0.2s' }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M14.8287 7.75737L9.1718 13.4142C8.78127 13.8047 8.78127 14.4379 9.1718 14.8284C9.56232 15.219 10.1955 15.219 10.586 14.8284L16.2429 9.17158C17.4144 8.00001 17.4144 6.10052 16.2429 4.92894C15.0713 3.75737 13.1718 3.75737 12.0002 4.92894L6.34337 10.5858C4.39075 12.5384 4.39075 15.7042 6.34337 17.6569C8.29599 19.6095 11.4618 19.6095 13.4144 17.6569L19.0713 12L20.4855 13.4142L14.8287 19.0711C12.095 21.8047 7.66283 21.8047 4.92916 19.0711C2.19549 16.3374 2.19549 11.9053 4.92916 9.17158L10.586 3.51473C12.5386 1.56211 15.7045 1.56211 17.6571 3.51473C19.6097 5.46735 19.6097 8.63317 17.6571 10.5858L12.0002 16.2427C10.8287 17.4142 8.92916 17.4142 7.75759 16.2427C6.58601 15.0711 6.58601 13.1716 7.75759 12L13.4144 6.34316L14.8287 7.75737Z"></path>
          </svg>
          {/* Camera icon */}
          <svg
            className={`h-5 w-5 shrink-0 text-[#8696A0] transition-all duration-300 hover:text-black focus:outline-none ${slideCamera}`}
            style={{ transition: 'transform 0.2s, opacity 0.2s' }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M14.4336 3C15.136 3 15.7869 3.36852 16.1484 3.9707L16.9209 5.25684C17.0113 5.40744 17.174 5.5 17.3496 5.5H19C20.6569 5.5 22 6.84315 22 8.5V18C22 19.6569 20.6569 21 19 21H5C3.34315 21 2 19.6569 2 18V8.5C2 6.84315 3.34315 5.5 5 5.5H6.65039C6.82602 5.5 6.98874 5.40744 7.0791 5.25684L7.85156 3.9707C8.21306 3.36852 8.86403 3 9.56641 3H14.4336ZM8.79492 6.28613C8.34311 7.03915 7.52855 7.5 6.65039 7.5H5C4.44772 7.5 4 7.94772 4 8.5V18C4 18.5523 4.44772 19 5 19H19C19.5523 19 20 18.5523 20 18V8.5C20 7.94772 19.5523 7.5 19 7.5H17.3496C16.4715 7.5 15.6569 7.03915 15.2051 6.28613L14.4336 5H9.56641L8.79492 6.28613ZM12 8.5C14.4853 8.5 16.5 10.5147 16.5 13C16.5 15.4853 14.4853 17.5 12 17.5C9.51472 17.5 7.5 15.4853 7.5 13C7.5 10.5147 9.51472 8.5 12 8.5ZM12 10.5C10.6193 10.5 9.5 11.6193 9.5 13C9.5 14.3807 10.6193 15.5 12 15.5C13.3807 15.5 14.5 14.3807 14.5 13C14.5 11.6193 13.3807 10.5 12 10.5Z"></path>
          </svg>
        </div>
      </div>
      {/* Send/Microphone button */}
      <button
        type="button"
        className={`ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white`}
        aria-label={inputValue.trim() ? 'Send' : 'Voice message'}
      >
        {inputValue.trim() ? (
          // Paper plane icon
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M3 12.9999H9V10.9999H3V1.84558C3 1.56944 3.22386 1.34558 3.5 1.34558C3.58425 1.34558 3.66714 1.36687 3.74096 1.40747L22.2034 11.5618C22.4454 11.6949 22.5337 11.9989 22.4006 12.2409C22.3549 12.324 22.2865 12.3924 22.2034 12.4381L3.74096 22.5924C3.499 22.7255 3.19497 22.6372 3.06189 22.3953C3.02129 22.3214 3 22.2386 3 22.1543V12.9999Z"></path>
          </svg>
        ) : (
          // Microphone icon
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M11.9998 1C14.7612 1 16.9998 3.23858 16.9998 6V10C16.9998 12.7614 14.7612 15 11.9998 15C9.23833 15 6.99976 12.7614 6.99976 10V6C6.99976 3.23858 9.23833 1 11.9998 1ZM3.05469 11H5.07065C5.55588 14.3923 8.47329 17 11.9998 17C15.5262 17 18.4436 14.3923 18.9289 11H20.9448C20.4837 15.1716 17.1714 18.4839 12.9998 18.9451V23H10.9998V18.9451C6.82814 18.4839 3.51584 15.1716 3.05469 11Z"></path>
          </svg>
        )}
      </button>
      {children}
    </div>
  );
}
