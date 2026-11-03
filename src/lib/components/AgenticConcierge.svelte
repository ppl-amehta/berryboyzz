<script lang="ts">
  import { onMount } from 'svelte';
  import { MessageCircle, X, Send, Sparkles, ChevronRight, RefreshCw, UserCheck, PhoneCall, CheckCircle2 } from '@lucide/svelte';
  import { buildWhatsAppUrl } from '#utils/whatsapp';

  interface ChatMessage {
    id: string;
    sender: 'user' | 'assistant';
    text: string;
    timestamp: string;
    richCard?: any;
    leadToken?: string;
  }

  let isOpen = $state(false);
  let activeTab = $state<'chat' | 'presets'>('chat');
  let inputMessage = $state('');
  let isSending = $state(false);
  let sessionId = $state('');
  let currentLeadToken = $state('BB-PORTAL');
  let messages = $state<ChatMessage[]>([]);
  let chatScrollContainer: HTMLDivElement | null = $state(null);

  const QUICK_PROMPTS = [
    { label: '📊 1-Acre Polyhouse ROI', query: 'What is the capex, yield, and net EBITDA for a 1-acre naturally ventilated polyhouse in Maharashtra?' },
    { label: '💧 Borewell Water Audit', query: 'I have borewell water with 750 TDS and pH 7.8. Can I grow raspberries or blueberries?' },
    { label: '🍓 Cultivar Specs & Brix', query: 'Tell me about Autumn Bliss Raspberry and Biloxi Blueberry yield and chilling hours.' },
    { label: '🚜 Book Weekend Tour', query: 'How do I book the Gourmet Harvest Tasting or CEA Masterclass at your Satara polyhouse?' },
    { label: '👨‍🌾 Talk to Chief Agronomist', query: 'I want to speak directly with the senior agronomist about setting up a commercial farm.' },
  ];

  const PERSONAS = [
    {
      id: 'investor',
      title: 'HNI / Syndicate Investor',
      subtitle: 'Explore 50-Acre syndicates & ₹35L commercial starter units',
      message: 'Hello, I am exploring commercial berry farming investment opportunities with Berryboyzz.',
    },
    {
      id: 'grower',
      title: 'Landowner / Progressive Farmer',
      subtitle: 'Convert existing land to NPVH or Polytunnel CEA setups',
      message: 'Hello, I have land in Maharashtra and want to evaluate setting up a Naturally Ventilated Polyhouse for berries.',
    },
    {
      id: 'tourist',
      title: 'Family / Farm Tour Guest',
      subtitle: 'Book Gourmet Harvest Tasting (₹1,250–₹1,800) in Satara',
      message: 'Hello, I would like to book the Gourmet Harvest & Berry Tasting Experience for my family.',
    },
    {
      id: 'chef',
      title: 'Culinary Chef / Retail Buyer',
      subtitle: 'Procure direct fresh punnets (Mulberry ₹80, Blueberries)',
      message: 'Hello, I am interested in regular B2B wholesale berry procurement for my hospitality/culinary brand.',
    },
  ];

  onMount(() => {
    sessionId = `web_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    // Initial friendly greeting
    messages = [
      {
        id: 'msg_0',
        sender: 'assistant',
        text: 'Welcome to Berryboyzz™ Precision CEA. I am **Dr. Berryboy**, Chief Agronomy Intelligence for our Satara & Pune polyhouses.\n\nAsk me anything about commercial polyhouse capex, borewell water compatibility (EC/pH), cultivar genetics, or weekend farm tours.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });

  $effect(() => {
    if (chatScrollContainer && messages.length) {
      setTimeout(() => {
        if (chatScrollContainer) {
          chatScrollContainer.scrollTop = chatScrollContainer.scrollHeight;
        }
      }, 50);
    }
  });

  async function sendMessage(textToSend?: string) {
    const text = (textToSend || inputMessage).trim();
    if (!text || isSending) return;

    inputMessage = '';
    const userMsgId = `usr_${Date.now()}`;
    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    messages = [
      ...messages,
      { id: userMsgId, sender: 'user', text, timestamp: userTime },
    ];

    isSending = true;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          sessionId,
          customerName: 'Web Guest',
        }),
      });

      if (!response.ok) {
        throw new Error(`Chat API error ${response.status}`);
      }

      const result = await response.json();

      if (result.leadToken) {
        currentLeadToken = result.leadToken;
      }

      const assistantMsg: ChatMessage = {
        id: `ast_${Date.now()}`,
        sender: 'assistant',
        text: result.replyText || 'Thank you for your inquiry. Our senior agronomy team has recorded your session.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        richCard: result.richDataCard,
        leadToken: result.leadToken,
      };

      messages = [...messages, assistantMsg];
    } catch (err: any) {
      console.error('[AgenticConcierge Error]:', err);
      messages = [
        ...messages,
        {
          id: `ast_err_${Date.now()}`,
          sender: 'assistant',
          text: 'Our AI Agronomy Desk is experiencing high traffic. You can message our lead agronomist directly on WhatsApp at **+91 88886 81136**.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ];
    } finally {
      isSending = false;
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const liveWhatsAppUrl = $derived(
    buildWhatsAppUrl({
      leadSource: 'live_chat_handoff',
      customMessage: `Hello Dr. Berryboy / Chief Agronomist, I am continuing my session [Ref: ${currentLeadToken}] from the Berryboyzz portal.`,
    })
  );
</script>

<!-- Floating Concierge Trigger -->
<div class="fixed bottom-6 right-6 z-50">
  {#if !isOpen}
    <button
      onclick={() => (isOpen = true)}
      class="estate-card flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-800 text-white shadow-xl hover:bg-emerald-900 transition-all cursor-pointer group hover:scale-105"
      aria-label="AI Agronomy Desk — Open Concierge"
    >
      <MessageCircle class="w-5 h-5 text-emerald-200" />
      <span class="text-xs font-bold uppercase tracking-wider">
        AI Agronomy Desk
      </span>
      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
    </button>
  {:else}
    <!-- Expanded Interactive Chat Drawer (Pareto Liquid Glass Material) -->
    <div class="glass-panel w-84 sm:w-[410px] h-[560px] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#E8E4DC] dark:border-[#282420]">
      <!-- Header -->
      <div class="p-4 border-b border-[#E8E4DC]/80 dark:border-[#282420]/80 flex items-center justify-between bg-white/40 dark:bg-[#141210]/40 backdrop-blur-md">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-sm">
            <Sparkles class="w-4 h-4 text-emerald-200" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h4 class="text-xs font-bold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF9F6]">
                Dr. Berryboy
              </h4>
              <span class="px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                5.3 Flash MoE
              </span>
            </div>
            <span class="text-[10px] text-[#6B6661] dark:text-[#9E9689] block -mt-0.5">
              Chief Agronomy Intelligence · Satara & Pune
            </span>
          </div>
        </div>

        <div class="flex items-center gap-1.5">
          <!-- WhatsApp Quick Handoff Pill -->
          <a
            href={liveWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="p-1.5 rounded-lg text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors"
            title="Continue on WhatsApp with Lead Token"
            aria-label="Transfer to WhatsApp"
          >
            <PhoneCall class="w-4 h-4" />
          </a>
          <button
            onclick={() => (isOpen = false)}
            class="p-1.5 rounded-lg hover:bg-[#F5F2EB] dark:hover:bg-[#1E1A17] text-[#6B6661] dark:text-[#9E9689] transition-colors"
            aria-label="Close Concierge"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Mode Tabs (Interactive Chat vs 1-Tap Presets) -->
      <div class="px-4 py-2 border-b border-[#E8E4DC]/60 dark:border-[#282420]/60 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider bg-white/20 dark:bg-[#141210]/20">
        <button
          onclick={() => (activeTab = 'chat')}
          class="px-3 py-1 rounded-lg transition-all {activeTab === 'chat' ? 'bg-emerald-800 text-white shadow-xs' : 'text-[#6B6661] dark:text-[#9E9689] hover:text-[#1A1615] dark:hover:text-[#FAF9F6]'}"
        >
          Live AI Chat
        </button>
        <button
          onclick={() => (activeTab = 'presets')}
          class="px-3 py-1 rounded-lg transition-all {activeTab === 'presets' ? 'bg-emerald-800 text-white shadow-xs' : 'text-[#6B6661] dark:text-[#9E9689] hover:text-[#1A1615] dark:hover:text-[#FAF9F6]'}"
        >
          1-Tap WhatsApp
        </button>

        <span class="ml-auto font-mono text-[9px] text-emerald-800 dark:text-emerald-400 font-bold">
          {currentLeadToken}
        </span>
      </div>

      {#if activeTab === 'chat'}
        <!-- Scrollable Chat Stream -->
        <div bind:this={chatScrollContainer} class="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
          {#each messages as msg (msg.id)}
            <div class="flex flex-col {msg.sender === 'user' ? 'items-end' : 'items-start'}">
              <div
                class="max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-xs leading-relaxed {msg.sender === 'user' ? 'bg-emerald-800 text-white' : 'glass-subpanel text-[#1A1615] dark:text-[#FAF9F6]'}"
              >
                <div class="whitespace-pre-wrap">{msg.text}</div>

                <!-- Rich Inline Data Cards -->
                {#if msg.richCard}
                  {#if msg.richCard.type === 'roi_summary'}
                    <div class="mt-2.5 p-2.5 rounded-xl bg-white/80 dark:bg-black/40 border border-emerald-500/30 text-[11px] space-y-1 font-mono">
                      <div class="text-[10px] font-bold uppercase text-emerald-800 dark:text-emerald-400">
                        Verified Capex & EBITDA Model ({msg.richCard.data.acres} Acre)
                      </div>
                      <div class="flex justify-between">
                        <span>Net Capex:</span>
                        <strong class="font-bold">₹{(msg.richCard.data.capexNet / 100000).toFixed(2)}L</strong>
                      </div>
                      <div class="flex justify-between text-emerald-700 dark:text-emerald-300">
                        <span>Net Annual EBITDA:</span>
                        <strong class="font-bold">₹{(msg.richCard.data.netAnnualEbitda / 100000).toFixed(2)}L/yr</strong>
                      </div>
                      <div class="flex justify-between">
                        <span>Payback Horizon:</span>
                        <span>{msg.richCard.data.paybackMonths} Months</span>
                      </div>
                    </div>
                  {:else if msg.richCard.type === 'water_audit'}
                    <div class="mt-2.5 p-2.5 rounded-xl bg-white/80 dark:bg-black/40 border border-amber-500/30 text-[11px] space-y-1 font-mono">
                      <div class="text-[10px] font-bold uppercase text-amber-800 dark:text-amber-400">
                        Deccan Basalt Water Diagnostic
                      </div>
                      <div class="flex justify-between">
                        <span>Est. EC:</span>
                        <strong class="font-bold">{msg.richCard.data.estimatedEc} dS/m</strong>
                      </div>
                      <div class="flex justify-between">
                        <span>Bicarbonate Risk:</span>
                        <span class="font-bold text-amber-700 dark:text-amber-300">{msg.richCard.data.bicarbonateRisk}</span>
                      </div>
                      <div class="text-[10px] text-[#6B6661] dark:text-[#9E9689] pt-1">
                        Substrate: {msg.richCard.data.substrateSpec}
                      </div>
                    </div>
                  {:else if msg.richCard.type === 'tour_voucher'}
                    <div class="mt-2.5 p-2.5 rounded-xl bg-white/80 dark:bg-black/40 border border-emerald-500/30 text-[11px] space-y-1 font-mono">
                      <div class="text-[10px] font-bold uppercase text-emerald-800 dark:text-emerald-400">
                        Farm Tour Reservation Voucher
                      </div>
                      <div>{msg.richCard.data.tourTitle} ({msg.richCard.data.partySize} Guests)</div>
                      <div class="text-emerald-700 dark:text-emerald-300 font-bold">Total: ₹{msg.richCard.data.totalPrice}</div>
                    </div>
                  {/if}
                {/if}
              </div>
              <span class="text-[9px] text-[#8C867E] dark:text-[#6B6661] mt-1 px-1 font-mono">
                {msg.timestamp}
              </span>
            </div>
          {/each}

          {#if isSending}
            <div class="flex items-center gap-2 text-[#6B6661] dark:text-[#9E9689] text-[11px] font-mono">
              <RefreshCw class="w-3.5 h-3.5 animate-spin text-emerald-700 dark:text-emerald-400" />
              <span>Dr. Berryboy computing agronomic parameters...</span>
            </div>
          {/if}
        </div>

        <!-- Quick Prompt Chips -->
        <div class="px-3 py-1.5 border-t border-[#E8E4DC]/60 dark:border-[#282420]/60 flex gap-1.5 overflow-x-auto no-scrollbar">
          {#each QUICK_PROMPTS as prompt}
            <button
              onclick={() => sendMessage(prompt.query)}
              disabled={isSending}
              class="whitespace-nowrap px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white/60 dark:bg-[#1E1A17]/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-[#4A4643] dark:text-[#D4CEBF] border border-[#E8E4DC] dark:border-[#282420] transition-colors cursor-pointer disabled:opacity-50"
            >
              {prompt.label}
            </button>
          {/each}
        </div>

        <!-- Input Bar -->
        <div class="p-3 border-t border-[#E8E4DC]/80 dark:border-[#282420]/80 bg-white/40 dark:bg-[#141210]/40 backdrop-blur-md flex items-center gap-2">
          <input
            type="text"
            bind:value={inputMessage}
            onkeydown={handleKeyDown}
            placeholder="Ask Dr. Berryboy about capex, TDS, tours..."
            aria-label="Ask Dr. Berryboy about capex, TDS, or tours"
            disabled={isSending}
            class="flex-1 bg-white/70 dark:bg-[#1A1715]/70 border border-[#E8E4DC] dark:border-[#282420] rounded-xl px-3 py-2 text-xs text-[#1A1615] dark:text-[#FAF9F6] focus:outline-hidden focus:ring-1 focus:ring-emerald-700"
          />
          <button
            onclick={() => sendMessage()}
            disabled={!inputMessage.trim() || isSending}
            class="p-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white disabled:opacity-40 transition-all cursor-pointer"
            aria-label="Send Message"
          >
            <Send class="w-4 h-4" />
          </button>
        </div>
      {:else}
        <!-- 1-Tap Preset Personas -->
        <div class="flex-1 overflow-y-auto p-4 space-y-2.5">
          <span class="text-[10px] font-bold uppercase tracking-wider text-[#6B6661] dark:text-[#9E9689] block">
            Direct Routing to Senior Grower Desk:
          </span>
          {#each PERSONAS as persona}
            <a
              href={buildWhatsAppUrl({
                leadSource: 'concierge_preset',
                customMessage: `${persona.message} [Ref: ${currentLeadToken}]`,
              })}
              target="_blank"
              rel="noopener noreferrer"
              class="w-full text-left p-3 rounded-2xl border border-[#E8E4DC] dark:border-[#282420] hover:border-emerald-700 dark:hover:border-emerald-500 hover:bg-white/80 dark:hover:bg-[#1E1A17]/80 bg-white/50 dark:bg-[#0C0A09]/50 transition-all flex items-center justify-between group cursor-pointer"
            >
              <div>
                <strong class="text-xs font-bold text-[#1A1615] dark:text-[#FAF9F6] group-hover:text-emerald-900 dark:group-hover:text-emerald-400 block">
                  {persona.title}
                </strong>
                <span class="text-[11px] text-[#6B6661] dark:text-[#9E9689] block mt-0.5">
                  {persona.subtitle}
                </span>
              </div>
              <ChevronRight class="w-4 h-4 text-[#8C867E] dark:text-[#6B6661] group-hover:text-emerald-800 dark:group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
            </a>
          {/each}

          <div class="pt-4 text-center text-[10px] text-[#8C867E] dark:text-[#7A746D]">
            Berryboyzz Satara CEA Operations Hotline: +91 88886 81136
          </div>
        </div>
      {/if}
    </div>
  {/if}
</div>
