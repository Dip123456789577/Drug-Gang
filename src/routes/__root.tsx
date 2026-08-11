import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter } from "@tanstack/react-router";
import "../styles.css";

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
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
