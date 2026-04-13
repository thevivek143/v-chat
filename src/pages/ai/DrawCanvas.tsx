import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, CornerUpLeft, Trash2, Sparkles, Send, ScanText } from 'lucide-react';

export default function DrawCanvas() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#6C3CE1');
  const [brushSize, setBrushSize] = useState(4);
  
  const [desc, setDesc] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [arMode, setArMode] = useState(false);

  // Simulated canvas logic wrapper
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) return;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const touchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    
    // Minimal mock tracking
    ctx.beginPath();
    // In a real app we'd map coordinates properly bounding client rect
  };

  const touchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Native mouse bounds calculation
    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = (e as React.MouseEvent).clientX - rect.left;
      y = (e as React.MouseEvent).clientY - rect.top;
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const touchEnd = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setAiResponse(null);
    }
  };

  const handleAskAI = () => {
    // Simulate AI parsing
    setTimeout(() => {
      setAiResponse("I can see you've drawn what looks like a flowchart with 3 boxes. This appears to be a user login flow. Want me to help build this?");
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="absolute inset-0 bg-bg overflow-hidden flex flex-col z-50 pt-6"
    >
      <div className="px-4 pb-3 flex items-center justify-between border-b-[0.5px] border-border shrink-0 z-20 bg-bg">
        <div className="flex items-center gap-3">
          <motion.div whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="cursor-pointer">
            <ChevronLeft size={24} className="text-text" />
          </motion.div>
          <span className="text-[18px] font-bold text-text">Draw for AI</span>
        </div>
        
        <motion.div 
            whileTap={{ scale: 0.9 }} 
            onClick={() => setArMode(!arMode)}
            className={`w-[36px] h-[36px] flex items-center justify-center rounded-full cursor-pointer transition-colors ${arMode ? 'text-green-500 bg-green-500/10' : 'text-text3 bg-bg2'}`}
            title="Toggle AR Mode"
          >
            <ScanText size={18} />
          </motion.div>
      </div>

      <div className={`flex-1 relative transition-colors ${arMode ? 'bg-[#000000]/60 backdrop-blur-[2px]' : 'bg-white dark:bg-[#1C1C1E]'}`}>
         {arMode && (
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
             <span className="text-[32px] font-bold text-white tracking-[1em]">CAMERA VIEW</span>
           </div>
         )}
         <canvas 
            ref={canvasRef}
            width={window.innerWidth}
            height={window.innerHeight - 200}
            className="absolute inset-0 w-full h-[50dvh] touch-none"
            onMouseDown={touchStart}
            onMouseMove={touchMove}
            onMouseUp={touchEnd}
            onMouseLeave={touchEnd}
            onTouchStart={touchStart}
            onTouchMove={touchMove}
            onTouchEnd={touchEnd}
         />

         {aiResponse && (
            <motion.div 
              initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              className="absolute bottom-0 w-full h-[40vh] bg-bg rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.2)] p-6 flex flex-col z-20 border-t-[0.5px] border-border"
            >
               <div className="flex items-center gap-2 mb-4">
                  <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #6C3CE1, #06B6D4)' }}>
                     <Sparkles size={16} className="text-white" />
                  </div>
                  <span className="text-[16px] font-bold text-text">AI Analysis</span>
               </div>
               <p className="text-[15px] font-medium leading-relaxed text-text overflow-y-auto pr-2 pb-6">
                 {aiResponse}
               </p>
               <div className="mt-auto flex gap-3">
                  <button onClick={() => setAiResponse(null)} className="flex-1 bg-card2 border-[0.5px] border-border text-text font-bold py-3 rounded-[12px] text-[13px]">Close View</button>
                  <button className="flex-1 bg-primary text-white font-bold py-3 rounded-[12px] text-[13px] shadow-md">Build it</button>
               </div>
            </motion.div>
         )}
      </div>

      {!aiResponse && (
         <div className="shrink-0 bg-bg pb-6 pt-3 px-4 border-t-[0.5px] border-border flex flex-col gap-4 relative z-20">
           {/* Color Picker / Tools */}
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                 {['#000000', '#6C3CE1', '#06B6D4', '#EF4444', '#10B981'].map(c => (
                   <div 
                     key={c} 
                     onClick={() => setColor(c)}
                     className={`w-[26px] h-[26px] rounded-full cursor-pointer ${color === c ? 'ring-2 ring-offset-2 ring-offset-bg ring-primary' : ''}`}
                     style={{ background: c }}
                   />
                 ))}
              </div>
              <div className="flex items-center gap-4 text-text3">
                 <CornerUpLeft size={20} className="cursor-pointer" />
                 <Trash2 size={20} className="cursor-pointer" onClick={clearCanvas} />
              </div>
           </div>

           {/* Input Bar */}
           <div className="flex items-center gap-3">
             <input 
               type="text" 
               value={desc}
               onChange={e => setDesc(e.target.value)}
               placeholder="Describe what you drew..." 
               className="flex-1 h-[44px] bg-card border-[0.5px] border-border rounded-full px-4 outline-none text-[14px] text-text"
             />
             <button onClick={handleAskAI} className="bg-primary text-white font-bold px-5 h-[44px] rounded-full text-[13px] shadow-sm flex items-center gap-2 shrink-0">
                Ask AI <Sparkles size={14} />
             </button>
           </div>
         </div>
      )}
    </motion.div>
  );
}
