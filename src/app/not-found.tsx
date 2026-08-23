import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-background">
      <h1 className="text-6xl font-bold font-headline text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-bold text-foreground">Page Not Found</h2>
      <p className="mt-2 text-muted-foreground">The page you are looking for doesn&apos;t exist or has been moved.</p>
      <Link href="/" className="mt-6 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
        Go Back Home
      </Link>
    </div>
  );
}
