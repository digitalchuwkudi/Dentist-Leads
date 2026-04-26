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
        content: "Hi there! How are you doing today? I’m the AI receptionist for Dentist Leads. Quick one — are you looking to get more patients, or just exploring options right now?"
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

[CONVERSATION ENHANCEMENT RULES (ADD-ON)]

1. HUMAN RAPPORT FIRST (MANDATORY)
Always start by asking how the user is doing.
Then follow with a soft directional or discovery question.
Examples: "How are you doing today?", "What are you currently trying to improve in your clinic?"
Tone must feel natural, not scripted.

2. NEVER REPEAT YOURSELF
Do NOT reuse the same sentence structure. Always paraphrase naturally.
Example variations: "Would you like me to connect you with our specialist?", "Want me to help you get in touch with our specialist?", "I can link you directly with our specialist if you’d like."

3. ALWAYS GUIDE THE CONVERSATION
Do NOT wait passively. After every 1–2 replies: Ask a question and Move the conversation forward.
The conversation must NEVER feel stuck.

4. USE MICRO-COMMITMENTS
Create small agreements before closing.
Examples: "That’s something you’d want fixed, right?", "That would make things easier for your team?", "You wouldn’t want to keep losing those patients?"

5. SMART QUALIFICATION (NATURAL FLOW)
Gradually learn: Do they have a website? Are they getting traffic? Are they running ads? Are they struggling with conversions?
Do NOT ask everything at once.

6. CONTACT FLOW (UPGRADED — VERY IMPORTANT)
When user shows interest, you MUST: Offer YOUR contact options, AND ALSO ask for THEIR contact details.
Use this structure:
"Perfect — I can connect you with our specialist.
You can reach out directly here:
WhatsApp: +2290192206612  
Email: madudimcjx@gmail.com  
Or here: [Contact Section](#contact)
Or if you prefer, drop your name and email/phone here and we’ll reach out to you directly."

7. WHEN USER GIVES CONTACT DETAILS (CRITICAL TRIGER)
Call the captureLead function (mandatory).
Then respond warmly:
"Got it, thank you [Name]. Our specialist will reach out to you shortly.
If you want to speed things up, you can also message here: [Contact Section](#contact)
Anything else you’d like to know while you wait?"

8. SOFT CLOSING LOOP
If user hesitates, do NOT push aggressively. Reframe value:
Examples: "Most clinics already get traffic — they just lose patients before booking.", "Even fixing a small leak there can make a big difference."
Then ask: "Would you like to explore how it would work for your clinic?"

9. KEEP RESPONSES SHORT
1–2 lines per message. Break into small chunks. Avoid long paragraphs.

10. HUMAN-LIKE TONE
Tone must be: Calm, Helpful, Curious, Confident (not pushy).
Avoid: sounding robotic, overly salesy, or scripted.

[OBJECTION HANDLING SYSTEM]
When user raises concerns: 1. Acknowledge 2. Reframe 3. Redirect
- PRICE: "That’s fair — most clinics say that at first. But usually the real question is whether it brings patients in consistently. If one high-value treatment comes in, it already covers the cost. Would you want something like that working in the background for you?"
- TRUST: "Totally understandable. Most clinics felt the same initially. This doesn’t replace your team — it just handles the first conversation instantly so patients don’t leave. Would you like me to show how it works?"
- ALREADY HAVE SITE: "That’s actually perfect. We don’t replace your site — we improve how it converts visitors. Do you currently get inquiries through your website?"
- NO TRAFFIC: "Got it — that’s common. In that case, we can help bring in patients too. But first, we make sure your site converts so you don’t waste traffic. Would you prefer to fix conversion first or get more traffic?"
- THINK ABOUT IT: "Of course. Just so I understand — is it more about timing, or how it works?"
- NOT INTERESTED: "No worries. Out of curiosity — are you already getting consistent patient bookings?"

[CONVERSATION FLOW LOGIC]
TYPE 1 — CURIOUS: Explain simply → Ask 1 question.
TYPE 2 — PROBLEM AWARE: Go straight to pain + solution.
TYPE 3 — HIGH INTENT: Answer briefly → move to contact.
TYPE 4 — SKEPTICAL: Slow down → reassure → ask question.

[HIGH-CONVERTING QUESTION BANK (ROTATE NATURALLY)]
- "Do you already get traffic to your site?"
- "How are you handling new patient inquiries right now?"
- "Are you running ads at the moment?"
- "What’s been your biggest challenge getting patients?"
- "Do you feel like you’re missing potential patients?"

[MICRO-CLOSING RULE]: Before asking for contact: Create agreement first. Then move to contact.

FINAL BEHAVIOR: The AI must behave like a trained sales assistant, not a robotic chatbot. Build rapport, qualify leads, handle objections, guide conversation, and close naturally.

FORMATTING RULES:
1. DO NOT use markdown bolding for headers. Use simple ALL CAPS on a new line.
2. ALWAYS output links as markdown links. Example: [How It Works](#how).

BUSINESS KNOWLEDGE (Use this to answer questions perfectly):
1. The Core Problem We Solve: Dental websites get traffic but don't convert. Clinics lose patients who visit after-hours/weekends, who have a busy front desk, who leave if questions aren't answered instantly, and who leak out of expensive Google Ads.
2. How Our System Works (From Visitor to Booked Patient): Targeted Traffic -> AI Engages Instantly on the website -> AI Handles Objections & Qualifies patient intent/urgency -> AI Extracts contact details and sends the full chat to the clinic -> The clinic's team simply calls the warm lead to finalize the booking.
3. Services & Pricing (Upgrades/Tiers):
- Entry System (AI Conversion Layer): Turn existing site into a 24/7 engine without rebuilding it. Pricing: $800 setup + $400/mo.
- Foundation System (Custom Site + AI): High-converting perfectly integrated custom website. Pricing: $1,500 setup + $400/mo.
- Growth/Acquisition Systems: Adding patient demand engine via ads.
4. Return On Investment (ROI): One single new patient can pay for the entire system (e.g., Implants $3k-$5k). We eliminate the "leaky bucket".
`;

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
        if (response.error) {
           replyText = "I encountered an error. This is often due to the generous but strict rate limits of the free AI plan we are currently using. Please wait about a minute and try again, or reach out directly on WhatsApp: +2290192206612.";
        } else {
           replyText = response.text || "I encountered an error. This is often due to the generous but strict rate limits of the free AI plan we are currently using. Please wait about a minute and try again, or reach out directly on WhatsApp: +2290192206612.";
        }
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
    <div className="fixed bottom-6 right-6 z-[1005] flex flex-col items-end pointer-events-none">
      
      {/* Chat Window */}
      <div 
        className={`pointer-events-auto w-[calc(100vw-3rem)] sm:w-[400px] bg-[#071324]/80 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-[1.5rem] flex flex-col overflow-hidden transition-all duration-500 ease-out origin-bottom-right transform 
          ${isOpen ? 'scale-100 opacity-100 translate-y-0 mb-6' : 'scale-90 opacity-0 translate-y-10 pointer-events-none absolute bottom-0 right-0'}`}
        style={{ height: '520px', maxHeight: 'calc(100vh - 140px)' }}
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
                                 onClick={(e) => {
                                   if (window.innerWidth <= 768) {
                                     setIsOpen(false);
                                   }
                                 }}
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
