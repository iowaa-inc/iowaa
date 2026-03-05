import IosBatteryFullIcon from '@/assets/icons/ios-battery-full.svg';
import IosWifiIcon from '@/assets/icons/ios-wifi.svg';
import NetworkCellularSignalIcon from '@/assets/icons/network-cellular-signal.svg';

export function Iphone16StatusBar() {
  return (
    <div className="absolute top-0 right-0 left-0 z-10 flex h-11 flex-col items-stretch bg-transparent pt-2">
      <div className="flex flex-1 items-center justify-between pr-4 pl-6">
        <span className="text-xs font-semibold text-inherit">9:41</span>
        {/* iPhone 16 Dynamic Island */}
        <div className="relative flex h-6 items-start justify-center" style={{ minHeight: '24px' }}>
          <div
            className="absolute top-0 left-1/2 flex h-6 w-26 -translate-x-1/2 items-center justify-center rounded-full border border-black/30 bg-black shadow-lg shadow-black/25 transition-all"
            style={{
              // mimic the subtle 3D effect
              boxShadow: '0 2px 8px rgba(0,0,0,0.19)',
            }}
          >
            {/* Optional: Add camera and sensor spots to enhance realism */}
            <div className="flex h-full items-center gap-1.5 px-3">
              <div className="h-1.5 w-1.5 rounded-full bg-gray-800/60" />
              <div className="h-1 w-1 rounded-full bg-gray-700/80" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <NetworkCellularSignalIcon className="h-3.5 w-auto text-inherit" />
          <IosWifiIcon className="h-4! w-4! text-inherit" />
          <IosBatteryFullIcon className="h-4! w-4! text-inherit" />
        </div>
      </div>
    </div>
  );
}
