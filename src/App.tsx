import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  ShieldAlert,
  ChevronDown,
  Star,
  Phone,
  Mail,
  HelpCircle,
  CheckCircle,
  Lock,
  AlertTriangle,
} from "lucide-react";
import heroBg from "./assets/hero-bg.jpg";
import UnderworldArchivesAI from "./components/UnderworldArchivesAI";

const LISTINGS = [
  {
    codename: "Al Caprice-One",
    tagline: "Tax Advisor, Allegedly",
    description:
      "Ran a legitimate spaghetti importing business in the 1920s. Definitely did not commit any 33 counts of tax evasion. Very good with numbers, allegedly.",
    weight: "0.00 g",
    lethality: "PAPERWORK",
    price: "$1,929.00",
    tag: "HISTORICAL COSPLAY",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  },
  {
    codename: "Pablo Escoban-Bread",
    tagline: "Import/Export (Bread Only)",
    description:
      "Definitely just a Colombian bakery owner. His famous 'white powder' is 100% powdered sugar for donuts, we swear. Deliveries by hippo.",
    weight: "1.00 kg (of flour)",
    lethality: "CARBOHYDRATE",
    price: "$99.99",
    tag: "ARTISAN BAKERY",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
  },
  {
    codename: "Bonnie & Clyde-o'clock",
    tagline: "Punctuality Consultants",
    description:
      "A charming couple offering vintage getaway-driving lessons and matching outfits. No banks harmed in the making of this listing.",
    weight: "2 people",
    lethality: "DRAMATIC",
    price: "$19.34",
    tag: "COUPLES RETREAT",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
  },
  {
    codename: "Tony Meatballi",
    tagline: "Fictional Restaurateur",
    description:
      "Owner of a Miami-based cuban restaurant. Says hello to his little friend, which is a very small poodle named Snowflake. Not that Snowflake.",
    weight: "1 world",
    lethality: "SEASONED",
    price: "$83.00",
    tag: "FINE DINING",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face&grayscale",
  },
  {
    codename: "The Godfather-in-Law",
    tagline: "Family Mediation Services",
    description:
      "He'll make you an offer you can definitely refuse without consequences. Specializes in awkward Thanksgivings and horse-themed pranks.",
    weight: "1 family",
    lethality: "PASSIVE-AGGRESSIVE",
    price: "$1,972.00",
    tag: "LIFE COACH",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&sepia",
  },
  {
    codename: "Walter Wheat",
    tagline: "Chemistry Tutor (Retired)",
    description:
      "Former high-school teacher pivoting to artisanal blue rock candy. Absolutely legal confectionery. Do not knock. Motorhome not included.",
    weight: "99.1% purity (of cane sugar)",
    lethality: "DIABETIC",
    price: "$50.00",
    tag: "STEM EDUCATION",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
  },
];

const REVIEWS = [
  {
    name: "AnonymousBuyer99",
    rating: 1,
    comment: "Unexpectedly educational.",
    date: "2 minutes ago",
    verified: true,
  },
  {
    name: "LawAbidingCitizen",
    rating: 5,
    comment: "Ended up on the FBI website instead.",
    date: "1 hour ago",
    verified: true,
  },
  {
    name: "Heisenberg_Jr",
    rating: 2,
    comment:
      "Artisanal blue candy was not delivered. Got a sternly worded disclaimer and a government homepage instead. 2 stars because the website looks great.",
    date: "Yesterday",
    verified: false,
  },
  {
    name: "NotACop123",
    rating: 5,
    comment:
      "Excellent service! We are monitoring this page very closely. Highly recommend clicking the buy button to anyone who wants to meet our field agents.",
    date: "3 days ago",
    verified: true,
  },
];

const FAQS = [
  {
    question: "Can I actually buy anything here?",
    answer:
      "Absolutely not. This website is 100% satire and comedy for entertainment. We do not sell, distribute, or facilitate the transaction of any goods or services (legal or illegal).",
  },
  {
    question: "Why did I get redirected to the FBI website?",
    answer:
      "That is the central joke of the website! Every 'Buy Now' button leads to a fake, humorous checkout sequence that ends with redirecting your browser to the official FBI website. No actual transaction takes place.",
  },
  {
    question: "Is this website run by law enforcement?",
    answer:
      "No. We are a comedy project. We are not affiliated with the FBI, DEA, or any other government agency. We just think redirecting eager buyers to a government homepage is funny.",
  },
  {
    question: "Will I get in trouble for clicking the buttons?",
    answer:
      "No. Clicking the buttons simply triggers a standard browser redirect (`window.location.href`) to the public FBI website. It's a harmless prank designed for a laugh.",
  },
];

