import { Wifi, Battery } from 'lucide-react';

export default function StatusBar() {
  return (
    <div className="h-[44px] px-[20px] flex items-center justify-between relative z-10 bg-transparent shrink-0">
      <div className="text-[13px] font-semibold text-text">9:41</div>
      <div className="flex items-center gap-2 text-text2">
        <Wifi size={14} />
        <Battery size={14} />
      </div>
    </div>
  );
}
