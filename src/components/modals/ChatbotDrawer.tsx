import React, { useState } from 'react';
import { IntakeFormData, ScorecardData } from '../../types';
import { CARLOS_AVATAR_URL } from '../../data/mockData';

interface ChatbotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyIntake: (data: Partial<IntakeFormData>) => void;
  onNavigateToAssess: () => void;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
  time: string;
  suggestedAction?: {
    label: string;
    action: () => void;
  };
}

export const ChatbotDrawer: React.FC<ChatbotDrawerProps> = ({
  isOpen,
  onClose,
  onApplyIntake,
  onNavigateToAssess
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'Hello, I am the Monkyfi Atlas Intake Copilot. I can help assess your telecom operational posture, extract key infrastructure parameters, and prepare your AI Readiness Scorecard in real-time. What kind of network topology or primary operational bottleneck are you working with?',
      time: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText =
        'Got it. I have mapped your operational profile against our telecom knowledge base. We recommend focusing on NOC Level-1 ticket automation and proactive alarm deduplication.';
      
      const lower = text.toLowerCase();
      if (lower.includes('fiber') || lower.includes('nodes') || lower.includes('5000') || lower.includes('ran')) {
        replyText =
          'Understood. For a hybrid network of this scale, data silos between legacy BSS/OSS and optical monitoring create up to 42% redundant truck rolls. I have pre-configured an assessment profile for you.';
        onApplyIntake({
          operationType: 'Network Operations',
          networkSize: '5000',
          painPoints: ['Faster incident resolution', 'Predictive maintenance', 'Legacy system integration']
        });
      } else if (lower.includes('alarm') || lower.includes('incident') || lower.includes('triage')) {
        replyText =
          'Alarm flood reduction is Atlas’s primary specialty. Sentinel integration allows automatic correlation of telemetry without modifying your underlying core switches.';
        onApplyIntake({
          painPoints: ['Faster incident resolution', 'Less manual service delivery']
        });
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedAction: {
            label: 'Review Full Intake Form',
            action: () => {
              onClose();
              onNavigateToAssess();
            }
          }
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const quickPrompts = [
    'We manage 4,500 optical nodes with legacy BSS',
    'Too many manual ticket handoffs in NOC',
    'Evaluate predictive maintenance feasibility'
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-all">
      <div className="w-full max-w-lg bg-[#121520] border-l border-white/10 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Chat Header */}
        <div className="p-4 border-b border-white/10 bg-[#1b2029] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#5d4210] border border-[#e9c083] flex items-center justify-center overflow-hidden">
              <img src={CARLOS_AVATAR_URL} alt="Atlas Bot" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm text-[#e9feff]">Monkyfi Atlas Copilot</h3>
                <span className="w-2 h-2 rounded-full bg-[#00f5ff] animate-ping" />
              </div>
              <p className="font-mono text-[11px] text-[#e9c083]">Human-Led Telecom Intelligence</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10 text-[#849495] hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-sm">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-xl ${
                  msg.sender === 'user'
                    ? 'bg-[#00f5ff] text-[#003739] font-medium rounded-tr-none'
                    : 'bg-[#1b2029] border border-white/10 text-[#dfe2f0] rounded-tl-none leading-relaxed'
                }`}
              >
                {msg.text}

                {msg.suggestedAction && (
                  <button
                    onClick={msg.suggestedAction.action}
                    className="mt-3 block w-full text-center bg-[#00f5ff]/20 text-[#00f5ff] border border-[#00f5ff]/40 py-1.5 px-3 rounded font-mono text-xs font-bold hover:bg-[#00f5ff] hover:text-[#003739] transition-all cursor-pointer"
                  >
                    {msg.suggestedAction.label} →
                  </button>
                )}
              </div>
              <span className="text-[10px] font-mono text-[#849495] mt-1 px-1">{msg.time}</span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs font-mono text-[#e9c083] bg-[#1b2029] p-3 rounded-lg w-36 border border-white/10">
              <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
              Atlas analyzing...
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 bg-[#0a0e17] border-t border-white/10 flex gap-2 overflow-x-auto">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] font-mono whitespace-nowrap bg-[#1b2029] border border-white/10 text-[#b9caca] hover:text-[#00f5ff] hover:border-[#00f5ff]/50 px-2.5 py-1 rounded transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-white/10 bg-[#171c25]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Describe your telecom infrastructure..."
              className="flex-1 bg-[#0a0e17] border border-white/10 rounded-lg p-2.5 text-xs text-[#dfe2f0] focus:border-[#00f5ff] outline-none font-sans"
            />
            <button
              type="submit"
              className="bg-[#00f5ff] text-[#003739] p-2.5 rounded-lg font-bold hover:bg-[#63f7ff] transition-all cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-lg">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
