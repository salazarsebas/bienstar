'use client';

import { motion, Variants } from 'framer-motion';
import { Shield, Lock, Eye, CheckCircle2 } from 'lucide-react';
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

const badgeVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export default function TrustBadgesSection() {
  const { t } = useTranslations();

  const badges = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('trust.secure.title') || 'Secure Transactions',
      description:
        t('trust.secure.description') ||
        'All donations are processed through secure Bitcoin blockchain technology',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: t('trust.privacy.title') || 'Privacy Protected',
      description:
        t('trust.privacy.description') ||
        'Your personal information is encrypted and never shared without consent',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: t('trust.transparent.title') || '100% Transparent',
      description:
        t('trust.transparent.description') ||
        'Every transaction is verifiable on the blockchain with full transparency',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      icon: <CheckCircle2 className="w-8 h-8" />,
      title: t('trust.verified.title') || 'Verified Projects',
      description:
        t('trust.verified.description') ||
        'All projects undergo thorough verification before approval',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('trust.title') || 'Your Trust Is Our Priority'}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('trust.subtitle') ||
              'We implement industry-leading security and transparency measures to protect your donations'}
          </p>
        </motion.div>

        {/* Badges grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {badges.map((badge, index) => (
            <motion.div key={index} variants={badgeVariants} className="group">
              <div className="bg-card border border-border rounded-2xl p-6 h-full flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {/* Icon */}
                <div
                  className={`${badge.bgColor} rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className={badge.color}>{badge.icon}</div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3">{badge.title}</h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {badge.description}
                </p>

                {/* Decorative bottom border */}
                <div
                  className={`mt-6 h-1 w-16 ${badge.bgColor} rounded-full group-hover:w-full transition-all duration-500`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional certification badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 flex flex-wrap justify-center items-center gap-8"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span>{t('trust.badges.ssl') || 'SSL Encrypted'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span>
              {t('trust.badges.blockchain') || 'Blockchain Verified'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span>{t('trust.badges.compliant') || 'Regulatory Compliant'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span>{t('trust.badges.audited') || 'Security Audited'}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
