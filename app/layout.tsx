import '@/app/ui/global.css';
import Logo from '@/app/ui/calculator/logo';
// import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { inter } from '@/app/ui/calculator/fonts';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body  className={`${inter.className} antialiased`} >
      <div className="flex flex-row h-20 shrink-0 justify-between rounded-lg bg-blue-500 p-4  lg:h-20 ">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Logo />
        </Link>
        {/* <Link
            href="/login"
            className="flex items-center gap-5  rounded-lg bg-blue-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
        </Link> */}
      </div>

        {children}</body>
    </html>
  );
}
