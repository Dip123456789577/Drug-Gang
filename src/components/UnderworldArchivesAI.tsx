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
  type: "fictional" | "historical";
}

const CHARACTERS: Character[] = [
  {
    id: "walter",
    name: "Walter White",
    title: "Chemistry Tutor (Fictional)",
    avatar: "/avatars/walter.png",
    personality:
      "Brilliant, methodical, intense, speaks with precision and authority. Often references chemistry, purity, and control.",
    greeting:
      "I am the one who knocks. Or rather, the one who answers chemistry questions. What's on your mind? Keep it academic, please.",
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
      "Casual, emotional, uses slang, passionate about art and chemistry. Often says 'yo' and 'bitch' (responsibly).",
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
      "Witty 1920s Chicago broker who focuses on 'accounting oversights' and spaghetti importing. References historical Chicago, soup kitchens, and book-keeping.",
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
      "Hola. I am here to share archives from 1980s Colombia. Did you know my private zoo's escapee hippos are now a major environmental topic? Let's discuss history.",
    color: "#10b981", // Neon Emerald
    type: "historical",
  },
];

const SUGGESTED_PROMPTS = [
  "Tell me about your background",
  "What is your business philosophy?",
  "Can you share a quote?",
  "Tell me a joke",
  "Is crime ever worth it?",
  "What is your favorite chemistry element?",
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
    return "This is a parody experience. I can't help with illegal activity. Around here, the only thing you'll end up buying is a visit to the FBI homepage. Now, shall we discuss something more... legal?";
  }

  // Character-specific dialog grids
  const responses: Record<string, string[]> = {
    walter: [
      "Let me be clear: I am a chemistry teacher. I teach chemistry. That is what I do. It is the study of matter, but I prefer to see it as the study of change.",
      "You know exactly who I am. Say my name. (Just kidding, this is a parody site. Please don't say my name in earnest.)",
      "I did it for me. I liked it. I was good at it. And... I was alive. But historically, crime leads to absolute destruction. Stick to textbooks.",
      "Chemistry is about precision. Every reaction has a catalyst. If you don't follow the rules, the system collapses.",
      "There is no 'try'. There is only action and consequence. That is chemical law.",
      "I have spent my whole life scared of failure. But fear is the worst of it. It's the real enemy.",
    ],
    saul: [
      "Look, I'm a lawyer, not a miracle worker. But I can work miracles! For a reasonable retainer, of course.",
      "It's all good, man! Better call Saul! Just remember, you can dodge a lot of things, but never audit a tax auditor.",
      "You know what they say: when the going gets tough, the tough get... a highly creative legal defense.",
      "Legal, illegal, what's the difference? Well, about 10-15 years, usually! So always stay on the legal side, okay?",
      "Need a getaway car? I recommend a sensible sedan. Much less attention from the authorities.",
      "Hey, I know a guy who knows a guy... who runs a very successful, legitimate lasagna restaurant. Try the lasagna.",
    ],
    gus: [
      "I believe in a measured approach to all things. Precision is key. A business cannot survive without standards.",
      "A man provides. And he does it even when he's not appreciated, or respected. He simply provides.",
      "I do not consider myself a villain. I am a businessman, and my franchise, Los Pollos Hermanos, serves excellent chicken.",
      "There is no room for error in my line of work. Every employee must maintain perfect composure and cleanliness.",
      "I prefer to work in silence. Results speak louder than excuses. I do not tolerate excuses.",
      "Respect is earned. Fear is temporary, but respect creates long-term structural efficiency.",
    ],
    jesse: [
      "Yo, that's crazy, man. Just crazy. Science, bitch! That's what it's all about.",
      "You know what I'm saying? It's all about finding your art, man. Chemistry is cool, but drawing robots is way cooler.",
      "Yeah, science! That's the ticket, man. Mr. White actually knows his stuff, even if he's super strict.",
      "Sometimes you gotta break a few rules... wait, no, don't break rules. Jails are super cold and they don't have good snacks.",
      "I'm just trying to make things right, you know? Like, start fresh. Do some woodwork or something.",
      "Yo, let's keep it clean. My nerves can't handle any more unmarked vans parked outside my house.",
    ],
    capone: [
      "Always make sure your taxes are in order. That was my... business oversight, let's call it. The IRS doesn't care about spaghetti.",
      "Chicago in the 1920s was a beautiful place. The jazz, the pasta, the... business negotiations. But Alcatraz was not so nice.",
      "Don't ask me about soup kitchens. We fed thousands during the depression, but the newspapers only wanted to write about tax audits.",
      "The government is a tough negotiator. You can dodge everything, but never dodge the book-keeping.",
      "Prohibition was a mistake, historically speaking. It made soda pop very popular, though.",
    ],
    escobar: [
      "I spent millions on building a private zoo. Now my hippos are running the rivers of Colombia. That is history for you.",
      "Let us discuss the history of the 1980s. A very complicated time. But remember, the powdered sugar goes on the donuts, nowhere else.",
      "I built houses and soccer fields, but history remembers the cost. Real history shows crime never pays in the end.",
      "Do you want to know about Hacienda Nápoles? It is now a theme park. Very family-friendly, unlike the 80s.",
      "The hippo population has grown to over 150. They are classified as invasive. That's a true scientific fact.",
    ],
  };

  const characterResponses = responses[character.id] || responses.walter;
  const randomResponse = characterResponses[Math.floor(Math.random() * characterResponses.length)];

  // Add contextual prompts
  if (
    lowerMessage.includes("hello") ||
    lowerMessage.includes("hi") ||
    lowerMessage.includes("hola")
  ) {
    return character.greeting;
  }

  if (lowerMessage.includes("joke")) {
    const jokes: Record<string, string> = {
      walter: "Why do chemists like nitrates? Because they are cheaper than day rates!",
      saul: "What do you call a lawyer who doesn't chase ambulances? Retired!",
      gus: "Why don't I tell jokes? Because jokes are structurally inefficient and waste employee time.",
      jesse:
        "Why did the chemist break up with his girlfriend? Because there was no chemistry, yo!",
      capone: "Why did I get caught? Because I forgot to carry the one on my tax sheet!",
      escobar:
        "Why did the hippo cross the road? To escape the Colombian zoo and colonize a river!",
    };
    return jokes[character.id] || randomResponse;
  }

  if (lowerMessage.includes("quote")) {
    const quotes: Record<string, string> = {
      walter: '"I am not in danger, Skyler. I am the danger!"',
      saul: '"It\'s all good, man!"',
      gus: '"I do not believe in excuses. A man provides."',
      jesse: '"Yeah, science, bitch!"',
      capone:
        '"You can get much further with a kind word and a gun than you can with a kind word alone." (But seriously, stick to kind words.)',
      escobar:
        '"All empires are created of blood and fire. But they always turn to dust. Read history books."',
    };
    return quotes[character.id] || randomResponse;
  }

  return randomResponse;
}

