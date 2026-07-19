import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-crimson">404</h1>
        <h2 className="mt-4 font-display text-3xl tracking-wider">Evidence Not Found</h2>
        <p className="mt-2 text-sm text-muted-foreground font-mono">
          THIS_URL.EXE has been shredded.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center bg-crimson px-6 py-3 font-mono text-sm uppercase tracking-widest text-white crimson-glow"
        >
          Return to the scene
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-4xl tracking-wider text-foreground">
          Operation Compromised
        </h1>
        <p className="mt-2 text-sm text-muted-foreground font-mono">
          The feds are onto us. Try again.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="bg-crimson px-6 py-3 font-mono text-sm uppercase tracking-widest text-white"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Definitely Not a Drug Marketplace | Parody" },
      {
        name: "description",
        content:
          "A satirical parody site that looks like a crime-thriller marketplace. Every Buy button redirects to the FBI. Comedy only — nothing is for sale.",
      },
      { name: "author", content: "Definitely Not a Marketplace" },
      { property: "og:title", content: "Definitely Not a Drug Marketplace (Parody)" },
      {
        property: "og:description",
        content: "Click Buy. Regret Everything. A parody website — the joke redirects to the FBI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Geist:wght@300;400;500;700&family=JetBrains+Mono:wght@400;500;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
