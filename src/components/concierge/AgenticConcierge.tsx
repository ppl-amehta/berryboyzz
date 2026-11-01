import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, User, MessageCircle, ArrowUpRight, HelpCircle } from 'lucide-react';
import { ConciergePersona, ChatMessage } from '../../types/concierge';
import { PersonaSwitcher } from './PersonaSwitcher';
import { openWhatsAppLead } from '../../utils/whatsapp';

const INITIAL_MESSAGES: Record<ConciergePersona, ChatMessage> = {
  investor: {
    id: 'inv-init',
    sender: 'ai',
    persona: 'investor',
    text: "Welcome. I am Dr. Berryboy's Institutional Investment Desk. I can assist you with our 50-Acre ₹4Cr Mega-Syndicate, 34-41% project IRR calculations, National Horticulture Board (NHB) subsidies, and 10-year cold-chain off-take agreements in the Pune-Satara corridor. Where would you like to begin?",
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
    text: "Greetings, grower. I oversee Berryboyzz agronomic protocols. I can guide you through our imported Primocane F1 tissue-culture genetics, EC/pH targets (1.6 mS/cm, 5.8 pH), Bacto-Liquid rhizosphere slurries, and 1,000+ plant commercial polyhouse setups. What is your current land setup?",
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
    text: "Hello, culinary connoisseur! I am your guide to peak-ripeness Sahyadri berries. Explore our 14.2° Brix Primocane raspberries, exotic Himalayan long mulberries, fresh 125g vented punnets, and weekend harvest tastings in Wai-Panchgani. How can I delight your palate today?",
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
  // Investor answers
  'explain 50-acre':
    'Our 50-Acre Mega-Syndicate (₹40,000,000 total capital deployment) represents our highest-tier turnkey asset. It encompasses full Naturally Ventilated Polyhouse (NVPH) erection, automated solar-powered fertigation skids, on-site 2°C forced-air cold rooms, a resident Senior Agronomist, and a binding 10-year commercial off-take contract with guaranteed monthly liquidation. Mature annual net EBITDA ranges between ₹2.8Cr and ₹4.2Cr.',
  'irr':
    'Commercial berry CEA in the Pune-Satara micro-climate delivers 34% to 41% annualized IRR, with full capital breakeven achieved within 20 to 26 months. This dramatically outperforms traditional viticulture or sugarcane due to continuous multi-flush fruiting and premium off-take prices (₹1,500 – ₹2,200/kg).',
  'subsidy':
    'The National Horticulture Board (NHB) provides up to 50% capital investment subsidy for commercial polyhouse structures and modern micro-drip fertigation (capped at ~₹50,00,000 per commercial agro-project). Berryboyzz prepares and submits the complete Detailed Project Report (DPR) for single-window clearance.',

  // Grower answers
  'compare polyhouse':
    'Naturally Ventilated Polyhouses (NVPH, capex ~₹32L/acre) feature 200-micron anti-drip UV plastic and top motorized ridge vents, providing year-round protection and highest yield (14,500 kg/a). Modular Walk-in Polytunnels (~₹19.5L/acre) are 40% lower capex, deploy in 30 days, and are ideal for undulating Satara valley terraces.',
  '1,000 plant':
    'The 1,000+ Plant Starter Unit (₹4,85,000 turnkey) is our commercial launchpad for 0.25 to 0.5 acre. It includes 1,000 virus-indexed Primocane saplings, pressure-compensating drip manifolds, UV-treated 35L substrate grow bags, quarterly on-site agronomist audits, and 100% off-take purchase support.',
  'bacto-slurry':
    'Our proprietary Bacto-Liquid consortia (Bacillus subtilis, Trichoderma harzianum, Azospirillum) is fermented and dosed through drip lines into coco-coir substrate. It chelates micronutrients, maintains a sterile root-zone barrier against fungal wilt, and synthesizes natural Plant Growth Regulators (PGR) for cell expansion.',

  // Gourmet answers
  'harvest tour':
    'Our Gourmet Harvest & Tasting Tour runs every Saturday & Sunday (8:30 AM – 12:00 PM) at our flagship Wai-Panchgani farm. Includes walking through polyhouses with our agronomist, a complimentary 250g harvest basket you pluck yourself, and a guided Brix refractometer tasting session.',
  'punnets':
    'We harvest at first morning light and deliver fresh 125g vented punnets via temperature-controlled reefer vans to Mumbai, Pune, and Goa within 24 hours. Wholesale HORECA and private subscriber delivery are dispatched daily.',
  'highest brix':
    'Our Himalayan Long Mulberry (Shahtoot) records the highest sugar concentration at up to 19.5° – 21° Brix, followed by our Southern Highbush Blueberries (15.2° Brix) and Primocane Raspberries (14.2° Brix). Standard supermarket field strawberries rarely exceed 8-9° Brix.',
};

export const AgenticConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentPersona, setCurrentPersona] = useState<ConciergePersona>('investor');
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGES.investor]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Switch persona updates conversation initial state
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

    // Process intent
    setTimeout(() => {
      const lower = query.toLowerCase();
      let matchedResponse: string | null = null;

      // Check keyword triggers
      if (lower.includes('escalate') || lower.includes('human') || lower.includes('speak') || lower.includes('phone') || lower.includes('whatsapp')) {
        matchedResponse = "Certainly. I am escalating your consultation to Dr. Salunkhe (Senior Operations Agronomist, Pune-Satara). Click the button below to initiate an immediate direct WhatsApp discussion with your consultation transcript attached.";
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
          `I have logged your query regarding "${query}". For specific topographical site checks, soil chemistry tests, or formal syndicate allocation agreements, our on-duty agronomist is available directly on WhatsApp.`;
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
            className="group flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-purple-600 text-white font-medium text-xs shadow-2xl shadow-rose-950/80 hover:scale-105 active:scale-95 transition-all border border-rose-400/40"
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
        <aside aria-label="Berryboyzz Concierge Dialog" className="fixed bottom-6 right-6 z-50 w-full max-w-[92vw] sm:max-w-md h-[580px] max-h-[85vh] flex flex-col rounded-3xl bg-[#0D1017] border border-zinc-700/80 shadow-2xl shadow-black/80 overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="p-4 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-white font-mono">Dr. Berryboy AI</h4>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">Trained Agronomy & Investment Desk</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Close concierge"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Persona Switcher Deck */}
          <div className="p-3 bg-zinc-950/60 border-b border-zinc-800/80">
            <PersonaSwitcher currentPersona={currentPersona} onSelectPersona={handlePersonaChange} />
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
            {messages.map((m) => {
              if (m.sender === 'system') {
                return (
                  <div key={m.id} className="text-center py-1 font-mono text-[10px] text-zinc-400 uppercase">
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
                        ? 'bg-zinc-900/90 text-zinc-200 border border-zinc-800 rounded-tl-sm'
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
                          className="px-2.5 py-1 rounded-full text-[10px] font-mono text-zinc-300 bg-zinc-800/70 border border-zinc-700 hover:border-rose-500/60 hover:text-white transition-all text-left"
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
              <div className="flex items-center gap-1.5 p-3 rounded-xl bg-zinc-900/60 w-fit text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Escalation Banner to Human Agronomist on WhatsApp */}
          <div className="p-2.5 bg-zinc-950/90 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-400">
              Need immediate farm dispatch?
            </span>
            <button
              onClick={() =>
                openWhatsAppLead({
                  leadSource: 'concierge_handoff',
                  customMessage: 'Live chat escalation from Dr. Berryboy concierge desk',
                })
              }
              className="flex items-center gap-1 px-3 py-1 rounded-lg text-[10px] font-mono text-emerald-300 bg-emerald-950/40 border border-emerald-500/40 hover:bg-emerald-900/40 transition-colors"
            >
              <MessageCircle className="w-3 h-3 text-emerald-400" />
              <span>Escalate to Human Agronomist</span>
            </button>
          </div>

          {/* Input Field */}
          <div className="p-3 bg-zinc-900 border-t border-zinc-800 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask Dr. Berryboy anything..."
              className="flex-1 bg-zinc-950 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500/80"
            />
            <button
              onClick={() => handleSendMessage()}
              className="p-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition-colors"
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
