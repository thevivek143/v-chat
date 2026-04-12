import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

export default function Tools() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="absolute inset-0 bg-bg overflow-y-auto flex flex-col z-50 pb-20 pt-6"
    >
      <div className="sticky top-0 z-20 px-4 pb-4 bg-bg/90 backdrop-blur-md flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <motion.div whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="cursor-pointer">
            <ChevronLeft size={24} className="text-text" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-[18px] font-bold text-text">Vchat Tools</span>
            <span className="text-[11px] font-medium text-text3">Powered by Vibox</span>
          </div>
        </div>
      </div>

      <div className="px-4 mt-6 flex flex-col gap-8">
        
        {/* PDF TOOLS */}
        <div>
          <h3 className="text-[14px] font-bold tracking-wider uppercase text-text3 mb-3">PDF Tools</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { i: '📄', n: 'Merge PDFs', d: 'Combine multiple' },
              { i: '✂️', n: 'Split PDF', d: 'Extract pages' },
              { i: '🗜️', n: 'Compress', d: 'Reduce size' },
              { i: '🔄', n: 'PDF to Word', d: 'Convert layout' }
            ].map((t, idx) => (
              <div key={idx} className="bg-card border-[0.5px] border-border rounded-[16px] p-3 flex flex-col shadow-sm">
                 <span className="text-[20px] mb-2">{t.i}</span>
                 <span className="text-[13px] font-bold text-text">{t.n}</span>
                 <span className="text-[10px] text-text3 font-medium mb-3">{t.d}</span>
                 <button className="bg-primary/10 text-primary-light text-[11px] font-bold py-1.5 rounded-[6px]">Try Free</button>
              </div>
            ))}
          </div>
        </div>

        {/* IMAGE TOOLS */}
        <div>
          <h3 className="text-[14px] font-bold tracking-wider uppercase text-text3 mb-3">Image Tools</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { i: '🖼️', n: 'Resize', d: 'Change dimensions' },
              { i: '🗜️', n: 'Compress', d: 'Reduce quality' },
              { i: '🔄', n: 'Convert', d: 'PNG/JPG/WEBP' },
              { i: '✂️', n: 'Remove BG', d: 'AI background cut' }
            ].map((t, idx) => (
              <div key={idx} className="bg-card border-[0.5px] border-border rounded-[16px] p-3 flex flex-col shadow-sm">
                 <span className="text-[20px] mb-2">{t.i}</span>
                 <span className="text-[13px] font-bold text-text">{t.n}</span>
                 <span className="text-[10px] text-text3 font-medium mb-3">{t.d}</span>
                 <button className="bg-primary/10 text-primary-light text-[11px] font-bold py-1.5 rounded-[6px]">Try Free</button>
              </div>
            ))}
          </div>
        </div>

        {/* OFFICE VIEWER */}
        <div className="bg-card border-[0.5px] border-border rounded-[20px] p-4 shadow-sm">
           <h3 className="text-[16px] font-bold text-text mb-1">Office Viewer</h3>
           <span className="text-[12px] font-medium text-text3 mb-4 block">Open any document securely</span>
           
           <div className="flex flex-col gap-3 mb-4">
             {[
               { icon: '📊', name: 'Q3_Report.xlsx', from: 'From Ankit' },
               { icon: '📝', name: 'Project_Brief.docx', from: 'From Priya' },
               { icon: '📊', name: 'Budget.pdf', from: 'From Work group' },
             ].map((doc, i) => (
               <div key={i} className="flex gap-3 items-center border-b-[0.5px] border-border pb-3 last:border-none last:pb-0">
                 <span className="text-[20px]">{doc.icon}</span>
                 <div className="flex flex-col">
                   <span className="text-[13px] font-bold text-text">{doc.name}</span>
                   <span className="text-[11px] font-medium text-text3">{doc.from}</span>
                 </div>
               </div>
             ))}
           </div>
           
           <button className="w-full bg-card2 border-[0.5px] border-border text-text font-bold text-[13px] py-2.5 rounded-[12px]">Open from Files</button>
        </div>

        {/* MINI GAMES */}
        <div>
          <h3 className="text-[14px] font-bold tracking-wider uppercase text-text3 mb-3">Mini Games</h3>
          <div className="grid grid-cols-4 gap-2">
            {[
              { i: '🎮', n: '2048', d: 'Strategy' },
              { i: '🐍', n: 'Snake', d: 'Classic' },
              { i: '❓', n: 'Quiz', d: 'Knowledge' },
              { i: '🎯', n: 'Aim', d: 'Reflex' }
            ].map((t, idx) => (
              <div key={idx} className="bg-card border-[0.5px] border-border rounded-[16px] p-2 flex flex-col items-center justify-center shadow-sm">
                 <span className="text-[24px] mb-1">{t.i}</span>
                 <span className="text-[11px] font-bold text-text truncate w-full text-center">{t.n}</span>
                 <span className="text-[9px] text-text3 font-medium">{t.d}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