function Disclaimer({ variant = "top" }: { variant?: "top" | "bottom" }) {
  return (
    <div
      className={`relative border-crimson ${variant === "top" ? "border-b-2" : "border-t-2"} bg-black/60 backdrop-blur-md`}
    >
      <div className="mx-auto max-w-[1280px] px-4 py-3 md:px-16 text-center">
        <p className="font-mono text-[11px] uppercase leading-relaxed tracking-widest text-white md:text-xs">
          <span className="text-crimson font-bold">⚠ Disclaimer // </span> This website is a parody
          created for entertainment only. No illegal goods or services are offered. Every purchase
          redirects to the official FBI website as the joke.
        </p>
      </div>
    </div>
  );
}

function TopMarquee() {
  const items = [
    "PARODY //",
    "SATIRE //",
    "NOTHING IS FOR SALE //",
    "EVERY BUY BUTTON → FBI.GOV //",
    "COMEDY ONLY //",
    "DO NOT ATTEMPT //",
  ];
  const line = [...items, ...items, ...items].join("  ");
  return (
    <div className="overflow-hidden bg-crimson">
      <div className="animate-marquee whitespace-nowrap py-1.5 font-mono text-[11px] font-medium tracking-widest text-white">
        {line} &nbsp; {line}
      </div>
    </div>
  );
}

function Particles() {
  const dots = Array.from({ length: 40 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => {
        const size = 1 + Math.random() * 3;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 8;
        const dur = 8 + Math.random() * 10;
        const crimson = Math.random() > 0.5;
        return (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              background: crimson ? "#e11d48" : "#3cddc7",
              boxShadow: `0 0 ${size * 6}px ${crimson ? "#e11d48" : "#3cddc7"}`,
              animation: `particle-float ${dur}s ease-in-out ${delay}s infinite`,
              opacity: 0.4,
            }}
          />
        );
      })}
    </div>
  );
}

