"use client";
import ScrollReveal from "../../../components/ScrollReveal";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations('FAQs');
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-blue-400 to-blue-500">
      
      {/* TOP SECTION */}
      <div className="relative px-12 pt-16 pb-48 text-white">
        <h1 className="text-5xl mt-20 font-bold leading-tight">{t('heading')}</h1>
        <div className="mt-4 space-y-2">
          {t('subheading')}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="bg-white rounded-t-[60px] px-12 py-16 -mt-32">
        <div className="max-w-4xl mx-auto space-y-10">

          <ScrollReveal>
            <h2 className="text-3xl text-blue-400 font-bold">{t('q1')}</h2>
            <p className="mt-3 text-xl">{t('a1')}</p>
          </ScrollReveal>
          <ScrollReveal>
            <h2 className="text-3xl text-blue-400 font-bold">{t('q2')}</h2>
            <p className="mt-3 text-xl">{t('a2')}</p>
          </ScrollReveal>
          <ScrollReveal>
            <h2 className="text-3xl text-blue-400 font-bold">{t('q3')}</h2>
            <p className="mt-3 text-xl">{t('a3')}</p>
          </ScrollReveal>
          <ScrollReveal>
            <h2 className="text-3xl text-blue-400 font-bold">{t('q4')}</h2>
            <p className="mt-3 text-xl">{t('a4')}</p>
          </ScrollReveal>
          <ScrollReveal>
            <h2 className="text-3xl text-blue-400 font-bold">{t('q5')}</h2>
            <p className="mt-3 text-xl">{t('a5')}</p>
          </ScrollReveal>
          <ScrollReveal>
            <h2 className="text-3xl text-blue-400 font-bold">{t('q6')}</h2>
            <p className="mt-3 text-xl">{t('a6')}</p>
          </ScrollReveal>

        </div>
      </div>
    </div>
  );
}
