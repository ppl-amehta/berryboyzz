import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, MessageCircle } from 'lucide-react';
import { ConciergePersona, ChatMessage } from '../../types/concierge';
import { PersonaSwitcher } from './PersonaSwitcher';
import { openWhatsAppLead } from '../../utils/whatsapp';

const INITIAL_MESSAGES: Record<ConciergePersona, ChatMessage> = {
  investor: {
    id: 'inv-init',
    sender: 'ai',
    persona: 'investor',
    text: "Welcome! I am Dr. Berryboy's Investment Desk. I can help you evaluate our 50-Acre ₹4Cr Mega-Syndicate, 34-41% annualized project IRR, National Horticulture Board (NHB) subsidies, and 10-year off-take agreements. How can I assist your portfolio today?",
    timestamp: 'Just now',
    suggestedChips: [
      'Explain 50-Acre ₹4Cr Syndicate',
      'What is the typical IRR and payback timeline?',
      'How does the NHB ₹50L subsidy work?',
      'Escalate to Human Agronomist',
    ],
  },
  grower: {
    id: 'gro-init',
    sender: 'ai',
    persona: 'grower',
    text: "Hello, grower! I oversee Berryboyzz greenhouse operations. I can guide you through our clean European mother plants, soil-free coco-coir systems, natural plant probiotics, and 1,000+ plant starter greenhouse units. What is your current farm or land parcel?",
    timestamp: 'Just now',
    suggestedChips: [
      'Compare Polyhouse vs Polytunnel',
      'How does the 1,000 plant starter unit work?',
      'Explain Bacto-Slurry rhizosphere protocol',
      'Order Primocane tissue-culture saplings',
    ],
  },
  gourmet: {
    id: 'gou-init',
    sender: 'ai',
    persona: 'gourmet',
    text: "Hello, berry lover! I am your guide to farm-fresh berries. Explore our 14.2° Brix mountain raspberries, rare Himalayan long mulberries, fresh 125g vented punnets, and weekend harvest tastings in the Panchgani foothills. How can I delight you today?",
    timestamp: 'Just now',
    suggestedChips: [
      'Book Weekend Harvest Tasting Tour',
      'Order Fresh 125g Punnets to Mumbai/Pune',
      'Which berry variety has the highest Brix?',
      'View Chef Pairing Recipes',
    ],
  },
};

const KNOWLEDGE_RESPONSES: Record<string, string> = {
  'explain 50-acre':
    'Our 50-Acre Mega-Syndicate (₹40,000,000 total capital outlay) is our flagship turnkey partnership. It includes complete greenhouse construction, automated drip fertigation, on-farm 2°C forced-air cold storage, a resident Senior Agronomist, and a 10-year purchase contract with guaranteed monthly liquidation. Expected annual net EBITDA ranges between ₹2.8Cr and ₹4.2Cr at maturity.',
  'irr':
    'Commercial berry greenhouses in the Pune-Satara corridor consistently deliver 34% to 41% annualized IRR, with full capital payback achieved in 20 to 26 months. Because berries fruit continuously in multiple flushes and sell for ₹1,500 – ₹2,200/kg, they yield substantially higher margins than sugarcane or traditional grapes.',
  'subsidy':
    'The National Horticulture Board (NHB) offers up to a 50% capital subsidy on commercial polyhouses and micro-irrigation infrastructure (capped at ~₹50,00,000 per commercial agro-project). Berryboyzz prepares and files the complete Detailed Project Report (DPR) on your behalf.',
  'compare polyhouse':
    'Naturally Ventilated Polyhouses (NVPH, capex ~₹32L/acre) feature 200-micron anti-drip UV plastic and motorized vents for year-round production (14,500 kg/acre). Modular Polytunnels (~₹19.5L/acre) are 40% lower capex, deploy in 30 days, and are ideal for undulating terrace land.',
  '1,000 plant':
    'The 1,000+ Plant Starter Unit (₹4,85,000 turnkey) is our commercial pilot model for 0.25 to 0.5 acre. It includes 1,000 virus-indexed Primocane plants, pressure-regulated drip lines, 35L substrate grow bags, quarterly on-site agronomist visits, and guaranteed crop off-take.',
  'bacto-slurry':
    'Our proprietary Bacto-Liquid probiotic mixture (Bacillus, Trichoderma, Azospirillum) is fed through the drip lines into clean coco-coir. It acts as a biological shield against root rot, releases natural plant growth hormones, and maximizes berry sweetness.',
  'harvest tour':
    'Our Weekend Harvest & Tasting Experience runs every Saturday & Sunday (8:30 AM – 12:00 PM) at our flagship Wai-Panchgani farm. Walk through the polyhouses, hand-pick a 250g basket to take home, and evaluate natural sweetness on our digital refractometers.',
  'punnets':
    'We harvest at first morning light and deliver chilled 125g vented punnets via temperature-monitored refrigerated vans to Mumbai, Pune, and Goa within 24 hours of picking.',
  'highest brix':
    'Our Himalayan Long Mulberry (Shahtoot) is the sweetest at up to 19.5° – 21° Brix, followed by our Southern Highbush Blueberries (15.2° Brix) and Primocane Raspberries (14.2° Brix). Standard market field strawberries rarely exceed 8-9° Brix.',
};

