'use client';

import { motion, Variants } from 'framer-motion';
import { useTranslations } from '@/context/TranslationContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0, 0, 0.2, 1],
    },
  },
};

export default function PartnersSection() {
  const { t } = useTranslations();

  // Mock partner logos (in production, these would be actual logo images)
  const partners = [
    { name: 'Bitcoin Foundation', logo: '₿' },
    { name: 'Green Earth Initiative', logo: '🌍' },
    { name: 'Tech for Good', logo: '💻' },
    { name: 'Social Impact Fund', logo: '🤝' },
    { name: 'Blockchain Alliance', logo: '⛓️' },
    { name: 'Community First', logo: '👥' },
  ];

  return (
    <section className="py-16 px-4 border-y border-border bg-muted/20">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-2">
            {t('partners.title') || 'Trusted By Leading Organizations'}
          </h3>
          <p className="text-muted-foreground">
            {t('partners.subtitle') ||
              'Working together to create positive social impact'}
          </p>
        </motion.div>

        {/* Partners grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="bg-card border border-border rounded-xl p-6 h-24 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-primary/50">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {partner.logo}
                </div>
                <p className="text-xs text-muted-foreground text-center font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {partner.name}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust indicator */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          {t('partners.trustNote') ||
            'Join 50+ organizations making a difference through transparent, blockchain-powered fundraising'}
        </motion.p>
      </div>
    </section>
  );
}
