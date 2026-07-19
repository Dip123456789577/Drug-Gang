import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Definitely Not a Drug Marketplace | Parody" },
      {
        name: "description",
        content:
          "A satirical parody homepage that looks like a fictional crime marketplace. Every Buy Now button redirects to the FBI. Comedy only.",
      },
    ],
  }),
  component: Index,
});

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
  },
];

const STATUS_MESSAGES = [
  "Encrypting your terrible decision…",
  "Notifying three federal agencies…",
  "Alerting your mother…",
  "Contacting nearest field office…",
  "Uploading confession to the cloud…",
  "Dispatching unmarked van to your location…",
];

function Disclaimer({ variant = "top" }: { variant?: "top" | "bottom" }) {
  return (
    <div
      className={`relative border-crimson ${variant === "top" ? "border-b-2" : "border-t-2"} bg-black/60 backdrop-blur-md`}
    >
      <div className="mx-auto max-w-[1280px] px-4 py-3 md:px-16">
        <p className="font-mono text-[11px] uppercase leading-relaxed tracking-widest text-white md:text-xs">
          <span className="text-crimson">⚠ PARODY NOTICE //</span> This website is a parody created
          for entertainment purposes only. No illegal products or services are offered. Every
          purchase redirects to the FBI website as the joke.
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
  const dots = Array.from({ length: 30 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => {
        const size = 1 + Math.random() * 2.5;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 6;
        const dur = 6 + Math.random() * 8;
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
              boxShadow: `0 0 ${size * 4}px ${crimson ? "#e11d48" : "#3cddc7"}`,
              animation: `particle-float ${dur}s ease-in-out ${delay}s infinite`,
              opacity: 0.5,
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
      ref.current.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-0 h-[600px] w-[600px] rounded-full opacity-40 blur-3xl transition-transform duration-200 ease-out"
      style={{
        background: "radial-gradient(circle, rgba(225,29,72,0.45) 0%, rgba(225,29,72,0) 60%)",
      }}
    />
  );
}

function BuyModal({
  open,
  listing,
  onClose,
}: {
  open: boolean;
  listing: (typeof LISTINGS)[number] | null;
  onClose: () => void;
}) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!open) return;
    setMsgIndex(0);
    setProgress(0);
    const msgTimer = setInterval(() => {
      setMsgIndex((i) => (i + 1) % STATUS_MESSAGES.length);
    }, 700);
    const progTimer = setInterval(() => {
      setProgress((p) => Math.min(100, p + 100 / 45));
    }, 100);
    const redirect = setTimeout(() => {
      window.open("https://www.fbi.gov", "_blank", "noopener,noreferrer");
    }, 4500);
    return () => {
      clearInterval(msgTimer);
      clearInterval(progTimer);
      clearTimeout(redirect);
    };
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div className="glass-card animate-fade-up relative w-full max-w-lg p-8 md:p-10">
        <div className="mb-6 flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-crimson" />
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-crimson">
            SECURE CHANNEL // TRANSMITTING
          </span>
        </div>
        <h3 className="font-display text-3xl uppercase tracking-wider md:text-4xl">
          Processing Your Totally Illegal Order…
        </h3>
        {listing && (
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            ORDER: {listing.codename} — {listing.price}
          </p>
        )}
        <div className="mt-8">
          <div className="h-1 w-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-crimson transition-all duration-100"
              style={{
                width: `${progress}%`,
                boxShadow: "0 0 12px #e11d48",
              }}
            />
          </div>
          <p className="mt-4 min-h-[24px] font-mono text-sm text-mint">
            &gt; {STATUS_MESSAGES[msgIndex]}
          </p>
        </div>
        <p className="mt-6 border-l-2 border-crimson bg-black/40 p-3 font-mono text-[11px] uppercase leading-relaxed tracking-widest text-white/80">
          You will be redirected to <span className="text-crimson">fbi.gov</span> in a few seconds.
          That's the joke.
        </p>
        <button
          onClick={onClose}
          className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          Actually, I'd like to remain free →
        </button>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <nav className="sticky top-0 z-40 border-b border-white/5 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 md:px-16">
        <a href="#top" className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-crimson animate-pulse-crimson" />
          <span className="font-display text-xl uppercase tracking-[0.15em]">
            Definitely<span className="text-crimson">.Not</span>
          </span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {["Listings", "Manifesto", "Warning"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l}
            </a>
          ))}
        </div>
        <a
          href="#listings"
          className="bg-crimson px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-white crimson-glow"
        >
          Enter
        </a>
      </div>
    </nav>
  );
}

