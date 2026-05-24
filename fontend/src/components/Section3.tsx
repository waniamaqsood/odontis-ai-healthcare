import { useTranslations } from 'next-intl';

export default function Section4() {
  const t1 = useTranslations('Section3');

  const sections = [
    { title: t1('title1'), subtitle: t1('subtitle1'), bg: 'bg-blue-600', text: 'text-white' },
    { title: t1('title2'), subtitle: t1('subtitle2'), bg: 'bg-white', text: 'text-blue-600' },
    { title: t1('title3'), subtitle: t1('subtitle3'), bg: 'bg-blue-600', text: 'text-white' },
  ];

  return (
    <section className="relative">
      {sections.map(({ title, subtitle, bg, text }, idx) => (
        <div
          key={idx}
          className={`sticky top-0 min-h-screen flex flex-col items-center justify-center ${bg} ${text} px-4 sm:px-6 md:px-10`}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center">
            {title}
          </h2>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl font-semibold text-center">
            {subtitle}
          </p>
        </div>
      ))}
    </section>
  );
}
