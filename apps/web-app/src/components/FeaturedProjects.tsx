"use client";

/**
 * FeaturedProjects component for Bien Star homepage
 * Displays a grid of featured crowdfunding projects
 */
import React from 'react';
import Link from 'next/link';
import { useTranslations } from '../context/TranslationContext';
import { ArrowRight, Users, Calendar } from 'lucide-react';

// Mock data for featured projects
const FEATURED_PROJECTS = [
  {
    id: '1',
    title: 'Clean Water Initiative',
    description: 'Providing clean water access to rural communities through sustainable infrastructure.',
    image: '/projects/water.jpg',
    category: 'Environment',
    raised: 1.2,
    target: 3,
    backers: 48,
    daysLeft: 12
  },
  {
    id: '2',
    title: 'Education for All',
    description: 'Supporting education programs for underprivileged children in developing regions.',
    image: '/projects/education.jpg',
    category: 'Education',
    raised: 2.5,
    target: 4,
    backers: 76,
    daysLeft: 23
  },
  {
    id: '3',
    title: 'Renewable Energy Hub',
    description: 'Building solar power stations for communities without reliable electricity.',
    image: '/projects/energy.jpg',
    category: 'Technology',
    raised: 5.8,
    target: 10,
    backers: 134,
    daysLeft: 45
  }
];

export default function FeaturedProjects() {
  const { t } = useTranslations();
  
  return (
    <section className="bg-white dark:bg-background py-16 px-6">
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
          {FEATURED_PROJECTS.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Helper component for project cards
function ProjectCard({ project }: { project: typeof FEATURED_PROJECTS[0] }) {
  const { t } = useTranslations();
  const progressPercentage = (project.raised / project.target) * 100;
  
  return (
    <div className="bg-white dark:bg-card rounded-lg border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
        {/* This would be replaced with actual project images */}
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
          <span className="text-gray-500 dark:text-gray-400">{project.title} Image</span>
        </div>
        
        <div className="absolute top-4 left-4">
          <span className="bg-black dark:bg-white bg-opacity-75 dark:bg-opacity-20 text-white dark:text-white text-xs px-2 py-1 rounded">
            {project.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {project.description}
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
            <span className="font-semibold text-black dark:text-white">{project.raised} BTC</span>
            <span className="text-gray-500 dark:text-gray-400"> {t('project.raised')}</span>
          </div>
          <div className="text-gray-500 dark:text-gray-400">
            <span>{Math.round(progressPercentage)}%</span> {t('project.target')}
          </div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-4">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{project.backers} {t('project.backers')}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{project.daysLeft} {t('project.daysLeft')}</span>
          </div>
        </div>
        
        <Link 
          href={`/projects/${project.id}`}
          className="mt-4 block w-full bg-black dark:bg-white text-white dark:text-black text-center py-2 rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          {t('project.fund')}
        </Link>
      </div>
    </div>
  );
}
