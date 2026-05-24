"use client";
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';

export default function Section() {
  const t = useTranslations('Section2');

  const steps = [
    { text: t("step1"), color: "text-blue-600" },
    { text: t("step2"), color: "text-blue-700" },
    { text: t("step3"), color: "text-blue-900" },
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-[#0b1535] overflow-hidden relative px-4 sm:px-6 md:px-10">

      {/* Animated Steps */}
      <motion.div
        initial="hidden"
        animate="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.25 } },
        }}
        className="flex flex-col items-center space-y-6 sm:space-y-8 md:space-y-10 z-10"
      >
        {steps.map(({ text, color }) => (
          <motion.h1
            key={text}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1.2, ease: "easeOut" },
              },
            }}
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-bold tracking-tight ${color} text-center`}
          >
            {text}
          </motion.h1>
        ))}
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-8 sm:mt-10 md:mt-12 text-base sm:text-lg md:text-lg font-medium text-center text-black max-w-2xl"
      >
        {t('tag')}
      </motion.p>
    </section>
  );
}
