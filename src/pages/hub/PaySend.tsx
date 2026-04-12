import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Search, Delete, ArrowRight } from 'lucide-react';
import { mockContacts } from '../../data/hub.data';

export default function PaySend() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('To Contact');
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [amount, setAmount] = useState('');

  const handleNum = (num: string) => {
    if (amount === '0') setAmount(num);
    else setAmount(prev => prev + num);
  };

  const handleBackspace = () => {
    setAmount(prev => prev.slice(0, -1));
  };

  if (selectedContact) {
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
        className="absolute inset-0 bg-bg z-50 flex flex-col pt-10 pb-6"
      >
        <div className="absolute top-0 w-full px-4 pt-6 pb-4 flex items-center justify-between">
          <motion.div whileTap={{ scale: 0.9 }} onClick={() => setSelectedContact(null)} className="cursor-pointer">
            <ChevronLeft size={24} className="text-text" />
          </motion.div>
        </div>

        <div className="flex flex-col items-center mt-6">
          <div className="w-[60px] h-[60px] rounded-full flex justify-center items-center mb-3" style={{ background: selectedContact.grad }}>
            <span className="text-[20px] font-bold text-white tracking-widest">{selectedContact.initials}</span>
          </div>
          <span className="text-[18px] font-bold text-text">Paying {selectedContact.name}</span>
          <span className="text-[12px] text-text3 font-medium mt-1">vchat pay</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex items-center text-text mb-8">
            <span className="text-[32px] font-medium mr-2 text-text2 border-r border-border pr-3">₹</span>
            <span className={`text-[48px] font-bold ${amount.length > 0 ? 'text-text' : 'text-text/30'}`}>
              {amount || '0'}
            </span>
          </div>

          <div className="w-[70%] bg-card border-[0.5px] border-border rounded-[16px] px-4 py-3 text-center mb-10 mx-auto max-w-[300px]">
             <input type="text" placeholder="Add a note" className="bg-transparent border-none outline-none w-full text-center text-[14px] text-text" />
          </div>

          {/* NumPad */}
          <div className="grid grid-cols-3 gap-6 max-w-[280px] w-full mx-auto mb-10 text-[26px] font-medium text-text">
             {['1','2','3','4','5','6','7','8','9','','0'].map((digit, i) => (
               digit === '' ? <div key={i} /> : 
               <motion.div key={i} whileTap={{ scale: 0.8 }} onClick={() => handleNum(digit)} className="flex items-center justify-center h-16 w-16 mx-auto cursor-pointer rounded-full active:bg-card2">
                 {digit}
               </motion.div>
             ))}
             <motion.div whileTap={{ scale: 0.8 }} onClick={handleBackspace} className="flex items-center justify-center h-16 w-16 mx-auto cursor-pointer rounded-full active:bg-card2">
                <Delete size={28} className="text-text2" />
             </motion.div>
          </div>
        </div>

        <div className="px-6">
          <button 
            className={`w-full py-4 rounded-[16px] font-bold flex items-center justify-center gap-2 text-[16px] transition-all ${amount.length > 0 ? 'bg-primary text-white' : 'bg-card border-[0.5px] border-border text-text3 cursor-not-allowed'}`}
          >
            Send {amount.length > 0 ? `₹${amount}` : ''} <ArrowRight size={18} />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="absolute inset-0 bg-bg overflow-y-auto flex flex-col z-50 pb-10"
    >
      <div className="sticky top-0 z-20 px-4 pt-6 pb-2 bg-bg/90 backdrop-blur-md flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <motion.div whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="cursor-pointer">
            <ChevronLeft size={24} className="text-text" />
          </motion.div>
          <span className="text-[18px] font-bold text-text">Send Money</span>
        </div>

        <div className="flex gap-4">
          <div onClick={() => setActiveTab('To Contact')} className="cursor-pointer relative pb-2">
            <span className={`text-[15px] font-semibold ${activeTab === 'To Contact' ? 'text-primary' : 'text-text3'}`}>To Contact</span>
            {activeTab === 'To Contact' && <motion.div layoutId="payTab" className="absolute bottom-0 w-full h-[3px] bg-primary rounded-t-lg" />}
          </div>
          <div onClick={() => setActiveTab('To UPI/Account')} className="cursor-pointer relative pb-2">
            <span className={`text-[15px] font-semibold ${activeTab === 'To UPI/Account' ? 'text-primary' : 'text-text3'}`}>To UPI/Account</span>
            {activeTab === 'To UPI/Account' && <motion.div layoutId="payTab" className="absolute bottom-0 w-full h-[3px] bg-primary rounded-t-lg" />}
          </div>
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="w-full h-[44px] bg-card border-[0.5px] border-border rounded-[16px] flex items-center px-4 gap-2 mb-6">
          <Search size={16} className="text-text3" />
          <input 
            type="text" 
            placeholder="Search contacts..." 
            className="bg-transparent border-none outline-none text-text text-[15px] w-full"
          />
        </div>

        <h3 className="text-[13px] font-bold tracking-wider uppercase text-text3 mb-4">Recent</h3>
        
        <div className="flex gap-4 overflow-x-auto pb-6" style={{ scrollbarWidth: 'none' }}>
           {mockContacts.map(c => (
             <div key={c.id} className="flex flex-col items-center gap-2 cursor-pointer shrink-0" onClick={() => setSelectedContact(c)}>
               <div className="w-[56px] h-[56px] rounded-full flex items-center justify-center shrink-0" style={{ background: c.grad }}>
                 <span className="text-[16px] font-bold tracking-widest text-white">{c.initials}</span>
               </div>
               <span className="text-[11px] font-medium text-text2 max-w-[60px] text-center truncate">{c.name.split(' ')[0]}</span>
             </div>
           ))}
        </div>

        <h3 className="text-[13px] font-bold tracking-wider uppercase text-text3 mb-4 mt-2">All Contacts</h3>
        <div className="flex flex-col">
          {mockContacts.map(c => (
            <div key={c.id} className="flex items-center gap-4 py-3 cursor-pointer border-b-[0.5px] border-border" onClick={() => setSelectedContact(c)}>
              <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center shrink-0" style={{ background: c.grad }}>
                 <span className="text-[12px] font-bold tracking-widest text-white">{c.initials}</span>
              </div>
              <div className="flex flex-col text-left">
                 <span className="text-[15px] font-bold text-text mb-0.5">{c.name}</span>
                 <span className="text-[12px] text-text3 font-medium">Last paid {c.lastPaid}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
