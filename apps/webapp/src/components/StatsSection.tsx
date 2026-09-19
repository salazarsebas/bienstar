'use client';

import { motion, Variants } from 'framer-motion';
import { Users, TreePine, Droplets, Bitcoin } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import { useTranslations } from '@/context/TranslationContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export default function StatsSection() {
  const { t } = useTranslations();

  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: 5000,
      suffix: '+',
      label: t('stats.activeSupporters') || 'Active Supporters',
      color: 'text-blue-500',
    },
    {
      icon: <Bitcoin className="w-8 h-8" />,
      value: 2.5,
      decimals: 1,
      suffix: ' BTC',
      label: t('stats.fundsRaised') || 'Total Funds Raised',
      color: 'text-orange-500',
    },
    {
      icon: <TreePine className="w-8 h-8" />,
      value: 12000,
      suffix: '+',
      label: t('stats.treesPlanted') || 'Trees Planted',
      color: 'text-emerald-600',
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      value: 850000,
      suffix: 'L',
      label: t('stats.waterReturned') || 'Liters of Water Returned',
      color: 'text-cyan-500',
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              <div className="bg-card border border-border rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                {/* Icon with gradient background */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className={stat.color}>{stat.icon}</div>
                </div>

                {/* Animated counter */}
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals || 0}
                    duration={2500}
                  />
                </div>

                {/* Label */}
                <p className="text-muted-foreground font-medium">
                  {stat.label}
                </p>

                {/* Decorative gradient on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/3 group-hover:to-primary/5 transition-all duration-500 -z-10" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
