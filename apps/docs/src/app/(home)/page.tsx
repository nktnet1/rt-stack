import { Button } from '@repo/ui/components/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <h1 className="mb-4 text-2xl font-bold">RT-Stack</h1>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button>
          <Link href="/docs">Docs</Link>
        </Button>
        <Button>
          <Link
            href="https://github.com/nktnet1/rt-stack"
            target="_blank"
            referrerPolicy="no-referrer"
          >
            GitHub
          </Link>
        </Button>
      </div>
    </main>
  );
}
