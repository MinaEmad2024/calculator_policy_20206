import '@/app/ui/global.css';
import { inter } from '@/app/ui/calculator/fonts';
import Logo from '@/app/ui/calculator/logo';
import Link from 'next/link';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  async function handleSignOut() {
    'use server';
    await signOut({ redirectTo: '/' });
  }
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Header bar appears ONLY inside /dashboard paths */}
      <div className="flex flex-row h-20 shrink-0 items-center justify-between rounded-lg bg-blue-500 p-4">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Logo />
        </Link>
        <form action={handleSignOut}>
          <button type="submit" className="flex h-[48px] items-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium text-gray-700 hover:bg-sky-100">
            <PowerIcon className="w-5 h-5" />
            <span className="hidden md:inline">Sign Out</span>
          </button>
        </form>
      </div>

      <main className="flex min-h-screen flex-col p-6">
          <div className='flex  grow justify-center'>
              <div className="mt-4 flex  flex-col gap-4 w-full border-[3px] rounded-xl border-blue-500 lg:w-3/5 sm:flex-col">
                  <div className="flex flex-col items-center gap-1 justify-center p-6 w-full md:px-28 md:py-1">
                      {children}
                  </div>
              </div>
          </div>
      </main>
    </div>
);
}