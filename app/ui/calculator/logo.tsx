import { lusitana } from '@/app/ui/calculator/fonts';

export default function Logo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <p className="text-[38px] lg:text-[44]">Policy Calculator 2026</p>
    </div>
  );
}