const speakText = (text: string, characterName: string) => {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();

  // Strip simple tags
  const cleanText = text.replace(/<[^>]*>/g, "").replace(/"/g, "");
  const utterance = new SpeechSynthesisUtterance(cleanText);
  const voices = window.speechSynthesis.getVoices();

  if (
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
    // Attempt Spanish accent or standard voice
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
    // Cancel any speech when closing
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

    // Simulate AI response delay
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

        // If they input illegal keyword, trigger FBI redirect warning
        if (checkRefusal) {
          setTimeout(() => {
            // Play buzzer/alarm if voice enabled
            if ("speechSynthesis" in window) {
              speakText("Redirecting to the FBI. That's the joke.", "System Alert");
            }
          }, 1500);
        }
      },
      1000 + Math.random() * 1000,
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
      {/* Floating Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="toggle-btn"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 glass-card p-1 rounded-full cursor-pointer flex items-center justify-center overflow-hidden animate-pulse"
            style={{
              borderColor: selectedCharacter.color,
              boxShadow: `0 0 25px ${selectedCharacter.color}50`,
            }}
          >
            <img
              src={selectedCharacter.avatar}
              alt={selectedCharacter.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed bottom-6 right-6 z-50 w-[92%] max-w-[420px] sm:max-w-[460px] overflow-hidden"
          >
            <div
              className="glass-card rounded-lg overflow-hidden bg-black/85 shadow-2xl flex flex-col border transition-all duration-300"
              style={{ borderColor: selectedCharacter.color }}
            >
              {/* Header */}
              <div className="border-b border-white/10 p-4 bg-black/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={selectedCharacter.avatar}
                      alt={selectedCharacter.name}
                      className="w-10 h-10 rounded-full object-cover border border-white/20"
                      style={{ borderColor: selectedCharacter.color }}
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse border border-black" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg uppercase tracking-wider text-white">
                      {selectedCharacter.name}
                    </h3>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                      {selectedCharacter.title}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {/* Voice Synthesis Toggle */}
                  <button
                    onClick={toggleVoice}
                    className={`p-2 rounded transition-colors hover:bg-white/10 ${
                      voiceEnabled ? "text-mint" : "text-white/40"
                    }`}
                    title={
                      voiceEnabled
                        ? "Mute Chatbot Voice"
                        : "Enable Chatbot Voice (Speech Synthesis)"
                    }
                  >
                    {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                  </button>

                  {/* Character Changer dropdown toggle */}
                  <button
                    onClick={() => setShowSelector(!showSelector)}
                    className="p-2 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                    title="Switch Caricatures"
                  >
                    <RefreshCw size={16} />
                  </button>

                  {/* Close window */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                    title="Close Chat"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Character Selection Panel */}
              <AnimatePresence>
                {showSelector && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-b border-white/10 bg-black/80 max-h-56 overflow-y-auto"
                  >
                    <div className="p-3 grid grid-cols-2 gap-2">
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
                          className={`p-2 rounded text-left border flex items-center gap-2 transition-all ${
                            selectedCharacter.id === char.id
                              ? "bg-white/10"
                              : "bg-white/5 border-white/5 hover:border-white/20"
                          }`}
                          style={{
                            borderColor: selectedCharacter.id === char.id ? char.color : "",
                          }}
                        >
                          <img
                            src={char.avatar}
                            alt={char.name}
                            className="w-8 h-8 rounded-full object-cover border border-white/10"
                            style={{ borderColor: char.color }}
                          />
                          <div className="min-w-0">
                            <div className="font-mono text-[10px] uppercase font-bold text-white truncate">
                              {char.name}
                            </div>
                            <div className="font-mono text-[8px] uppercase text-muted-foreground truncate">
                              {char.type} Mode
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Message Panel */}
              <div className="h-80 overflow-y-auto p-4 space-y-4 bg-black/40 flex-grow scrollbar-thin">
                {messages.length === 0 && (
                  <div className="text-center py-10 flex flex-col items-center">
                    <div className="relative mb-4 animate-bounce">
                      <img
                        src={selectedCharacter.avatar}
                        alt={selectedCharacter.name}
                        className="w-20 h-20 rounded-full object-cover border-2"
                        style={{
                          borderColor: selectedCharacter.color,
                          boxShadow: `0 0 20px ${selectedCharacter.color}40`,
                        }}
                      />
                    </div>
                    <p className="font-mono text-xs text-white/80 max-w-[80%] mx-auto leading-relaxed">
                      "{selectedCharacter.greeting}"
                    </p>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white/30 mt-4 block border border-white/10 px-2 py-1 bg-white/5 rounded">
                      {selectedCharacter.type === "historical"
                        ? "Historical Role-Play // Educational"
                        : "Fictional Caricature // Satire"}
                    </span>
                  </div>
                )}

                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-lg relative overflow-hidden border ${
                        m.role === "user"
                          ? "bg-black/40 text-white rounded-tr-none"
                          : "bg-white/5 text-white/90 rounded-tl-none border-white/5"
                      }`}
                      style={{
                        borderColor: m.role === "user" ? selectedCharacter.color : "",
                      }}
                    >
                      {m.role === "assistant" && (
                        <span className="font-mono text-[9px] uppercase text-white/30 block mb-1">
                          {selectedCharacter.name}
                        </span>
                      )}
                      <p
                        className="font-body text-xs leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: formatText(m.content) }}
                      />
                      <span className="font-mono text-[8px] text-white/20 mt-1.5 block text-right">
                        {m.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 border border-white/5 p-3 rounded-lg rounded-tl-none flex items-center gap-2">
                      <span className="font-mono text-[9px] text-white/30 uppercase">
                        {selectedCharacter.name}
                      </span>
                      <div className="flex gap-1">
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-mint animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
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

              {/* Suggestions */}
              {messages.length === 0 && (
                <div className="p-3 border-t border-white/10 bg-black/20">
                  <p className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground mb-2">
                    Research Suggestions
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTED_PROMPTS.slice(0, 3).map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => handleSuggestedPrompt(prompt)}
                        className="px-2 py-1 text-[10px] font-mono bg-white/5 border border-white/5 rounded hover:bg-white/10 transition-all text-white/70 hover:text-white"
                        style={{
                          borderColor: `${selectedCharacter.color}15`,
                        }}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input section */}
              <div className="p-4 border-t border-white/10 bg-black/60">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    placeholder={`Ask ${selectedCharacter.name}...`}
                    className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 font-body text-xs text-white placeholder:text-white/20 focus:outline-none transition-colors"
                    style={{
                      borderColor: isInputFocused ? selectedCharacter.color : undefined,
                    }}
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!input.trim() || isTyping}
                    className="px-3 py-2 rounded font-mono text-[10px] uppercase tracking-wider text-white disabled:opacity-40 transition-all cursor-pointer flex items-center justify-center"
                    style={{
                      background: selectedCharacter.color,
                      boxShadow: `0 0 10px ${selectedCharacter.color}60`,
                    }}
                  >
                    <Send size={12} />
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-center gap-1 text-white/30 font-mono text-[8px] uppercase">
                  <ShieldAlert size={10} className="text-crimson" />
                  <span>Interactive Parody Experience // Strictly Comedy</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
