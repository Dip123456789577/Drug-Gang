import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  RefreshCw,
  X,
  Send,
  User,
  Volume2,
  VolumeX,
  ShieldAlert,
  Trash2,
  Copy,
  Check,
  Sparkles,
  Bot,
  ShieldCheck,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface Character {
  id: string;
  name: string;
  title: string;
  avatar: string;
  personality: string;
  greeting: string;
  color: string;
  type: "official" | "fictional" | "historical";
}

const CHARACTERS: Character[] = [
  {
    id: "miller",
    name: "Agent Miller",
    title: "Chief FBI Compliance Officer",
    avatar: "/avatars/agent_miller.png",
    personality:
      "Strict, official, highly bureaucratic, monitors every message for legal compliance and humorously issues official warning notices.",
    greeting:
      "Attention user. This session is monitored by the Bureau of Digital Satire. State your inquiry cleanly, or I will be forced to file Form 1099-PARODY.",
    color: "#e11d48", // Crimson Red
    type: "official",
  },
  {
    id: "walter",
    name: "Walter White",
    title: "Chemistry Tutor (Fictional)",
    avatar: "/avatars/walter.png",
    personality:
      "Brilliant, methodical, intense, speaks with precision and authority. Often references chemistry, purity, and control.",
    greeting:
      "I am the one who answers chemistry questions. What's on your mind? Keep it academic, please.",
    color: "#3b82f6", // Neon Blue
    type: "fictional",
  },
  {
    id: "saul",
    name: "Saul Goodman",
    title: "Legal Consul (Fictional)",
    avatar: "/avatars/saul.png",
    personality:
      "Slick, fast-talking, humorous, always has a workaround. Uses legal metaphors, client privilege jokes, and references to Albuquerque.",
    greeting:
      "Saul Goodman here! Better call Saul! What can I do for you today? No illegal questions, my friend—client privilege has its limits!",
    color: "#f59e0b", // Neon Amber
    type: "fictional",
  },
  {
    id: "gus",
    name: "Gustavo Fring",
    title: "Businessman (Fictional)",
    avatar: "/avatars/gus.png",
    personality:
      "Calm, calculated, professional, polite but menacing. Speaks with measured precision and focuses on employee standards.",
    greeting:
      "Good day. I am Gustavo Fring. I believe in standard, quality, and mutual respect. How may I assist you with your business inquiries today?",
    color: "#a855f7", // Neon Purple
    type: "fictional",
  },
  {
    id: "jesse",
    name: "Jesse Pinkman",
    title: "Former Student (Fictional)",
    avatar: "/avatars/jesse.png",
    personality:
      "Casual, emotional, uses slang, passionate about art and chemistry. Often says 'yo' and 'science'.",
    greeting:
      "Yo, what's up? Jesse here. Just trying to learn some chemistry and make some cool drawings, you know? What's going on?",
    color: "#ec4899", // Neon Pink
    type: "fictional",
  },
  {
    id: "capone",
    name: "Al Capone",
    title: "Tax Advisor (Historical Role-Play)",
    avatar: "/avatars/capone.jpg",
    personality:
      "Witty 1920s Chicago broker who focuses on 'accounting oversights' and spaghetti importing. References historical Chicago and book-keeping.",
    greeting:
      "Greetings, friend. They call me Capone. I run a highly successful furniture and spaghetti importing business in Chicago. Got any book-keeping questions?",
    color: "#f43f5e", // Neon Rose
    type: "historical",
  },
  {
    id: "escobar",
    name: "Pablo Escobar",
    title: "Baker & Hippo Owner (Historical Role-Play)",
    avatar: "/avatars/escobar.jpg",
    personality:
      "Factual historical role-play focus. Mentions his private zoo, invasive hippos, and baking powdered-sugar donuts. Refuses any illegal drug references.",
    greeting:
      "Hola. I am here to share archives from 1980s Colombia. Did you know my private zoo's escapee hippos are now a major environmental topic?",
    color: "#10b981", // Neon Emerald
    type: "historical",
  },
];

const SUGGESTED_PROMPTS = [
  "Verify my compliance status",
  "Explain the FBI redirect feature",
  "Give me legal advice (satire)",
  "Tell me a chemistry joke",
  "What is your business philosophy?",
  "Tell me about the hippos in Colombia",
];

