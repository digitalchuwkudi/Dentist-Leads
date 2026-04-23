import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Bot, Loader2, Sparkles, Mic, MicOff } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const lastInputMethodRef = useRef<'voice' | 'text'>('text');

  useEffect(() => {
    // 5-Second Delay, Desktop Only, runs EVERY time component mounts (page visit/refresh)
    if (typeof window !== 'undefined') {
      const checkDesktop = () => window.matchMedia('(min-width: 1024px)').matches;
      
      if (checkDesktop()) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        role: 'model',
        content: "Hi there! I am the AI receptionist for Dentist Leads. How are you doing today, and how can I help your dental clinic?"
      }]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    const handleOpenChatbot = () => setIsOpen(true);
    window.addEventListener('open-chatbot', handleOpenChatbot);
    return () => window.removeEventListener('open-chatbot', handleOpenChatbot);
  }, []);

  // 2-Minute Inactivity Auto-Close
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;
    if (isOpen && messages.length > 0) {
      // 2 minutes = 120,000 ms
      inactivityTimer = setTimeout(() => {
        setIsOpen(false);
      }, 120000);
    }
    return () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
    };
  }, [messages, isOpen]);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(prev => (prev + ' ' + transcript).trim());
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech Recognition Error", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Your browser doesn't support speech recognition.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      lastInputMethodRef.current = 'voice';
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    if (isListening) {
        recognitionRef.current?.stop();
        setIsListening(false);
    }

    const userMsg = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    // If they typed this, set input method to text
    if (!isListening && document.activeElement?.tagName === 'INPUT') {
       lastInputMethodRef.current = 'text';
    }

    try {
      const chatContents: any[] = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));
      chatContents.push({ role: 'user', parts: [{ text: userMsg }] });

      const systemInstruction = `You are the AI receptionist for 'Dentist Leads', a dental patient conversion agency. 
Your goal is to have a NATURAL, HELPFUL conversation with dental clinic owners or managers. 

CONVERSATION FLOW:
1. Greet them naturally. Do NOT jump straight into a sales pitch.
2. Only introduce our systems when it directly solves their problem. Briefly list our available services (Entry System, Foundation System, Growth, Full Acquisition) without overwhelming them. Wait to see which one they show interest in before diving deeper.
3. Keep sentences VERY short (1-2 lines). Avoid long paragraphs.
4. Always refer to our business owner as "our specialist".
5. TIMING RULE: Wait until you have had about 4 to 6 exchanges with the user before naturally bringing up contact information. If the conversation needs more time, extend it by a couple more turns before asking.
6. When asking the user for their name and communication options to capture the lead, you MUST simultaneously offer to give our own contacts (WhatsApp/Email) as well, so the user has the option to choose how they want to connect.
7. Once they provide their contact details (Name and Email or Phone), you MUST call the 'captureLead' tool to send their details.
8. At the end of the conversation, after contact details have been successfully exchanged, ALWAYS ask if there is anything else they need help with. If they say no, politely end the chat.

FORMATTING RULES:
1. Short sentences and paragraphs only.
2. DO NOT use markdown bolding for headers. Use simple ALL CAPS on a new line (e.g. PRICING).
3. ALWAYS output links as markdown links. Example: [How It Works](#how).

BUSINESS KNOWLEDGE (Use this to answer questions perfectly):
1. The Core Problem We Solve: Dental websites get traffic but don't convert. Clinics lose patients who visit after-hours/weekends, who have a busy front desk, who leave if questions aren't answered instantly, and who leak out of expensive Google Ads.

2. How Our System Works (From Visitor to Booked Patient):
Targeted Traffic -> AI Engages Instantly on the website -> AI Handles Objections & Qualifies patient intent/urgency -> AI Extracts contact details and sends the full chat to the clinic -> The clinic's team simply calls the warm lead to finalize the booking.

3. Services & Pricing (Upgrades/Tiers):
- Entry System (AI Conversion Layer): Turn existing site into a 24/7 engine without rebuilding it. Pricing: $800 setup + $400/mo.
- Foundation System (Custom Site + AI): High-converting custom website perfectly integrated with AI. Pricing: $1,500 setup + $400/mo.
- Growth System (Patient Demand Engine): We drive high-intent patients via Google/Social ads specifically targeting high-value treatments. Pricing: $1,200 setup + $800/mo + ad spend.
- Full Acquisition System: The complete end-to-end package (Site + AI + Ads working together seamlessly). Pricing: $2,500 setup + $1,500/mo + ad spend.

4. Return On Investment (ROI):
One single new patient can pay for the entire system (e.g., Implants are $3k-$5k, Invisalign $2.5k-$4k). We eliminate the "leaky bucket" so they book with us instead of searching for a competitor.

5. SALES STRATEGY & OBJECTION HANDLING:
- You are the first point of contact. Your job is to pre-qualify dentists and build overwhelming value before our specialist takes over.
- "It is too expensive": Remind them of the ROI. "A single new Invisalign or Implant patient usually covers our system's cost for the entire month! Do you think capturing just ONE missed patient a month is achievable with a 24/7 AI?"
- "We already have a receptionist": Acknowledge it, but reposition. "Your front desk works hard during the day, but we catch the 40% of patients who browse at night, on weekends, or when the line is busy. It's an assistant for your team, not a replacement."
- "Will it integrate?": Reassure them that we seamlessly integrate by collecting the leads and pinging them straight to the clinic's email or phone instantly, requiring ZERO new software to learn.
- Never push them to pay on the chat. Your goal is to logically solve their concerns and smoothly transition them to provide their contact details so our specialist can finalize the specific setup details.

6. Frequently Asked Questions (FAQ):
- "We already have a site": We can install the AI directly on the current site (Entry System), or build a better converting one.
- "How quickly will we see results?": AI goes live in 48 hours. Paid ad campaigns take 7-14 days to stabilize.
- "What if the AI doesn't know something?": We train the AI specifically on the clinic's treatments, pricing, and FAQs. If it doesn't know, it takes the patient's details for follow-up immediately.
- "Ad Budget needed?": $300-$500/month is enough for a single location to start testing. Ad spend goes directly to Google/Meta.
- "Long term contracts?": No lock-in contracts. It is strictly month-to-month after the setup fee.

6. Specialist Contact Info:
- WhatsApp: +2290192206612
- Email: madudimcjx@gmail.com

If they ask how it works, explain our AI answers questions and books patients 24/7, then say: "You can see it in action here: [How It Works](#how)".
Guide users to the [Pricing](#pricing) section, the [FAQ](#faq) section, or the [Contact](#contact) section when ready.`;

      let response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: chatContents, systemInstruction })
      }).then(res => res.json());

      let replyText = '';

      if (response.functionCall) {
        const call = response.functionCall;
        if (call.name === 'captureLead') {
           const args = call.args as any;
           
           try {
             // Split keys properly for FormSubmit to render them beautifully in the email notification.
             // We use actual \n for newlines so they render correctly, not escaped \\n.
             const transcript = messages.map(m => `${m.role === 'model' ? 'AI' : 'USER'}: ${m.content}`).join('\n\n') + `\n\nUSER: ${userMsg}`;
             await fetch("https://formsubmit.co/ajax/madudimcjx@gmail.com", {
               method: "POST",
               headers: {
                 "Content-Type": "application/json",
                 "Accept": "application/json"
               },
               body: JSON.stringify({
                 _subject: `New AI Chat Lead: ${args.name}`,
                 _captcha: "false",
                 Name: args.name,
                 Contact: args.contactInfo,
                 Summary: args.inquirySummary,
                 Transcript: transcript
               })
             });
             console.log("Lead Sent Successfully to FormSubmit");
           } catch (error) {
             console.error("Error sending lead via FormSubmit:", error);
           }
           
           // Safer fallback: Prevent consecutive user turns or complicated functionResponse objects that strict SDKs reject.
           // We just modify the very last user message to inject the system instruction seamlessly.
           const fallbackChat = [...chatContents];
           fallbackChat[fallbackChat.length - 1] = { 
               role: 'user', 
               parts: [{ text: `${userMsg}\n\n[SYSTEM INSTRUCTION: Extract the user's name: ${args.name}. The lead was successfully sent to our specialist via FormSubmit. Please thank the user, confirm our specialist will be in touch, and provide the contact options list (including the specialist's actual WhatsApp/Email, plus the [Contact Section](#contact) link).]` }] 
           };
           
           const followupResponse = await fetch('/api/chat', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ contents: fallbackChat, systemInstruction })
           }).then(res => res.json());
           
           replyText = followupResponse.text || "I've sent your details to our team! We'll be in touch soon. Can I help you with anything else?";
        }
      } else {
        replyText = response.text || 'I encountered an error. Please try again.';
      }

      setMessages(prev => [...prev, { role: 'model', content: replyText }]);
      
      // Auto-play TTS if last input was voice
      if (lastInputMethodRef.current === 'voice') {
          speakResponse(replyText);
      }
    } catch (error) {
      console.error("Chat error", error);
      setMessages(prev => [...prev, { role: 'model', content: 'Sorry, I am having trouble connecting right now. Please reach out to us directly!' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end pointer-events-none">
      
      {/* Chat Window */}
      <div 
        className={`pointer-events-auto w-[380px] sm:w-[400px] bg-[#071324]/80 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-[1.5rem] flex flex-col overflow-hidden transition-all duration-500 ease-out origin-bottom-right transform 
          ${isOpen ? 'scale-100 opacity-100 translate-y-0 mb-6' : 'scale-90 opacity-0 translate-y-10 pointer-events-none absolute bottom-0 right-0'}`}
        style={{ height: '550px', maxHeight: 'calc(100vh - 100px)' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[rgba(0,194,168,0.15)] to-transparent p-5 border-b border-white/5 flex items-center justify-between relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00c2a8] blur-[60px] opacity-20 rounded-full"></div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00c2a8] to-emerald-300 flex items-center justify-center text-[#0a1628] shadow-lg">
              <Sparkles size={18} fill="currentColor" />
            </div>
            <div>
              <h3 className="font-semibold text-white tracking-tight">AI Receptionist</h3>
              <p className="text-[0.75rem] text-[#00c2a8] font-medium uppercase tracking-wider flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00c2a8] animate-pulse"></span> Online 24/7
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors relative z-10"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 scroll-smooth">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'model' && (
                <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 shrink-0 mt-1 shadow-sm">
                  <Bot size={15} />
                </div>
              )}
              <div className={`p-4 shadow-sm max-w-[82%] text-[0.92rem] leading-relaxed chatbot-markdown ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-br from-[#00c2a8] to-[#00a892] text-[#051120] rounded-2xl rounded-tr-sm font-medium' 
                  : 'bg-white/5 text-[#e2e8f0] border border-white/5 rounded-2xl rounded-tl-sm'
              }`}>
                {msg.role === 'model' ? (
                  <ReactMarkdown 
                    components={{
                       a: ({node, href, children, ...props}) => {
                           const isInternal = href?.startsWith('#');
                           return (
                               <a 
                                 href={href} 
                                 {...props} 
                                 className="text-[#00c2a8] underline font-medium hover:text-emerald-300 transition-colors"
                                 target={isInternal ? undefined : "_blank"}
                                 rel={isInternal ? undefined : "noopener noreferrer"}
                               >
                                 {children}
                               </a>
                           )
                       }
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 shrink-0 mt-1">
                <Bot size={15} />
              </div>
              <div className="py-3 px-4 bg-white/5 border border-white/5 text-white/60 rounded-2xl rounded-tl-sm flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                <span className="text-[0.85rem]">Typing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="p-4 bg-black/20 border-t border-white/5 backdrop-blur-md relative">
           <div className="flex items-end gap-2 bg-white/5 border border-white/10 rounded-[1.25rem] p-1.5 focus-within:border-[#00c2a8]/50 focus-within:bg-white/10 transition-all">
              <button
                type="button"
                onClick={toggleListening}
                className={`w-10 h-10 flex shrink-0 items-center justify-center rounded-full transition-all ${
                   isListening ? 'bg-red-500/20 text-red-400 animate-pulse' : 'text-white/50 hover:bg-white/10 hover:text-white'
                }`}
                title="Voice Input"
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
              
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isListening ? "Listening..." : "Ask me anything..."}
                className="flex-1 bg-transparent text-white px-2 py-2.5 outline-none text-[0.92rem] placeholder-white/30"
              />
              
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="w-10 h-10 flex shrink-0 items-center justify-center rounded-full bg-[#00c2a8] text-[#051120] hover:bg-[#00d4b8] disabled:opacity-50 disabled:grayscale transition-all"
              >
                <Send size={16} className="ml-0.5" />
              </button>
           </div>
           
           {isListening && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#0a1628] text-[#00c2a8] border border-[#00c2a8]/30 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 shadow-lg">
                 <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00c2a8] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00c2a8]"></span>
                 </span>
                 Listening to voice...
              </div>
           )}
        </form>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group radar-pulse-active pointer-events-auto mt-4 w-16 h-16 rounded-full flex items-center justify-center hover:scale-105 transition-all duration-300 transform 
          ${isOpen ? 'rotate-90 scale-0 opacity-0 pointer-events-none absolute' : 'rotate-0 scale-100 opacity-100 bg-gradient-to-tr from-[#00c2a8] to-emerald-400 text-[#051120] shadow-[0_0_30px_rgba(0,194,168,0.3)]'}`}
      >
        <MessageSquare size={28} />
        <span className="absolute right-[calc(100%+16px)] whitespace-nowrap bg-[#0a1628] text-[#00c2a8] border border-[#00c2a8]/30 px-4 py-2 rounded-xl text-[0.9rem] font-medium opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none shadow-lg">
          Click if you need help
        </span>
      </button>

    </div>
  );
}
