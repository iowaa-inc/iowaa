type WhatsappChatBodyProps = {
  children?: React.ReactNode;
};

export function ChatBody({ children }: WhatsappChatBodyProps) {
  return (
    <div className="min-h-0 w-full flex-1">
      <div className="h-full min-h-0 overflow-y-auto px-3 py-2" style={{ scrollbarWidth: 'none' }}>
        {/* For Webkit browsers */}
        <style>{`
                    .hide-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
        <div className="hide-scrollbar">{children}</div>
      </div>
    </div>
  );
}
