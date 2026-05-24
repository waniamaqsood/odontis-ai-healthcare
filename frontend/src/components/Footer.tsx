import Link from "next/link";
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Navbar');
  const t1 = useTranslations('footer');
  return (
    <footer className="bg-gradient-to-b from-blue-600 to-blue-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-semibold text-white">
              {t('brandName')}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white">
              {t1('tagText')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-medium mb-4">{t1('h1')}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link href="/About" className="hover:text-white transition">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href="/Prediction" className="hover:text-white transition">
                  {t('prediction')}
                </Link>
              </li>
              <li>
                <Link href="/FAQs" className="hover:text-white transition">
                  {t('FAQs')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-white font-medium mb-4">{t1('h2')}</h3>
            <ul className="space-y-3 text-sm text-white">
              <li>{t1('feature1')}</li>
              <li>{t1('feature2')}</li>
              <li>{t1('feature3')}</li>
              <li>{t1('feature4')}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-medium mb-4">{t('contact')}</h3>
            <ul className="space-y-3 text-sm text-white">
              <li>{t1('p1')}</li>
              <li>{t1('p2')}</li>
              <li>{t1('p3')}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-white">
          © {new Date().getFullYear()} Odontis. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
