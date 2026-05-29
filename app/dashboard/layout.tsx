import '@/app/ui/global.css';
import { inter } from '@/app/ui/calculator/fonts';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body  className={`${inter.className} antialiased`} >
            <main className="flex min-h-screen flex-col p-6">
                <div className='flex  grow justify-center'>
                    <div className="mt-4 flex  flex-col gap-4 w-full border-[3px] rounded-xl border-blue-500 lg:w-3/5 sm:flex-col">
                        <div className="flex flex-col items-center gap-1 justify-center p-6 w-full md:px-28 md:py-1">
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </body>
    </html>
  );
}