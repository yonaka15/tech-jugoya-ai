import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2 hover:opacity-80" href="/">
            <span className="font-bold">tech.jugoya.ai</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/blog"
            className="transition-colors hover:text-foreground/80"
          >
            Blog
          </Link>
          <Link
            href="/tags"
            className="transition-colors hover:text-foreground/80"
          >
            Tags
          </Link>
          <Link
            href="/about"
            className="transition-colors hover:text-foreground/80"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}