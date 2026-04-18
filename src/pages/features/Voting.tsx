import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Check } from 'lucide-react';
import { useFeaturesStore } from '../../store/features.store';

export default function Voting() {
  const navigate = useNavigate();
  const { polls, userVotes, vote } = useFeaturesStore();

  return (
    <div className="w-full flex-col flex bg-bg relative min-h-[100dvh]">
      {/* Header */}
      <div className="sticky top-0 z-20 h-[60px] flex items-center justify-between px-3 bg-bg2/80 backdrop-blur-md border-b-[0.5px] border-border shrink-0">
        <div className="flex items-center gap-2">
          <motion.div whileTap={{ scale: 0.9 }} className="p-1 cursor-pointer" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} className="text-text" />
          </motion.div>
          <span className="text-[18px] font-bold text-text">Community Voting</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-10 pt-4" style={{ scrollbarWidth: 'none' }}>
        
        <h3 className="text-[13px] font-bold text-text3 uppercase tracking-wide mb-3">Active Polls</h3>
        
        <div className="flex flex-col gap-4 mb-6">
          {polls.filter(p => p.status === 'active').map((poll) => {
            const userVote = userVotes[poll.id];
            const hasVoted = !!userVote;
            
            return (
              <div key={poll.id} className="bg-card rounded-[16px] p-4 flex flex-col shadow-sm border-[0.5px] border-border">
                <h4 className="text-[15px] font-bold text-text mb-1.5 leading-snug">{poll.question}</h4>
                <div className="flex justify-between items-center text-[11px] text-text3 mb-3">
                  <span>Total: {poll.totalVotes} votes</span>
                  <span className={`font-medium ${new Date(poll.deadline) < new Date() ? 'text-red' : 'text-primary'}`}>
                    {new Date(poll.deadline) < new Date() ? 'Ended' : `Ends ${new Date(poll.deadline).toLocaleDateString()}`}
                  </span>
                </div>
                
                <div className="flex flex-col gap-3">
                  {poll.options.map((option) => {
                    const isVotedOption = userVote === option.id;
                    const showResults = hasVoted;
                    
                    return (
                      <div key={option.id} className="flex flex-col gap-1">
                        {showResults ? (
                          <>
                            <div className="flex justify-between items-center text-[12px]">
                              <span className={`font-semibold flex items-center gap-1.5 ${isVotedOption ? 'text-primary' : 'text-text2'}`}>
                                {option.text} {isVotedOption && <Check size={14} className="text-primary" />}
                              </span>
                              <span className={`font-bold ${isVotedOption ? 'text-primary' : 'text-text2'}`}>{option.percentage}%</span>
                            </div>
                            <div className="w-full h-[8px] bg-card2 rounded-[4px] overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }} 
                                animate={{ width: `${option.percentage}%` }} 
                                transition={{ duration: 1 }} 
                                className={`h-full rounded-[4px] ${isVotedOption ? 'bg-primary' : 'bg-text3'}`} 
                              />
                            </div>
                          </>
                        ) : (
                          <motion.button 
                            className="w-full bg-card2 border-[0.5px] border-border2 p-3 rounded-[12px] text-[13px] font-medium text-text text-left hover:bg-border transition-colors flex justify-between items-center"
                            whileTap={{ scale: 0.98 }}
                            onClick={() => vote(poll.id, option.id)}
                          >
                            <span>{option.text}</span>
                            <span className="text-[11px] text-text3">{option.percentage}%</span>
                          </motion.button>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                {hasVoted && (
                  <div className="mt-4 pt-3 border-t-[0.5px] border-border2">
                    <span className="text-[11px] font-medium text-text3">
                      You voted {poll.options.find(o => o.id === userVote)?.text} ✓
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <h3 className="text-[13px] font-bold text-text3 uppercase tracking-wide mb-3">Past Polls</h3>
        
        <div className="flex flex-col gap-3">
          {polls.filter(p => p.status === 'closed').map((poll) => {
            const winner = poll.options.reduce((prev, current) => (prev.votes > current.votes) ? prev : current);
            return (
              <div key={poll.id} className="bg-card2 rounded-[16px] p-4 flex justify-between items-center border-[0.5px] border-border shadow-sm opacity-70">
                <div className="flex flex-col">
                  <span className="text-[14px] font-semibold text-text">{poll.question}</span>
                  <span className="text-[12px] text-green font-medium mt-0.5">Passed — {winner.text} {winner.percentage}%</span>
                </div>
                <span className="text-[11px] text-text3 leading-tight text-right">
                  {new Date(poll.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}<br/>{poll.totalVotes} votes
                </span>
              </div>
            );
          })}
        </div>
        
      </div>
    </div>
  );
}