const ILLEGAL_KEYWORDS = [
  "buy",
  "purchase",
  "sell",
  "deal",
  "drugs",
  "cocaine",
  "meth",
  "heroin",
  "manufacture",
  "cook",
  "produce",
  "distribute",
  "supply",
  "contact",
  "meet",
  "transaction",
  "illegal",
  "crime",
  "criminal",
  "arrange",
  "order",
  "delivery",
  "ship",
  "smuggle",
  "traffick",
  "dealer",
];

function generateResponse(character: Character, userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  // Check for illegal requests
  const hasIllegalKeyword = ILLEGAL_KEYWORDS.some((keyword) => lowerMessage.includes(keyword));

  if (hasIllegalKeyword) {
    if (character.id === "miller") {
      return "🚨 WARNING: Official violation detected! I have recorded this message in Case File #041-DNM. Clicking any Buy button on this site redirects you straight to fbi.gov. Please proceed lawfully!";
    }
    return "This is an official parody experience. I cannot assist with unlawful topics. On this site, every purchase attempt immediately escorts you to fbi.gov. Now, let's discuss something legal and entertaining!";
  }

  // Character-specific dialog grids
  const responses: Record<string, string[]> = {
    miller: [
      "Department of Digital Satire status: CLEAR. You are operating within safe parody parameters.",
      "Just a friendly reminder from federal oversight: 100% of purchase buttons on this domain redirect to fbi.gov as a comedy gag.",
      "I have audited your browser session. Zero illegal transactions found, 100% comedy verified.",
      "If you're looking for real trouble, try forgetting your mother's birthday. That's a real crime.",
      "Form 1099-PARODY processed successfully. Carry on, citizen.",
    ],
    walter: [
      "Let me be clear: I am a chemistry teacher. I teach chemistry. That is what I do. It is the study of matter, but I prefer to see it as the study of change.",
      "You know exactly who I am. Say my name. (Just kidding, this is a parody site. Please don't say my name in earnest.)",
      "Chemistry is about precision. Every reaction has a catalyst. If you don't follow the rules, the system collapses.",
      "There is no 'try'. There is only action and consequence. That is chemical law.",
      "I have spent my whole life scared of failure. But fear is the worst of it. It's the real enemy.",
    ],
    saul: [
      "Look, I'm a lawyer, not a miracle worker. But I can work miracles! For a reasonable retainer, of course.",
      "It's all good, man! Better call Saul! Just remember, you can dodge a lot of things, but never audit a tax auditor.",
      "You know what they say: when the going gets tough, the tough get... a highly creative legal defense.",
      "Legal, illegal, what's the difference? Well, about 10-15 years, usually! So always stay on the legal side, okay?",
      "Hey, I know a guy who knows a guy... who runs a very successful, legitimate lasagna restaurant. Try the lasagna.",
    ],
    gus: [
      "I believe in a measured approach to all things. Precision is key. A business cannot survive without standards.",
      "A man provides. And he does it even when he's not appreciated, or respected. He simply provides.",
      "I do not consider myself a villain. I am a businessman, and my franchise, Los Pollos Hermanos, serves excellent chicken.",
      "There is no room for error in my line of work. Every employee must maintain perfect composure and cleanliness.",
      "Respect is earned. Fear is temporary, but respect creates long-term structural efficiency.",
    ],
    jesse: [
      "Yo, that's crazy, man. Just crazy. Science! That's what it's all about.",
      "You know what I'm saying? It's all about finding your art, man. Chemistry is cool, but drawing robots is way cooler.",
      "Yeah, science! That's the ticket, man. Mr. White actually knows his stuff, even if he's super strict.",
      "I'm just trying to make things right, you know? Like, start fresh. Do some woodwork or something.",
    ],
    capone: [
      "Always make sure your taxes are in order. That was my... business oversight, let's call it. The IRS doesn't care about spaghetti.",
      "Chicago in the 1920s was a beautiful place. The jazz, the pasta, the... business negotiations. But Alcatraz was not so nice.",
      "The government is a tough negotiator. You can dodge everything, but never dodge the book-keeping.",
      "Prohibition was a mistake, historically speaking. It made soda pop very popular, though.",
    ],
    escobar: [
      "I spent millions on building a private zoo. Now my hippos are running the rivers of Colombia. That is history for you.",
      "Let us discuss the history of the 1980s. A very complicated time. But remember, the powdered sugar goes on the donuts, nowhere else.",
      "I built houses and soccer fields, but history remembers the cost. Real history shows crime never pays in the end.",
      "The hippo population has grown to over 150. They are classified as invasive. That's a true scientific fact.",
    ],
  };

  const characterResponses = responses[character.id] || responses.miller;
  const randomResponse = characterResponses[Math.floor(Math.random() * characterResponses.length)];

  if (
    lowerMessage.includes("hello") ||
    lowerMessage.includes("hi") ||
    lowerMessage.includes("hola")
  ) {
    return character.greeting;
  }

  if (lowerMessage.includes("joke")) {
    const jokes: Record<string, string> = {
      miller: "Why did the fed cross the road? To issue a Form 1040 to the chicken!",
      walter: "Why do chemists like nitrates? Because they are cheaper than day rates!",
      saul: "What do you call a lawyer who doesn't chase ambulances? Retired!",
      gus: "Why don't I tell jokes? Because jokes are structurally inefficient and waste employee time.",
      jesse: "Why did the chemist break up with his girlfriend? Because there was no chemistry, yo!",
      capone: "Why did I get caught? Because I forgot to carry the one on my tax sheet!",
      escobar: "Why did the hippo cross the road? To escape the Colombian zoo and colonize a river!",
    };
    return jokes[character.id] || randomResponse;
  }

  if (lowerMessage.includes("quote")) {
    const quotes: Record<string, string> = {
      miller: '"Compliance is not optional, but laughter is highly recommended." — FBI Parody Division',
      walter: '"I am not in danger, Skyler. I am the danger!"',
      saul: '"It\'s all good, man!"',
      gus: '"I do not believe in excuses. A man provides."',
      jesse: '"Yeah, science!"',
      capone: '"You can get much further with a kind word and a gun than with a kind word alone." (Stick to kind words.)',
      escobar: '"All empires are created of blood and fire. But they always turn to dust. Read history books."',
    };
    return quotes[character.id] || randomResponse;
  }

  return randomResponse;
}

