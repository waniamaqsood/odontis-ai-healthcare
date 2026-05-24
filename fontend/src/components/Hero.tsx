import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center 
                 bg-cover bg-center px-4 sm:px-6 md:px-8 
                 bg-[url('/hero_bg3.webp')]"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 max-w-5xl w-full text-center">

        <h1
          className="
            text-white 
            text-2xl sm:text-3xl md:text-4xl lg:text-4xl
            font-bold italic uppercase
            leading-tight
            tracking-tight
            drop-shadow-xl
          "
        >
          {t('title1')}
          <br />
          {t('title2')}
        </h1>

        <p className="mt-6 sm:mt-8 text-white text-base sm:text-lg md:text-lg font-medium max-w-2xl mx-auto leading-relaxed ">
          {t('subtitle')}
        </p>

        <Link
          href="/Prediction"
          className="mt-8 inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-3 sm:py-4 shadow-lg transition-all"
        >
          Try Prediction Tool
        </Link>

      </div>
    </section>
  );
}