function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate(${e.clientX - 350}px, ${e.clientY - 350}px)`;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-0 h-[700px] w-[700px] rounded-full opacity-30 blur-3xl transition-transform duration-150 ease-out"
      style={{
        background: "radial-gradient(circle, rgba(225,29,72,0.5) 0%, rgba(225,29,72,0) 70%)",
      }}
    />
  );
}

const REDIRECT_STEPS = [
  { text: "Checking inventory...", duration: 1500 },
  { text: "Encrypting transaction...", duration: 1500 },
  { text: "Notifying authorities...", duration: 1500 },
  { text: "Your order has been forwarded... to the FBI.", duration: 2500 },
];

function BuyModal({
  open,
  listing,
  onClose,
}: {
  open: boolean;
  listing: (typeof LISTINGS)[number] | null;
  onClose: () => void;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!open) return;
    setStepIndex(0);
    setProgress(0);

    const totalDuration = REDIRECT_STEPS.reduce((sum, s) => sum + s.duration, 0);
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += 100;
      const percent = Math.min(100, (elapsed / totalDuration) * 100);
      setProgress(percent);

      // Determine step based on elapsed time
      let currentSum = 0;
      let targetStep = 0;
      for (let i = 0; i < REDIRECT_STEPS.length; i++) {
        currentSum += REDIRECT_STEPS[i].duration;
        if (elapsed >= currentSum) {
          targetStep = i + 1;
        } else {
          break;
        }
      }
      setStepIndex(Math.min(REDIRECT_STEPS.length - 1, targetStep));
    }, 100);

    const redirect = setTimeout(() => {
      window.location.href = "https://www.fbi.gov";
    }, totalDuration);

    return () => {
      clearInterval(interval);
      clearTimeout(redirect);
    };
  }, [open]);

  if (!open) return null;

  const isFinalStep = stepIndex === 3;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md px-4">
      <div
        className={`glass-card animate-fade-up relative w-full max-w-lg p-8 md:p-10 border-t-4 ${isFinalStep ? "border-t-crimson" : "border-t-mint"}`}
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${isFinalStep ? "bg-crimson" : "bg-mint"}`}
              />
              <span
                className={`relative inline-flex h-3 w-3 rounded-full ${isFinalStep ? "bg-crimson" : "bg-mint"}`}
              />
            </span>
            <span
              className={`font-mono text-xs uppercase tracking-[0.3em] ${isFinalStep ? "text-crimson" : "text-mint"}`}
            >
              {isFinalStep ? "SECURITY ALERT // OUTBOUND" : "SECURE CHANNEL // DATA TRANSMISSION"}
            </span>
          </div>
          {isFinalStep && (
            <div className="bg-crimson/20 border border-crimson text-crimson px-2 py-0.5 rounded font-mono text-[9px] uppercase tracking-widest animate-pulse">
              Forwarded
            </div>
          )}
        </div>

        <h3 className="font-display text-3xl uppercase tracking-wider md:text-4xl text-white">
          {isFinalStep ? "Order Intercepted!" : "Processing Order..."}
        </h3>

        {listing && (
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            TARGET CODE: <span className="text-white">{listing.codename}</span> — PRICE:{" "}
            <span className="text-crimson">{listing.price}</span>
          </p>
        )}

        <div className="mt-8">
          <div className="h-1.5 w-full bg-white/10 overflow-hidden rounded-full">
            <div
              className={`h-full transition-all duration-100 rounded-full ${isFinalStep ? "bg-crimson" : "bg-mint"}`}
              style={{
                width: `${progress}%`,
                boxShadow: isFinalStep ? "0 0 15px #e11d48" : "0 0 15px #3cddc7",
              }}
            />
          </div>
          <div className="mt-4 min-h-[40px] flex items-start gap-2 bg-black/40 border border-white/5 p-3 rounded font-mono text-xs text-white">
            <span className={isFinalStep ? "text-crimson animate-pulse" : "text-mint font-bold"}>
              &gt;
            </span>
            <div className="flex-1">
              <p
                className={
                  isFinalStep ? "text-crimson font-bold text-sm tracking-wide" : "text-white/90"
                }
              >
                {REDIRECT_STEPS[stepIndex].text}
              </p>
              {isFinalStep && (
                <p className="text-[10px] text-white/50 mt-1 uppercase tracking-wider">
                  Redirecting to official authorities...
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 border-l-2 border-crimson bg-black/50 p-4 font-mono text-[10px] uppercase leading-relaxed tracking-widest text-white/80 rounded-r">
          <div className="flex gap-2 items-center text-crimson font-bold mb-1">
            <AlertTriangle size={14} />
            <span>ATTENTION USER:</span>
          </div>
          Every Buy button redirects to the{" "}
          <span className="text-crimson underline font-bold">fbi.gov</span> homepage as a comedy
          gag. You will be redirected in just a moment.
        </div>

        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={onClose}
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-white transition-colors"
          >
            ← Close Modal
          </button>
          <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">
            Fictional Transaction
          </span>
        </div>
      </div>
    </div>
  );
}