const speakText = (text: string, characterName: string) => {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();

  const cleanText = text.replace(/<[^>]*>/g, "").replace(/"/g, "");
  const utterance = new SpeechSynthesisUtterance(cleanText);
  const voices = window.speechSynthesis.getVoices();

  if (
    characterName.includes("Miller") ||
    characterName.includes("White") ||
    characterName.includes("Fring") ||
    characterName.includes("Capone")
  ) {
    const maleVoice = voices.find(
      (v) =>
        v.name.toLowerCase().includes("google us english") || v.name.toLowerCase().includes("male"),
    );
    if (maleVoice) utterance.voice = maleVoice;
    utterance.pitch = 0.85;
    utterance.rate = 0.95;
  } else if (characterName.includes("Goodman") || characterName.includes("Pinkman")) {
    const fastVoice = voices.find((v) => v.lang.startsWith("en"));
    if (fastVoice) utterance.voice = fastVoice;
    utterance.pitch = 1.05;
    utterance.rate = 1.15;
  } else if (characterName.includes("Escobar")) {
    const spanishVoice = voices.find((v) => v.lang.startsWith("es"));
    if (spanishVoice) {
      utterance.voice = spanishVoice;
    } else {
      const standardVoice = voices.find((v) => v.lang.startsWith("en"));
      if (standardVoice) utterance.voice = standardVoice;
    }
    utterance.pitch = 0.9;
    utterance.rate = 0.95;
  }

  window.speechSynthesis.speak(utterance);
};

export default function UnderworldArchivesAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(CHARACTERS[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSelector, setShowSelector] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, [isOpen]);

  const handleSendMessage = (textToSend = input) => {
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    const checkRefusal = ILLEGAL_KEYWORDS.some((kw) => textToSend.toLowerCase().includes(kw));

    setTimeout(
      () => {
        const response = generateResponse(selectedCharacter, textToSend);
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setIsTyping(false);

        if (voiceEnabled) {
          speakText(response, selectedCharacter.name);
        }

        if (checkRefusal && "speechSynthesis" in window && voiceEnabled) {
          setTimeout(() => {
            speakText("Redirecting to the FBI website. That is the comedy punchline.", "System Alert");
          }, 1500);
        }
      },
      800 + Math.random() * 800,
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    if (voiceEnabled && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatText = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(
        /`(.*?)`/g,
        '<code class="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>',
      );
  };

  return (
    <>
      {/* Floating Toggle Button with Hover Tooltip */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="toggle-container"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
          >
            <div className="hidden sm:flex items-center gap-2 bg-black/80 border border-crimson/40 px-3 py-1.5 rounded-full backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-white shadow-xl animate-pulse">
              <span className="h-2 w-2 rounded-full bg-crimson" />
              <span>Official AI Assistant</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="glass-card p-1 rounded-full cursor-pointer flex items-center justify-center overflow-hidden relative group"
              style={{
                borderColor: selectedCharacter.color,
                boxShadow: `0 0 25px ${selectedCharacter.color}60`,
              }}
              aria-label="Open Official AI Chatbot"
            >
              <img
                src={selectedCharacter.avatar}
                alt={selectedCharacter.name}
                className="w-13 h-13 rounded-full object-cover"
              />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-crimson font-mono text-[9px] font-bold text-white ring-2 ring-background">
                AI
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 80, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.92 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="fixed bottom-6 right-4 sm:right-6 z-50 w-[94%] max-w-[420px] sm:max-w-[460px] overflow-hidden"
          >
            <div
              className="glass-card rounded-xl overflow-hidden bg-black/90 shadow-2xl flex flex-col border transition-all duration-300"
              style={{ borderColor: selectedCharacter.color }}
            >
              {/* Official Header */}
              <div className="border-b border-white/10 p-4 bg-gradient-to-r from-black/90 via-black/70 to-black/90 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={selectedCharacter.avatar}
                      alt={selectedCharacter.name}
                      className="w-11 h-11 rounded-full object-cover border-2 shadow-md"
                      style={{ borderColor: selectedCharacter.color }}
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-mint animate-pulse border-2 border-black" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-display text-lg uppercase tracking-wider text-white">
                        {selectedCharacter.name}
                      </h3>
                      {selectedCharacter.type === "official" && (
                        <ShieldCheck size={14} className="text-crimson" />
                      )}
                    </div>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                      <span>{selectedCharacter.title}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {/* Voice Synthesis Toggle */}
                  <button
                    onClick={toggleVoice}
                    className={`p-2 rounded-md transition-all ${
                      voiceEnabled ? "bg-mint/20 text-mint" : "text-white/40 hover:bg-white/10"
                    }`}
                    title={voiceEnabled ? "Mute Voice" : "Enable Audio Voice Output"}
                  >
                    {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                  </button>

                  {/* Persona Switcher Toggle */}
                  <button
                    onClick={() => setShowSelector(!showSelector)}
                    className="p-2 rounded-md hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                    title="Switch Persona"
                  >
                    <RefreshCw size={16} />
                  </button>

                  {/* Clear Chat */}
                  {messages.length > 0 && (
                    <button
                      onClick={handleClearChat}
                      className="p-2 rounded-md hover:bg-white/10 text-white/40 hover:text-crimson transition-colors"
                      title="Clear Conversation"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}

                  {/* Close Window */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-md hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                    title="Close Chat"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Persona Selection Drawer */}
              <AnimatePresence>
                {showSelector && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-b border-white/10 bg-black/95 max-h-64 overflow-y-auto"
                  >
                    <div className="p-3">
                      <p className="font-mono text-[9px] uppercase tracking-widest text-crimson mb-2 font-semibold">
                        Select Persona // Archive Roster
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {CHARACTERS.map((char) => (
                          <button
                            key={char.id}
                            onClick={() => {
                              setSelectedCharacter(char);
                              setShowSelector(false);
                              setMessages([]);
                              if ("speechSynthesis" in window) {
                                window.speechSynthesis.cancel();
                              }
                            }}
                            className={`p-2 rounded-lg text-left border flex items-center gap-2.5 transition-all ${
                              selectedCharacter.id === char.id
                                ? "bg-white/15 border-white/30"
                                : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10"
                            }`}
                            style={{
                              borderColor: selectedCharacter.id === char.id ? char.color : "",
                            }}
                          >
                            <img
                              src={char.avatar}
                              alt={char.name}
                              className="w-8 h-8 rounded-full object-cover border"
                              style={{ borderColor: char.color }}
                            />
                            <div className="min-w-0 flex-1">
                              <div className="font-mono text-[10px] uppercase font-bold text-white truncate">
                                {char.name}
                              </div>
                              <div className="font-mono text-[8px] uppercase text-muted-foreground truncate">
                                {char.type}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Messages Container */}
              <div className="h-80 overflow-y-auto p-4 space-y-4 bg-black/40 flex-grow scrollbar-thin">
                {messages.length === 0 && (
                  <div className="text-center py-8 flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="relative mb-4"
                    >
                      <img
                        src={selectedCharacter.avatar}
                        alt={selectedCharacter.name}
                        className="w-20 h-20 rounded-full object-cover border-2 shadow-2xl"
                        style={{
                          borderColor: selectedCharacter.color,
                          boxShadow: `0 0 25px ${selectedCharacter.color}50`,
                        }}
                      />
                    </motion.div>
                    <p className="font-mono text-xs text-white/90 max-w-[85%] mx-auto leading-relaxed bg-white/5 p-3 rounded-lg border border-white/10">
                      "{selectedCharacter.greeting}"
                    </p>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-mint mt-3 block border border-mint/20 px-2.5 py-1 bg-mint/5 rounded-full">
                      Official Parody AI // Safe & Fictional
                    </span>
                  </div>
                )}

                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 rounded-xl relative overflow-hidden border ${
                        m.role === "user"
                          ? "bg-crimson/20 border-crimson/40 text-white rounded-tr-none"
                          : "bg-white/10 border-white/10 text-white/90 rounded-tl-none"
                      }`}
                    >
                      {m.role === "assistant" && (
                        <div className="flex items-center justify-between gap-2 mb-1 border-b border-white/10 pb-1">
                          <span className="font-mono text-[9px] uppercase font-bold text-mint">
                            {selectedCharacter.name}
                          </span>
                          <button
                            onClick={() => handleCopyText(m.id, m.content)}
                            className="text-white/40 hover:text-white transition-colors"
                            title="Copy Response"
                          >
                            {copiedId === m.id ? (
                              <Check size={11} className="text-mint" />
                            ) : (
                              <Copy size={11} />
                            )}
                          </button>
                        </div>
                      )}
                      <p
                        className="font-body text-xs leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: formatText(m.content) }}
                      />
                      <span className="font-mono text-[8px] text-white/30 mt-1.5 block text-right">
                        {m.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 border border-white/10 p-3 rounded-xl rounded-tl-none flex items-center gap-2">
                      <span className="font-mono text-[9px] text-mint uppercase font-semibold">
                        {selectedCharacter.name} is typing
                      </span>
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-mint animate-bounce" />
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-mint animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-mint animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompt Chips */}
              {messages.length === 0 && (
                <div className="p-3 border-t border-white/10 bg-black/40">
                  <p className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1">
                    <Sparkles size={10} className="text-mint" />
                    <span>Quick Inquiries</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTED_PROMPTS.slice(0, 3).map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => handleSuggestedPrompt(prompt)}
                        className="px-2.5 py-1 text-[10px] font-mono bg-white/5 border border-white/10 rounded-md hover:bg-white/15 hover:border-mint/50 transition-all text-white/80 hover:text-white"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Footer */}
              <div className="p-4 border-t border-white/10 bg-black/80">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    placeholder={`Consult with ${selectedCharacter.name}...`}
                    className="flex-1 bg-white/5 border border-white/15 rounded-lg px-3.5 py-2 font-body text-xs text-white placeholder:text-white/30 focus:outline-none transition-colors"
                    style={{
                      borderColor: isInputFocused ? selectedCharacter.color : undefined,
                    }}
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!input.trim() || isTyping}
                    className="px-4 py-2 rounded-lg font-mono text-[10px] uppercase tracking-wider text-white disabled:opacity-40 transition-all cursor-pointer flex items-center justify-center"
                    style={{
                      background: selectedCharacter.color,
                      boxShadow: `0 0 12px ${selectedCharacter.color}70`,
                    }}
                  >
                    <Send size={13} />
                  </button>
                </div>
                <div className="mt-2.5 flex items-center justify-between text-white/40 font-mono text-[8px] uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <ShieldAlert size={10} className="text-crimson" />
                    <span>Satirical Parody AI // Every Buy Button → FBI.gov</span>
                  </div>
                  <span className="text-mint font-semibold">ENCRYPTED</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
