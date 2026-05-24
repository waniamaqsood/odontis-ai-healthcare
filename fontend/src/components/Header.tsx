'use client';
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('Navbar');
  return (
    <header className="fixed top-8 left-0 w-full z-50 flex justify-center items-center gap-4">
      {/* Left Pill Button 
      <Link
        href="/Prediction"
        className="bg-white px-7 py-2.5 rounded-full shadow-lg text-[13px] font-bold text-black tracking-tight hover:bg-blue-500 hover:text-white transition-all"
      >
        {t('prediction')}
      </Link>*/}

      {/* Main Navigation Capsule */}
      <nav className="flex items-center bg-white px-5 py-1 rounded-full shadow-lg gap-8 border border-white/20">
        <div className="flex items-center gap-2"><div className="w-5 h-5 rounded-full bg-[url('/blueIcon.webp')] bg-cover bg-center" />
          <span className="font-black text-[16px] tracking-tighter text-blue-600 mr-20">{t('brandName')}</span>
        </div>

        <div className="flex gap-8 text-[13px] font-bold tracking-[0.em]">
          <Link href="/" className="hover:text-blue-600 transition-colors">{t('home')}</Link>
          <Link href="/About" className="hover:text-blue-600 transition-colors">{t('about')}</Link>
          <Link href="/Prediction" className="hover:text-blue-600 transition-colors">{t('prediction')}</Link>
        </div>
      <LanguageSwitcher />
      <div className="flex items-center gap-2"><div className="w-5 h-5 rounded-full bg-[url('/blueIcon.webp')] bg-cover bg-center" />
        </div>

      </nav>

      {/* Right Pill Button 
      <Link
        href="/FAQs"
        className="bg-white px-7 py-2.5 rounded-full shadow-lg text-[13px] font-bold text-black tracking-tight hover:bg-blue-500 hover:text-white transition-all"
      >{t('AI')}
      </Link>*/}

    </header>
  );
}