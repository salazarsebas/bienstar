"use client";

/**
 * VerifiedOrganizations component for the Bien Star homepage
 * Displays the reforestation organizations donors can support, either
 * through the general pool or a direct donation, with their evidence
 * review status.
 *
 * Org data below is illustrative placeholder content for the prototype,
 * not real partner organizations. Replace with the real vetted list
 * before launch.
 */
import React from 'react';
import Link from 'next/link';
import { useTranslations } from '../context/TranslationContext';
import { ArrowRight, TreePine, MapPin, CheckCircle2, Clock } from 'lucide-react';

type Organization = {
  id: string;
  name: string;
  mission: string;
  region: string;
  treesPlanted: number;
  usdcReceived: number;
  usdcTarget: number;
  verification: { status: 'verified' | 'pending'; date?: string };
};

// Placeholder data, replace with real vetted organizations before launch
const ORGANIZATIONS: Organization[] = [
  {
    id: '1',
    name: 'Basin Reforestation Collective',
    mission: 'Restoring degraded rainforest edges along the Amazon basin with native species.',
    region: 'Peru',
    treesPlanted: 12400,
    usdcReceived: 18200,
    usdcTarget: 30000,
    verification: { status: 'verified', date: '2026-09-10' },
  },
  {
    id: '2',
    name: 'Green Belt Restoration Project',
    mission: 'Rebuilding a tree belt to slow desertification and protect farmland.',
    region: 'Senegal',
    treesPlanted: 8200,
    usdcReceived: 9600,
    usdcTarget: 25000,
    verification: { status: 'pending' },
  },
  {
    id: '3',
    name: 'Coastal Mangrove Trust',
    mission: 'Replanting mangroves that buffer coastal communities from flooding.',
    region: 'Vietnam',
    treesPlanted: 5600,
    usdcReceived: 14300,
    usdcTarget: 20000,
    verification: { status: 'verified', date: '2026-09-15' },
  },
];

export default function VerifiedOrganizations() {
  const { t } = useTranslations();

  return (
    <section id="organizations" className="bg-white dark:bg-background py-16 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-black dark:text-white">
            {t('home.featured.title')}
          </h2>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-black dark:text-white hover:underline dark:hover:text-gray-300"
          >
            {t('home.featured.viewAll')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ORGANIZATIONS.map(org => (
            <OrganizationCard key={org.id} org={org} />
          ))}
        </div>
      </div>
    </section>
  );
}

function OrganizationCard({ org }: { org: Organization }) {
  const { t } = useTranslations();
  const progressPercentage = (org.usdcReceived / org.usdcTarget) * 100;
  const isVerified = org.verification.status === 'verified';

  return (
    <div className="bg-white dark:bg-card rounded-lg border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
          <span className="text-gray-500 dark:text-gray-400">{org.name}</span>
        </div>

        <div className="absolute top-4 left-4 flex items-center gap-1 bg-black/75 dark:bg-white/20 text-white text-xs px-2 py-1 rounded">
          <MapPin className="w-3 h-3" />
          {org.region}
        </div>

        <div
          className={`absolute top-4 right-4 flex items-center gap-1 text-xs px-2 py-1 rounded font-medium ${
            isVerified
              ? 'bg-green-500/90 text-white'
              : 'bg-amber-500/90 text-white'
          }`}
        >
          {isVerified ? (
            <>
              <CheckCircle2 className="w-3 h-3" />
              {t('home.featured.verifiedOn', { date: org.verification.date ?? '' })}
            </>
          ) : (
            <>
              <Clock className="w-3 h-3" />
              {t('home.featured.pendingReview')}
            </>
          )}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
          {org.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {org.mission}
        </p>

        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
          <div
            className="h-full bg-green-500 dark:bg-green-400 rounded-full"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-sm mb-4">
          <div>
            <span className="font-semibold text-black dark:text-white">
              {org.usdcReceived.toLocaleString()} USDC
            </span>
            <span className="text-gray-500 dark:text-gray-400"> {t('project.raised')}</span>
          </div>
          <div className="text-gray-500 dark:text-gray-400">
            <span>{Math.round(progressPercentage)}%</span> {t('project.target')}
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-4">
          <TreePine className="w-4 h-4" />
          <span>{t('home.featured.treesPlanted', { count: org.treesPlanted.toLocaleString() })}</span>
        </div>

        <Link
          href={`/projects/${org.id}`}
          className="mt-4 block w-full bg-black dark:bg-white text-white dark:text-black text-center py-2 rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          {t('home.featured.donateCta')}
        </Link>
      </div>
    </div>
  );
}