function Hero({ onBrowse }: { onBrowse: () => void }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt=""
          className="h-full w-full object-cover opacity-60"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </div>
      <Particles />
      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-[1280px] flex-col items-center justify-center px-4 py-24 text-center md:px-16">
        <span className="mb-6 inline-flex items-center gap-2 border border-crimson/40 bg-black/40 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.35em] text-crimson backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse" />
          Classified // Fiction // File #041-DNM
        </span>
        <h1 className="font-display text-5xl uppercase leading-none tracking-wider md:text-7xl lg:text-[112px] lg:leading-[100px]">
          Definitely Not
          <br />
          <span className="text-crimson">The Internet's Worst</span>
          <br />
          Marketplace.
        </h1>
        <p className="mt-8 max-w-2xl font-body text-lg text-muted-foreground md:text-xl">
          <span className="font-mono text-mint">&gt;</span> Click Buy. Regret Everything.
        </p>
        <p className="mt-3 max-w-xl font-mono text-[11px] uppercase tracking-widest text-white/50">
          An entirely fictional catalogue. Every transaction escorts you to the FBI. You have been
          warned, jokingly.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 md:flex-row">
          <button
            onClick={onBrowse}
            className="group relative bg-crimson px-10 py-4 font-mono text-sm uppercase tracking-[0.25em] text-white crimson-glow"
          >
            Browse Listings →
          </button>
          <a
            href="#manifesto"
            className="border border-white/20 bg-black/30 px-8 py-4 font-mono text-sm uppercase tracking-[0.25em] text-white/80 backdrop-blur transition-colors hover:border-mint hover:text-mint"
          >
            Read the Manifesto
          </a>
        </div>

        <div className="mt-16 grid w-full max-w-2xl grid-cols-3 gap-4 border-t border-white/5 pt-8">
          {[
            ["0", "Actual Sales"],
            ["100%", "Redirect Rate"],
            ["∞", "FBI Alerts"],
          ].map(([n, l]) => (
            <div key={l} className="text-center">
              <div className="font-display text-3xl text-mint md:text-4xl">{n}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
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
    <article
      className="glass-card glass-card-hover group relative flex flex-col p-6 md:p-8"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-center justify-between">
        <span className="border border-white/10 bg-black/40 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-mint">
          {l.tag}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          #{String(index + 1).padStart(3, "0")}
        </span>
      </div>

      <h3 className="mt-6 font-display text-3xl uppercase leading-tight tracking-wider md:text-4xl">
        {l.codename}
      </h3>
      <p className="mt-1 font-mono text-xs uppercase tracking-widest text-crimson">{l.tagline}</p>

      <p className="mt-5 font-body text-sm leading-relaxed text-white/70 md:text-base">
        {l.description}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="border-l border-white/10 pl-3">
          <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            Weight
          </div>
          <div className="font-mono text-xs text-white">{l.weight}</div>
        </div>
        <div className="border-l border-white/10 pl-3">
          <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            Lethality
          </div>
          <div className="font-mono text-xs text-mint">{l.lethality}</div>
        </div>
      </div>

      <div className="mt-4 border-t border-white/5 pt-4 font-mono text-[10px] uppercase leading-relaxed tracking-widest text-white/50">
        <div>PHONE // 000-000-0000</div>
        <div>MAIL // definitely-not-real@example.com</div>
        <div>LOCATION // A FICTIONAL WAREHOUSE</div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-6">
        <div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            Asking price
          </div>
          <div className="font-display text-3xl text-white">{l.price}</div>
        </div>
        <button
          onClick={onBuy}
          className="relative bg-crimson px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white crimson-glow"
        >
          Buy Now
        </button>
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent"
      />
    </article>
  );
}

function Listings({ onBuy }: { onBuy: (l: (typeof LISTINGS)[number]) => void }) {
  return (
    <section id="listings" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-4 md:px-16">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-crimson">
              // ACTIVE LISTINGS — 100% FICTIONAL
            </p>
            <h2 className="mt-3 font-display text-4xl uppercase leading-none tracking-wider md:text-6xl">
              Meet the <span className="text-crimson">Cast</span>.
              <br />
              None of them <span className="text-mint">exist</span>.
            </h2>
          </div>
          <p className="max-w-md font-body text-sm text-muted-foreground md:text-base">
            A satirical roster of parody characters inspired by pop-culture and historical crime
            figures. All copy is fictional and all contact info is a placeholder. Every "Buy Now"
            redirects to the FBI.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {LISTINGS.map((l, i) => (
            <ListingCard key={l.codename} l={l} index={i} onBuy={() => onBuy(l)} />
          ))}
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
    <section id="manifesto" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-4 md:px-16">
        <div className="mb-14 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-mint">
            // THE HOUSE RULES
          </p>
          <h2 className="mt-3 font-display text-4xl uppercase tracking-wider md:text-6xl">
            A Manifesto for
            <br />
            <span className="text-crimson">Doing Absolutely Nothing</span>.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {points.map((p) => (
            <div key={p.k} className="glass-card p-8">
              <div className="font-display text-6xl text-crimson">{p.k}</div>
              <h3 className="mt-4 font-display text-2xl uppercase tracking-wider">{p.t}</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-white/70">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Warning() {
  return (
    <section id="warning" className="relative py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-16">
        <div className="relative border-l-4 border-crimson bg-black/60 p-8 backdrop-blur md:p-14">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="bg-crimson px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-white">
              GOVERNMENT-STYLE WARNING
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              (WE ARE NOT THE GOVERNMENT)
            </span>
          </div>
          <h2 className="font-display text-3xl uppercase tracking-wider md:text-5xl">
            This site is a <span className="text-crimson">parody</span>.
          </h2>
          <p className="mt-4 max-w-3xl font-body text-base leading-relaxed text-white/80 md:text-lg">
            This website is a parody created for entertainment purposes only. No illegal products or
            services are offered, endorsed, promoted, or insinuated. Every purchase redirects to the
            FBI website as the joke. If you clicked a "Buy Now" button expecting anything else,
            please reflect quietly.
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase leading-relaxed tracking-widest text-mint">
            NO_REAL_TRANSACTIONS · NO_REAL_PEOPLE · NO_REAL_PRODUCTS · YES_REAL_LAUGHS
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-black/40 backdrop-blur-md">
      <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-16">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-md">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-crimson" />
              <span className="font-display text-2xl uppercase tracking-widest">
                Definitely<span className="text-crimson">.Not</span>
              </span>
            </div>
            <p className="mt-4 font-body text-sm text-white/60">
              A comedy website. That's it. That's the site.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 font-mono text-xs uppercase tracking-widest md:grid-cols-3">
            <div>
              <div className="text-crimson">Fictional Aisles</div>
              <ul className="mt-3 space-y-2 text-white/60">
                <li>Not Available</li>
                <li>Never Was</li>
                <li>Never Will Be</li>
              </ul>
            </div>
            <div>
              <div className="text-crimson">Support</div>
              <ul className="mt-3 space-y-2 text-white/60">
                <li>Call 000-000-0000</li>
                <li>Do Not Actually Call</li>
                <li>Seriously</li>
              </ul>
            </div>
            <div>
              <div className="text-crimson">Legal</div>
              <ul className="mt-3 space-y-2 text-white/60">
                <li>It's a Joke</li>
                <li>Comedy Only</li>
                <li>© 20XX Nobody</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Disclaimer variant="bottom" />
    </footer>
  );
}

function Index() {
  const [modal, setModal] = useState<null | (typeof LISTINGS)[number]>(null);

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [modal]);

  const scrollToListings = () => {
    document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="dark relative min-h-screen bg-background text-foreground">
      <MouseGlow />
      <TopMarquee />
      <Disclaimer variant="top" />
      <Nav />
      <main className="relative">
        <Hero onBrowse={scrollToListings} />
        <Listings onBuy={(l) => setModal(l)} />
        <Manifesto />
        <Warning />
      </main>
      <Footer />
      <BuyModal open={!!modal} listing={modal} onClose={() => setModal(null)} />
    </div>
  );
}