function Nav({ cartCount, warrantsCount }: { cartCount: number; warrantsCount: number }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b border-white/5 bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 md:px-16">
        <a
          href="#top"
          className="group flex items-center gap-2 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          aria-label="Return to top"
        >
          <span
            className="inline-block h-2 w-2 rounded-full bg-crimson animate-pulse-crimson"
            aria-hidden="true"
          />
          <span className="font-display text-xl uppercase tracking-[0.15em] group-hover:text-crimson transition-colors text-white">
            Definitely<span className="text-crimson">.Not</span>
          </span>
        </a>

        {/* Fake Cart in Navbar */}
        <div className="hidden lg:flex items-center gap-4 border border-white/10 bg-black/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider rounded-sm">
          <div className="flex items-center gap-1.5">
            <ShoppingCart size={12} className="text-mint" />
            <span>
              Items in cart: <span className="text-mint font-bold">{cartCount}</span>
            </span>
          </div>
          <div className="h-3 w-px bg-white/20" />
          <div className="flex items-center gap-1.5">
            <ShieldAlert size={12} className="text-crimson" />
            <span>
              Outstanding warrants: <span className="text-crimson font-bold">{warrantsCount}</span>
            </span>
          </div>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          {["Listings", "Reviews", "FAQ", "Manifesto", "Warning"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground hover:text-crimson relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm px-3 py-2 whitespace-nowrap"
            >
              {l}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-crimson transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#listings"
            className="hidden bg-crimson px-5 py-2 font-mono text-[10px] uppercase tracking-widest text-white crimson-glow rounded-sm transition-all hover:bg-crimson/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2 focus-visible:ring-offset-background md:block whitespace-nowrap"
          >
            Enter Catalog
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Cart for Mobile Menu */}
              <div className="flex items-center justify-around border border-white/10 bg-black/40 px-3 py-3 font-mono text-[10px] uppercase tracking-wider rounded-sm mb-4">
                <div className="flex items-center gap-1.5">
                  <ShoppingCart size={12} className="text-mint" />
                  <span>
                    Cart: <span className="text-mint font-bold">{cartCount}</span>
                  </span>
                </div>
                <div className="h-4 w-px bg-white/20" />
                <div className="flex items-center gap-1.5">
                  <ShieldAlert size={12} className="text-crimson" />
                  <span>
                    Warrants: <span className="text-crimson font-bold">{warrantsCount}</span>
                  </span>
                </div>
              </div>

              {["Listings", "Reviews", "FAQ", "Manifesto", "Warning"].map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-crimson py-2"
                >
                  {l}
                </a>
              ))}
              <a
                href="#listings"
                onClick={() => setMobileMenuOpen(false)}
                className="block bg-crimson px-6 py-3 font-mono text-xs uppercase tracking-widest text-white crimson-glow rounded-sm transition-all hover:bg-crimson/90 text-center"
              >
                Enter Catalog
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero({ onBrowse }: { onBrowse: () => void }) {
  return (
    <section
      id="top"
      className="relative overflow-hidden min-h-[90vh] flex items-center justify-center"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt=""
          className="h-full w-full object-cover opacity-40"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-background/90" />
      </div>
      <Particles />
      <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col items-center px-4 py-20 text-center md:px-16">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 border border-crimson/40 bg-black/70 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.35em] text-crimson backdrop-blur-md rounded-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse" aria-hidden="true" />
          CLASSIFIED PARODY // SECURE CONNECTION PRESET
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-4xl uppercase leading-none tracking-wider md:text-6xl lg:text-[80px] xl:text-[90px] text-white"
        >
          The Internet's
          <br />
          <span className="text-crimson font-extrabold drop-shadow-[0_0_15px_rgba(225,29,72,0.4)]">
            Worst Place
          </span>
          <br />
          To Buy Illegal Things.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 max-w-2xl font-body text-base text-muted-foreground md:text-lg leading-relaxed"
        >
          Spoiler: Every bad decision leads somewhere unexpected.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-4 max-w-xl font-mono text-[10px] uppercase tracking-widest text-white/50 leading-relaxed"
        >
          This is an entirely satirical parody website. Every single purchase action forwards you
          straight to the official FBI website. Proceed with caution and a sense of humor.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={onBrowse}
            className="group relative bg-crimson px-10 py-4 font-mono text-xs uppercase tracking-[0.25em] text-white crimson-glow rounded-sm transition-all hover:bg-crimson/90 hover:scale-105"
          >
            Browse Listings
          </button>
          <a
            href="#manifesto"
            className="border border-white/20 bg-black/40 px-8 py-4 font-mono text-xs uppercase tracking-[0.25em] text-white/80 backdrop-blur transition-all hover:border-mint hover:text-mint hover:bg-black/60 hover:scale-105 rounded-sm"
          >
            Read the Manifesto
          </a>
        </motion.div>

        <div className="mt-16 grid w-full max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
          {[
            ["0", "Items Sold"],
            ["100%", "FBI Redirect Rate"],
            ["∞", "Good Laughs"],
          ].map(([n, l]) => (
            <div key={l} className="text-center group">
              <div className="font-display text-3xl text-mint md:text-4xl group-hover:scale-110 transition-transform">
                {n}
              </div>
              <div className="mt-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

function ListingCard({
  l,
  onBuy,
  index,
}: {
  l: (typeof LISTINGS)[number];
  onBuy: () => void;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass-card glass-card-hover group relative flex flex-col rounded-sm overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={l.image}
          alt={l.codename}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="border border-white/10 bg-black/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-mint rounded-sm backdrop-blur-sm">
            {l.tag}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/80 bg-black/50 px-2 py-1 rounded-sm backdrop-blur-sm">
            #{String(index + 1).padStart(3, "0")}
          </span>
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <h3 className="font-display text-3xl uppercase leading-tight tracking-wider md:text-4xl group-hover:text-crimson transition-colors text-white">
          {l.codename}
        </h3>
        <p className="mt-2 font-mono text-xs uppercase tracking-widest text-crimson">{l.tagline}</p>

        <p className="mt-6 font-body text-sm leading-relaxed text-white/70 md:text-base">
          {l.description}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="border-l border-white/10 pl-4 group-hover:border-crimson/50 transition-colors">
            <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              Weight
            </div>
            <div className="font-mono text-xs text-white mt-1">{l.weight}</div>
          </div>
          <div className="border-l border-white/10 pl-4 group-hover:border-mint/50 transition-colors">
            <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              Lethality
            </div>
            <div className="font-mono text-xs text-mint mt-1">{l.lethality}</div>
          </div>
        </div>

        {/* Detailed Placeholder Contact Info */}
        <div className="mt-6 border-t border-white/5 pt-5 space-y-1.5 font-mono text-[10px] uppercase tracking-widest text-white/50">
          <div className="flex items-center gap-2">
            <Phone size={10} className="text-crimson" />
            <span>Phone: 000-000-0000</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={10} className="text-mint" />
            <span>Email: not-real@example.com</span>
          </div>
        </div>

        <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/10">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              Asking price
            </div>
            <div className="font-display text-3xl text-white mt-1 group-hover:text-crimson transition-colors">
              {l.price}
            </div>
          </div>
          <button
            onClick={onBuy}
            className="relative bg-crimson px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white crimson-glow rounded-sm transition-all hover:bg-crimson/90 hover:scale-105"
          >
            Buy Now
          </button>
        </div>
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent rounded-sm"
      />
    </motion.article>
  );
}

function Listings({ onBuy }: { onBuy: (l: (typeof LISTINGS)[number]) => void }) {
  return (
    <section id="listings" className="relative py-24 md:py-32 scroll-mt-20">
      <div className="mx-auto max-w-[1280px] px-4 md:px-16">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-crimson">
              // ACTIVE LISTINGS — 100% PARODY CATALOG
            </p>
            <h2 className="mt-4 font-display text-4xl uppercase leading-none tracking-wider md:text-6xl text-white">
              Meet our <span className="text-crimson">Parody</span> Cast.
              <br />
              All names are <span className="text-mint">fictional</span>.
            </h2>
          </div>
          <p className="max-w-md font-body text-sm text-muted-foreground md:text-base leading-relaxed">
            A satirical catalog of caricature profiles inspired by television, movie, and historical
            crime figures. Click "Buy Now" to activate the FBI warning system.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {LISTINGS.map((l, i) => (
            <ListingCard key={l.codename} l={l} index={i} onBuy={() => onBuy(l)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section
      id="reviews"
      className="relative py-24 md:py-32 border-t border-white/5 bg-black/20 scroll-mt-20"
    >
      <div className="mx-auto max-w-[1280px] px-4 md:px-16">
        <div className="mb-16 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-mint">
            // TESTIMONIALS
          </p>
          <h2 className="mt-4 font-display text-4xl uppercase tracking-wider md:text-6xl text-white">
            Fake Customer <span className="text-crimson">Reviews</span>
          </h2>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-white/50">
            Reviews gathered from individuals who clicked the buttons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6 rounded-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={14}
                      className={idx < r.rating ? "text-crimson fill-crimson" : "text-white/10"}
                    />
                  ))}
                </div>
                <p className="font-body text-sm italic text-white/80 leading-relaxed">
                  "{r.comment}"
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider">
                <div>
                  <span className="text-white font-bold block">{r.name}</span>
                  <span className="text-white/40">{r.date}</span>
                </div>
                {r.verified && (
                  <span className="text-mint flex items-center gap-1 text-[9px] tracking-widest">
                    <CheckCircle size={10} /> Verified
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 md:py-32 border-t border-white/5 scroll-mt-20">
      <div className="mx-auto max-w-[800px] px-4 md:px-16">
        <div className="mb-16 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-crimson">
            // TRANSPARENCY MANUAL
          </p>
          <h2 className="mt-4 font-display text-4xl uppercase tracking-wider md:text-6xl text-white">
            Frequently Asked <span className="text-mint">Questions</span>
          </h2>
          <p className="mt-4 font-body text-sm text-muted-foreground">
            Clear technical explanations of this satirical environment.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="glass-card rounded-sm overflow-hidden">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-white/5 focus:outline-none focus-visible:ring-1 focus-visible:ring-mint"
                >
                  <span className="font-mono text-sm uppercase tracking-wider text-white font-medium flex items-center gap-3">
                    <HelpCircle size={16} className="text-crimson shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-white/60 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-white/5 bg-black/20"
                    >
                      <div className="p-6 font-body text-sm text-white/70 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  const points = [
    {
      k: "01",
      t: "Nothing Is For Sale",
      d: "No products. No services. No transactions. Just a joke, wearing a very expensive-looking hoodie.",
    },
    {
      k: "02",
      t: "Every Button Snitches",
      d: "Every 'Buy Now' opens a fake loading modal and then hand-delivers you to fbi.gov. That's the entire punchline.",
    },
    {
      k: "03",
      t: "Purely Satirical",
      d: "Character names reference pop culture and history. Descriptions are fiction. Contact info is placeholder. Please laugh responsibly.",
    },
  ];
  return (
    <section
      id="manifesto"
      className="relative py-24 md:py-32 scroll-mt-20 bg-black/10 border-t border-white/5"
    >
      <div className="mx-auto max-w-[1280px] px-4 md:px-16">
        <div className="mb-16 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-mint">
            // THE HOUSE RULES
          </p>
          <h2 className="mt-4 font-display text-4xl uppercase tracking-wider md:text-6xl text-white">
            A Manifesto for
            <br />
            <span className="text-crimson">Doing Absolutely Nothing</span>.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {points.map((p, i) => (
            <div
              key={p.k}
              className="glass-card glass-card-hover p-10 rounded-sm"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="font-display text-7xl text-crimson">{p.k}</div>
              <h3 className="mt-6 font-display text-2xl uppercase tracking-wider text-white">
                {p.t}
              </h3>
              <p className="mt-4 font-body text-sm leading-relaxed text-white/70">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Warning() {
  return (
    <section id="warning" className="relative py-24 scroll-mt-20">
      <div className="mx-auto max-w-[1280px] px-4 md:px-16">
        <div className="relative border-l-4 border-crimson bg-black/70 p-10 backdrop-blur md:p-16 rounded-r-sm glass-card">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <span className="bg-crimson px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white rounded-sm">
              GOVERNMENT-STYLE WARNING
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              (WE ARE NOT THE GOVERNMENT)
            </span>
          </div>
          <h2 className="font-display text-3xl uppercase tracking-wider md:text-5xl text-white">
            This site is a <span className="text-crimson">parody</span>.
          </h2>
          <p className="mt-6 max-w-3xl font-body text-base leading-relaxed text-white/80 md:text-lg">
            This website is a parody created for entertainment only. No illegal goods or services
            are offered, endorsed, promoted, or insinuated. Every purchase redirects to the official
            FBI website as the joke. If you clicked a "Buy Now" button expecting anything else,
            please reflect quietly.
          </p>
          <p className="mt-6 font-mono text-[11px] uppercase leading-relaxed tracking-widest text-mint">
            NO_REAL_TRANSACTIONS · NO_REAL_PEOPLE · NO_REAL_PRODUCTS · YES_REAL_LAUGHS
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-black/60 backdrop-blur-md">
      <div className="mx-auto max-w-[1280px] px-4 py-16 md:px-16">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-md">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-crimson animate-pulse-crimson" />
              <span className="font-display text-2xl uppercase tracking-widest text-white">
                Definitely<span className="text-crimson font-bold">.Not</span>
              </span>
            </div>
            <p className="mt-6 font-body text-sm text-white/60 leading-relaxed">
              A premium satirical parody website poking fun at darknet tropes. This project is 100%
              comedy. No transactions are real, and every buy button goes to the FBI website.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="#"
                className="text-white/40 hover:text-crimson transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-white/40 hover:text-crimson transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-12 font-mono text-xs uppercase tracking-widest md:grid-cols-3">
            <div>
              <div className="text-crimson mb-4">Fictional Aisles</div>
              <ul className="space-y-3 text-white/60">
                <li className="hover:text-white transition-colors cursor-default">Not Available</li>
                <li className="hover:text-white transition-colors cursor-default">Never Was</li>
                <li className="hover:text-white transition-colors cursor-default">Never Will Be</li>
              </ul>
            </div>
            <div>
              <div className="text-crimson mb-4">Support</div>
              <ul className="space-y-3 text-white/60">
                <li className="hover:text-white transition-colors cursor-default font-bold">
                  Call 000-000-0000
                </li>
                <li className="hover:text-white transition-colors cursor-default">
                  Do Not Actually Call
                </li>
                <li className="hover:text-white transition-colors cursor-default">Seriously</li>
              </ul>
            </div>
            <div>
              <div className="text-crimson mb-4">Legal</div>
              <ul className="space-y-3 text-white/60">
                <li className="hover:text-white transition-colors cursor-default">It's a Joke</li>
                <li className="hover:text-white transition-colors cursor-default">Comedy Only</li>
                <li className="hover:text-white transition-colors cursor-default">
                  © 2026 Satire Inc.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Disclaimer variant="bottom" />
    </footer>
  );
}

function App() {
  const [modal, setModal] = useState<null | (typeof LISTINGS)[number]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [warrantsCount, setWarrantsCount] = useState(0);

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
      // Comedic cart action increment
      setCartCount(1);
      setWarrantsCount((prev) => prev + 1);
    } else {
      document.body.style.overflow = "";
    }
  }, [modal]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const scrollToListings = () => {
    document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="h-3 w-3 rounded-full bg-crimson animate-ping absolute" />
            <div className="h-3 w-3 rounded-full bg-crimson animate-pulse-crimson relative" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground animate-fade-in">
              Loading classified materials...
            </span>
            <div className="flex gap-1 mt-2">
              <div
                className="w-1 h-1 bg-crimson rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-1 h-1 bg-crimson rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-1 h-1 bg-crimson rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dark relative min-h-screen bg-background text-foreground opacity-0 animate-fade-in">
      <MouseGlow />
      <TopMarquee />
      <Disclaimer variant="top" />
      <Nav cartCount={cartCount} warrantsCount={warrantsCount} />
      <main className="relative">
        <Hero onBrowse={scrollToListings} />
        <Listings onBuy={(l) => setModal(l)} />
        <Reviews />
        <Faq />
        <Manifesto />
        <Warning />
      </main>
      <Footer />
      <BuyModal open={!!modal} listing={modal} onClose={() => setModal(null)} />

      {/* Floating Cyberpunk HUD (Cart & Warrant Tracker) */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:block">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="glass-card p-4 rounded-sm border-l-2 border-l-crimson flex flex-col gap-2 w-64 bg-black/60 shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-1">
              <Lock size={10} className="text-crimson" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/50">
                SYS HUD // TARGET MONITOR
              </span>
            </div>
            <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse" />
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between items-center font-mono text-[10px] uppercase">
              <span className="text-white/60">Items in Cart:</span>
              <span className="text-mint font-bold">{cartCount}</span>
            </div>
            <div className="flex justify-between items-center font-mono text-[10px] uppercase">
              <span className="text-white/60">Warrants Issued:</span>
              <span
                className={`font-bold ${warrantsCount > 0 ? "text-crimson animate-pulse" : "text-white/40"}`}
              >
                {warrantsCount}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <UnderworldArchivesAI />
    </div>
  );
}

export default App;
