'use client';

import { useTransition } from 'react';
import { useRouter, usePathname } from '../i18n/routing'; 
import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  function onToggleChange() {
    const nextLocale = currentLocale === 'en' ? 'ur' : 'en';
  
    startTransition(() => {
      // router.replace keeps the user on the same page but swaps the locale
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <button
      onClick={onToggleChange}
      disabled={isPending}
      className={`px-1 py-0.5 text-2px  ${isPending ? 'opacity-50' : 'opacity-100'}`}
    >
      {currentLocale === 'en' ? ' اردو ' : 'English'}
    </button>
  );
}