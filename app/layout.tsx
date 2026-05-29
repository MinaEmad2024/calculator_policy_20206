// app/layout.tsx
import '@/app/ui/global.css';
import { inter } from '@/app/ui/calculator/fonts';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children} {/* This renders pages fully cleanly */}
      </body>
    </html>
  );
}



// import '@/app/ui/global.css';
// import Logo from '@/app/ui/calculator/logo';
// import Link from 'next/link';
// import { inter } from '@/app/ui/calculator/fonts';
// import { PowerIcon } from '@heroicons/react/24/outline';
// import { signOut } from '@/app/auth';

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
  
//   // ⚡ Define the server action handler cleanly inside the Server Component body
//   async function handleSignOut() {
//     'use server';
//     await signOut({ redirectTo: '/' });
//   }

//   return (
//     <html lang="en">
//       <body className={`${inter.className} antialiased`}>
//         {/* Navigation Header bar wrapper */}
//         <div className="flex flex-row h-20 shrink-0 items-center justify-between rounded-lg bg-blue-500 p-4">
//           <Link href="/" className="hover:opacity-80 transition-opacity">
//             <Logo />
//           </Link>

//           {/* Right-aligned layout panel controls */}
//           <div className="flex items-center space-x-2">
//             <form action={handleSignOut}>
//               <button 
//                 type="submit"
//                 className="flex h-[48px] items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium text-gray-700 hover:bg-sky-100 hover:text-blue-600 transition-colors md:px-4"
//               >
//                 <PowerIcon className="w-5 h-5" />
//                 <span className="hidden md:inline">Sign Out</span>
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Dynamic page content wrapper injection site */}
//         <main>{children}</main>
//       </body>
//     </html>
//   );
// }