export const AgenticConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentPersona, setCurrentPersona] = useState<ConciergePersona>('investor');
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGES.investor]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handlePersonaChange = (newPersona: ConciergePersona) => {
    setCurrentPersona(newPersona);
    setMessages((prev) => [
      ...prev,
      {
        id: `switch-${Date.now()}`,
        sender: 'system',
        text: `Switched mode to: ${newPersona.toUpperCase()} DESK`,
        timestamp: 'Just now',
      },
      INITIAL_MESSAGES[newPersona],
    ]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      let matchedResponse: string | null = null;

      if (lower.includes('escalate') || lower.includes('human') || lower.includes('speak') || lower.includes('phone') || lower.includes('whatsapp')) {
        matchedResponse = "Certainly! I am escalating your consultation directly to Dr. Salunkhe (Senior Operations Agronomist, Pune-Satara). Click below to start an instant WhatsApp conversation with your full inquiry attached.";
      } else {
        for (const [key, answer] of Object.entries(KNOWLEDGE_RESPONSES)) {
          if (lower.includes(key)) {
            matchedResponse = answer;
            break;
          }
        }
      }

      if (!matchedResponse) {
        matchedResponse =
          `I have recorded your query about "${query}". For specific land checks, water testing, or commercial syndicate allotment details, our on-duty agronomist is ready to chat on WhatsApp.`;
      }

      const botReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        persona: currentPersona,
        text: matchedResponse,
        timestamp: 'Just now',
        suggestedChips: [
          'Calculate my 2.5-Acre ROI',
          'Book Satara Harvest Visit',
          'Escalate to Human Agronomist on WhatsApp',
        ],
      };

      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Pill Trigger */}
      <aside aria-label="Berryboyzz AI Concierge" className="fixed bottom-6 right-6 z-40">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-purple-600 text-white font-medium text-xs shadow-2xl shadow-rose-950/30 hover:scale-105 active:scale-95 transition-all border border-rose-400/40"
          >
            <div className="relative">
              <Bot className="w-4 h-4 text-white" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <span className="font-mono tracking-wider">Dr. Berryboy · Concierge</span>
          </button>
        ) : null}
      </aside>

      {/* Expanded Modal Concierge Window */}
      {isOpen && (
        <aside aria-label="Berryboyzz Concierge Dialog" className="fixed bottom-6 right-6 z-50 w-full max-w-[92vw] sm:max-w-md h-[580px] max-h-[85vh] flex flex-col rounded-3xl bg-white dark:bg-[#0D1017] border border-stone-200 dark:border-zinc-700/80 shadow-2xl shadow-black/20 dark:shadow-black/80 overflow-hidden animate-fade-in text-stone-900 dark:text-zinc-100">
          {/* Header */}
          <div className="p-4 bg-stone-50 dark:bg-zinc-900/90 border-b border-stone-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-stone-900 dark:text-white font-mono">Dr. Berryboy AI</h4>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[10px] text-stone-500 dark:text-zinc-400 font-mono">Agronomy &amp; Investment Guide</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Close concierge"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Persona Switcher Deck */}
          <div className="p-3 bg-stone-50/70 dark:bg-zinc-950/60 border-b border-stone-200 dark:border-zinc-800/80">
            <PersonaSwitcher currentPersona={currentPersona} onSelectPersona={handlePersonaChange} />
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
            {messages.map((m) => {
              if (m.sender === 'system') {
                return (
                  <div key={m.id} className="text-center py-1 font-mono text-[10px] text-stone-400 dark:text-zinc-500 uppercase">
                    ── {m.text} ──
                  </div>
                );
              }

              const isAi = m.sender === 'ai';
              return (
                <div key={m.id} className={`flex flex-col ${isAi ? 'items-start' : 'items-end'} space-y-1`}>
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                      isAi
                        ? 'bg-stone-100 dark:bg-zinc-900/90 text-stone-800 dark:text-zinc-200 border border-stone-200 dark:border-zinc-800 rounded-tl-sm shadow-sm'
                        : 'bg-rose-600 text-white rounded-tr-sm shadow-md'
                    }`}
                  >
                    {m.text}
                  </div>

                  {/* Suggestion Chips */}
                  {isAi && m.suggestedChips && m.suggestedChips.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1 max-w-[90%]">
                      {m.suggestedChips.map((chip, cIdx) => (
                        <button
                          key={cIdx}
                          onClick={() => {
                            if (chip.toLowerCase().includes('whatsapp') || chip.toLowerCase().includes('escalate')) {
                              openWhatsAppLead({
                                leadSource: 'concierge_handoff',
                                customMessage: `Consulting Dr. Berryboy regarding: ${messages[messages.length - 1]?.text?.slice(0, 80)}`,
                              });
                            } else {
                              handleSendMessage(chip);
                            }
                          }}
                          className="px-2.5 py-1 rounded-full text-[10px] font-mono text-stone-700 dark:text-zinc-300 bg-stone-100 dark:bg-zinc-800/70 border border-stone-200 dark:border-zinc-700 hover:border-rose-500 hover:text-rose-600 dark:hover:text-white transition-all text-left shadow-sm"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-xl bg-stone-100 dark:bg-zinc-900/60 w-fit text-stone-400 dark:text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Escalation Banner to Human Agronomist on WhatsApp */}
          <div className="p-3 bg-stone-50 dark:bg-zinc-950/90 border-t border-stone-200 dark:border-zinc-800 flex items-center justify-between">
            <span className="text-[10px] font-mono text-stone-600 dark:text-zinc-400">
              Need on-site farm advice?
            </span>
            <button
              onClick={() =>
                openWhatsAppLead({
                  leadSource: 'concierge_handoff',
                  customMessage: 'Live chat escalation from Dr. Berryboy concierge desk',
                })
              }
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/40 hover:bg-emerald-200 dark:hover:bg-emerald-900/40 transition-colors shadow-sm"
            >
              <MessageCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>Escalate to Human Agronomist</span>
            </button>
          </div>

          {/* Input Field */}
          <div className="p-3 bg-white dark:bg-zinc-900 border-t border-stone-200 dark:border-zinc-800 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask Dr. Berryboy anything..."
              className="flex-1 bg-stone-50 dark:bg-zinc-950 border border-stone-200 dark:border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-zinc-500 focus:outline-none focus:border-rose-500"
            />
            <button
              onClick={() => handleSendMessage()}
              className="p-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition-colors shadow-sm"
              aria-label="Send query"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}
    </>
  );
};
