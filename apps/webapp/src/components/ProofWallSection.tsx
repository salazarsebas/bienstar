"use client";

/**
 * ProofWallSection
 * Gallery preview of the evidence organizations submit (photo + GPS)
 * before a withdrawal unlocks. Tiles are illustrative placeholders,
 * not real submissions, the note at the bottom says so explicitly.
 */
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Camera, MapPin, CheckCircle2, Clock } from 'lucide-react';
import { useTranslations } from '../context/TranslationContext';

type Evidence = {
  org: string;
  coordinates: string;
  date: string;
  status: 'verified' | 'pending';
};

// Placeholder entries illustrating the evidence review flow
const EVIDENCE: Evidence[] = [
  { org: 'Basin Reforestation Collective', coordinates: '-3.4653, -62.2159', date: '2026-09-10', status: 'verified' },
  { org: 'Coastal Mangrove Trust', coordinates: '10.0452, 105.7469', date: '2026-09-15', status: 'verified' },
  { org: 'Green Belt Restoration Project', coordinates: '14.4974, -14.4524', date: '2026-09-17', status: 'pending' },
  { org: 'Basin Reforestation Collective', coordinates: '-3.5108, -62.3390', date: '2026-08-28', status: 'verified' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

export default function ProofWallSection() {
  const { t } = useTranslations();

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            {t('home.proofWall.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('home.proofWall.subtitle')}
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {EVIDENCE.map((entry, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="rounded-xl border border-border bg-card overflow-hidden"
            >
              <div className="h-36 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 flex items-center justify-center">
                <Camera className="w-10 h-10 text-muted-foreground/40" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-semibold text-sm truncate">{entry.org}</span>
                  {entry.status === 'verified' ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {t('home.proofWall.verified')}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400 shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                      {t('home.proofWall.pending')}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {entry.coordinates}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{entry.date}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          {t('home.proofWall.note')}
        </p>
      </div>
    </section>
  );
}
