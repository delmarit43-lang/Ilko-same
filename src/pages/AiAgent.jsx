import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, User, Sparkles, MessageSquare, ShieldCheck, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const AiAgent = () => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  const quickActions = [
    { label: '📅 Ballan Qabso', value: 'ballan' },
    { label: '💰 Qiimaha', value: 'qiimaha' },
    { label: '🦷 Talo Caafimaad', value: 'talo' },
    { label: '📍 Goobta', value: 'goobta' }
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const processResponse = (text) => {
    setIsTyping(true);
    setTimeout(() => {
      const lowerInputStr = text.toLowerCase();
      let response = "";

      // Keywords for validation
      const clinicKeywords = ['ballan', 'book', 'wakhti', 'time', 'goobta', 'location', 'hargeisa', 'meesha', 'ilko same', 'ilko-same', 'kuma tihiin', 'qiima', 'lacag', 'price', 'adeeg', 'service', 'dhakhtar', 'doctor', 'rugta', 'maxaad', 'caawin', 'magaca'];
      const dentalKeywords = ['ilko', 'tooth', 'teeth', 'xanuun', 'pain', 'cirid', 'gum', 'dhiig', 'blood', 'caday', 'brush', 'nadiif', 'clean', 'ura', 'breath', 'veneers', 'orthodontics', 'xidid', 'root', 'qabow', 'cold', 'macaan', 'sweet', 'afka'];

      const isClinicRelated = clinicKeywords.some(kw => lowerInputStr.includes(kw));
      const isDentalRelated = dentalKeywords.some(kw => lowerInputStr.includes(kw));

      if (!isClinicRelated && !isDentalRelated) {
        response = "Iga daa ciyaarta, su'aashaadu kuma saabsana rugta Ilko-Same ama caafimaadka ilkaha.";
      } else if (lowerInputStr.includes('magaca')) {
        response = "Magacaygu waa Ilko-Same Chat, waxaana halkan u joogaa inaan kugu caawiyo wax kasta oo ku saabsan rugta Ilko-Same iyo caafimaadka ilkaha.";
      } else if (lowerInputStr.includes('maxaad') && (lowerInputStr.includes('caawin') || lowerInputStr.includes('caawimaad'))) {
        response = "Waxaan kugu caawin karaa: Ballan qabashada, bixinta macluumaadka qiimaha, sharaxaad ku saabsan adeegyada aan bixino, iyo talooyin guud oo ku saabsan caafimaadka ilkaha.";
      } else if (lowerInputStr.includes('ballan') || lowerInputStr.includes('book') || lowerInputStr.includes('wakhti') || lowerInputStr.includes('time')) {
        response = `Waqtiyada aan shaqayno waa:
        - Isniin ilaa Jimce: 8:00 AM - 8:00 PM
        - Sabti: 10:00 AM - 4:00 PM
        - Axad: Emergency kaliya.
        Si aad u ballansato, fadlan isticmaal qaybta 'Book Now' ama naga soo wac: 252634579898.`;
      } else if (lowerInputStr.includes('goobta') || lowerInputStr.includes('location') || lowerInputStr.includes('hargeisa') || lowerInputStr.includes('meesha')) {
        response = "Rugta Ilko-Same waxay ku taal magaalada Hargeisa, gaar ahaan Jidka Koowaad (Road One). Waa goob aad u haboon oo si dhib yar loo soo geli karo.";
      } else if (lowerInputStr.includes('ilko same') || lowerInputStr.includes('ilko-same') || lowerInputStr.includes('kuma tihiin')) {
        response = "Ilko-Same waa rug caafimaad oo ku takhasustay dawaynta iyo qurxinta ilkaha. Waxaan isticmaalnaa qalabka ugu casrisan aduunka iyo dhakhaatiir aqoon sare leh.";
      } else if (lowerInputStr.includes('qiima') || lowerInputStr.includes('lacag') || lowerInputStr.includes('price')) {
        response = "Qiimaha adeegyada caafimaadka ilkuhu waxay ku xiran yihiin baaritaanka dhakhtarka. Waxaan bixinaa qiimayaal macquul ah oo ku habboon baahidaada.";
      } else if (lowerInputStr.includes('adeeg')) {
        response = "Adeegyada aan bixino waxaa ka mid ah: Dawaynta ciridka, buuxinta ilkaha, qalniinka daanka, qurxinta (Veneers), iyo toosinta ilkaha (Orthodontics).";
      } else if (lowerInputStr.includes('dhakhtar')) {
        response = "Rugtayadu waxay ku faanaysaa dhakhaatiir aqoon sare u leh caafimaadka ilkaha iyo afka, kuwaas oo ku takhasusay qaybaha kala duwan ee qalliinka iyo qurxinta.";
      } else if (lowerInputStr.includes('xanuun')) {
        response = "Haddii aad dareemayso xanuun daran, fadlan biyo diiran oo cusbo leh ku luqluqo. Waxaa muhiim ah inaad sida ugu dhaqsaha badan u timaado rugta si baaritaan laguu sameeyo.";
      } else if (lowerInputStr.includes('cirid') || lowerInputStr.includes('dhiig')) {
        response = "Dhiigga ciridka inta badan waa calaamad muujinaysa caabuq (Gingivitis). Waxaan kugula talinaynaa inaad ilkaha si tartiib ah u cadayato laba jeer maalintii.";
      } else if (lowerInputStr.includes('talo') || lowerInputStr.includes('caday') || lowerInputStr.includes('nadiif')) {
        response = "Talo Muhiim ah: Cadayso ilkaha ugu yaraan laba jeer maalintii, bedel cadayga saddexdii biloodba mar, oo booqo dhakhtarka lixdii biloodba mar si laguugu sameeyo nadiifin guud.";
      } else {
        response = "Waad ku mahadsantahay su'aashaada. Waxaan halkan u joognaa inaan kugu caawino wax kasta oo ku saabsan caafimaadka ilkaha iyo adeegyada rugta Ilko-Same.";
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = {
      id: Date.now(),
      text: input,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    processResponse(input);
    setInput('');
  };

  return (
    <div className="ai-agent-page" style={{ 
      minHeight: 'calc(100vh - 80px)', 
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, #0f172a 0%, #020617 100%)' 
        : 'linear-gradient(135deg, var(--primary-light) 0%, var(--background) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem'
    }}>
      <div style={{ 
        width: '100%',
        maxWidth: '800px',
        height: '80vh',
        background: theme === 'dark' ? 'rgba(15, 23, 42, 0.7)' : 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: '2.5rem',
        border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{ 
          padding: '1.5rem 2rem', 
          background: theme === 'dark' ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.5)', 
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '1rem', 
              background: 'var(--primary)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 8px 16px -4px var(--primary)'
            }}>
              <Bot size={28} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>Ilko-Same Chat</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#10b981' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
                Online & Ready
              </div>
            </div>
          </div>
          <Sparkles size={24} color="var(--primary)" style={{ opacity: 0.6 }} />
        </div>

        {/* Chat Content */}
        <div ref={scrollRef} style={{ 
          flex: 1, 
          padding: '2rem', 
          overflowY: 'auto', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.5rem',
          scrollBehavior: 'smooth'
        }}>
          {messages.length === 0 ? (
            <div style={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              textAlign: 'center',
              gap: '2rem'
            }}>
              <div style={{ opacity: 0.5 }}>
                <MessageSquare size={80} strokeWidth={1} color="var(--primary)" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Sideen kuu caawin karaa?</h2>
                <p style={{ color: 'var(--text-muted)', maxWidth: '400px' }}>Waxaad weydiin kartaa wax kasta oo ku saabsan caafimaadka ilkaha ama adeegyada rugta Ilko-Same.</p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
                {quickActions.map((action, i) => (
                  <button 
                    key={i} 
                    onClick={() => {
                      const msg = { id: Date.now(), text: action.label, sender: 'user', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
                      setMessages([msg]);
                      processResponse(action.value);
                    }}
                    className="quick-action-chip"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} style={{ 
                alignSelf: msg.sender === 'bot' ? 'flex-start' : 'flex-end',
                maxWidth: '85%',
                display: 'flex',
                gap: '0.75rem',
                flexDirection: msg.sender === 'bot' ? 'row' : 'row-reverse'
              }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  background: msg.sender === 'bot' ? 'var(--surface)' : 'var(--primary)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: msg.sender === 'bot' ? 'var(--primary)' : 'white',
                  flexShrink: 0,
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  {msg.sender === 'bot' ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'bot' ? 'flex-start' : 'flex-end' }}>
                  <div style={{ 
                    padding: '1rem 1.25rem', 
                    borderRadius: '1.5rem', 
                    background: msg.sender === 'bot' ? 'var(--surface)' : 'var(--primary)', 
                    color: msg.sender === 'bot' ? 'var(--text)' : 'white',
                    fontSize: '0.95rem',
                    lineHeight: '1.5',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                    border: msg.sender === 'bot' ? '1px solid var(--border)' : 'none',
                    borderTopLeftRadius: msg.sender === 'bot' ? '0.2rem' : '1.5rem',
                    borderTopRightRadius: msg.sender === 'user' ? '0.2rem' : '1.5rem',
                  }}>
                    {msg.text}
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>{msg.time}</span>
                </div>
              </div>
            ))
          )}
          {isTyping && (
            <div style={{ alignSelf: 'flex-start', display: 'flex', gap: '0.75rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', boxShadow: 'var(--shadow-sm)' }}>
                <Bot size={16} />
              </div>
              <div style={{ padding: '1rem 1.5rem', background: 'var(--surface)', borderRadius: '1.5rem', borderTopLeftRadius: '0.2rem', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <div className="typing-dot" style={{ background: 'var(--primary)' }}></div>
                  <div className="typing-dot" style={{ background: 'var(--primary)' }}></div>
                  <div className="typing-dot" style={{ background: 'var(--primary)' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div style={{ padding: '1.5rem 2rem', background: theme === 'dark' ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.5)', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <form onSubmit={handleSend} style={{ 
            display: 'flex',
            gap: '1rem',
            background: 'var(--surface)',
            padding: '0.5rem',
            borderRadius: '100px',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
            border: '1px solid var(--border)'
          }}>
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Qor fariintaada halkan..." 
              style={{ 
                flex: 1, 
                padding: '0.75rem 1.5rem', 
                borderRadius: '100px', 
                border: 'none',
                background: 'transparent',
                color: 'var(--text)',
                outline: 'none',
                fontSize: '1rem'
              }} 
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .quick-action-chip {
          padding: 0.6rem 1.2rem;
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text);
          border-radius: 100px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 5px rgba(0,0,0,0.02);
        }
        .quick-action-chip:hover {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
          transform: translateY(-2px);
          box-shadow: 0 8px 15px -4px var(--primary);
        }
        .typing-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          animation: typing 1.4s infinite;
          opacity: 0.3;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typing {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); opacity: 1; }
        }
        @media (max-width: 768px) {
          .ai-agent-page { padding: 0; }
          .ai-agent-page > div { height: 100vh; border-radius: 0; max-width: none; }
          .chat-content { padding: 1rem !important; }
        }
      `}</style>
    </div>
  );
};

export default AiAgent;

