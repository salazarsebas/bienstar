"use client";

/**
 * Project detail page component
 * Displays comprehensive information about a specific crowdfunding project
 */
import React from 'react';
// import { useParams } from 'next/navigation';
import { useTranslations } from '../../../context/TranslationContext';
import { 
  Users, 
  Calendar, 
  Share2, 
  Shield, 
  Bitcoin,
  Clock,
  CheckCircle2
} from 'lucide-react';

// Mock project data - in a real app, this would come from an API or database
const PROJECT_DATA = {
  id: '1',
  title: 'Clean Water Initiative',
  description: 'Providing clean water access to rural communities through sustainable infrastructure. This project aims to build wells and water purification systems in areas with limited access to clean drinking water. By implementing these solutions, we can improve health outcomes and quality of life for thousands of people.',
  longDescription: `
    <p>Access to clean water is a fundamental human right, yet millions of people around the world still lack this basic necessity. Our Clean Water Initiative aims to address this critical issue by implementing sustainable water solutions in communities that need them most.</p>
    
    <h3>The Problem</h3>
    <p>In many rural areas, people must walk several kilometers each day to collect water from sources that are often contaminated. This leads to waterborne diseases, time away from education and work, and perpetuates cycles of poverty.</p>
    
    <h3>Our Solution</h3>
    <p>We're building a network of wells and water purification systems that will provide clean, accessible water to entire communities. Each installation is designed to be:</p>
    <ul>
      <li>Sustainable and low-maintenance</li>
      <li>Operated and maintained by local community members</li>
      <li>Built using locally available materials where possible</li>
      <li>Environmentally friendly and energy-efficient</li>
    </ul>
    
    <h3>Impact</h3>
    <p>Each water system will serve approximately 500-1,000 people, dramatically reducing instances of waterborne illness and freeing up time for education and economic activities. We'll be tracking health metrics, school attendance, and economic indicators to measure our impact.</p>
    
    <h3>Transparency</h3>
    <p>All funds will be tracked on the blockchain, providing complete transparency in how your donations are used. Regular updates will include photos, videos, and testimonials from the communities benefiting from your support.</p>
  `,
  image: '/projects/water.jpg',
  category: 'Environment',
  raised: 1.2,
  target: 3,
  backers: 48,
  daysLeft: 12,
  creator: {
    name: 'Water Access Foundation',
    verified: true
  },
  updates: [
    {
      date: '2025-08-15',
      title: 'First well location selected',
      content: 'We\'ve identified the first community for our pilot well installation.'
    },
    {
      date: '2025-08-01',
      title: 'Project launch',
      content: 'We\'re excited to launch this initiative to bring clean water to communities in need.'
    }
  ],
  complianceStatus: 'verified' // 'pending', 'verified', 'rejected'
};

export default function ProjectDetail() {
  const { t } = useTranslations();
  // Uncomment when needed
  // const params = useParams();
  // const projectId = params.id as string;
  
  // In a real app, we would fetch the project data based on the ID
  // For now, we're using mock data regardless of the project ID
  const project = PROJECT_DATA;
  
  const progressPercentage = (project.raised / project.target) * 100;
  
  return (
    <div className="font-sans min-h-screen bg-background text-foreground">
      
      <main className="max-w-7xl mx-auto py-8 px-6">
        {/* Project header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="relative aspect-video bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden mb-4">
              {/* This would be replaced with an actual project image */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800">
                <span className="text-gray-500 dark:text-gray-400">{project.title} Image</span>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">
              {project.title}
            </h1>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {project.description}
            </p>
            
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-black dark:bg-white text-white dark:text-black text-xs px-2 py-1 rounded">
                {project.category}
              </span>
              
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <Users className="w-4 h-4" />
                <span>{project.backers} {t('project.backers')}</span>
              </div>
              
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{project.daysLeft} {t('project.daysLeft')}</span>
              </div>
              
              <button className="ml-auto flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white">
                <Share2 className="w-4 h-4" />
                <span>{t('project.share')}</span>
              </button>
            </div>
          </div>
          
          {/* Funding sidebar */}
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-100 dark:border-gray-800">
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-semibold text-black dark:text-white">{project.raised} BTC</span>
                <span className="text-gray-500 dark:text-gray-400">{t('project.target')}: {project.target} BTC</span>
              </div>
              
              {/* Progress bar */}
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div 
                  className="h-full bg-green-500 rounded-full" 
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>{Math.round(progressPercentage)}% {t('project.raised')}</span>
                <span>{project.daysLeft} {t('project.daysLeft')}</span>
              </div>
            </div>
            
            {/* Compliance status */}
            <div className="flex items-center gap-2 mb-6 p-3 bg-green-50 dark:bg-green-950/30 rounded border border-green-100 dark:border-green-900">
              <Shield className="w-5 h-5 text-green-500 dark:text-green-400" />
              <div>
                <div className="text-sm font-medium text-black dark:text-white">{t('project.compliance')}</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  {project.complianceStatus === 'verified' ? 
                    'This project has passed compliance checks' : 
                    'Compliance verification in progress'}
                </div>
              </div>
            </div>
            
            {/* Donation form */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                {t('project.donate.title')}
              </h3>
              
              <div className="mb-4">
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                  {t('project.donate.amount')}
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    placeholder="0.01"
                    step="0.001"
                    min="0.001"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Bitcoin className="w-5 h-5 text-yellow-500" />
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                {t('project.donate.submit')}
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
            
            {/* Creator info */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300">
                  {project.creator.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium text-black dark:text-white flex items-center gap-1">
                    {project.creator.name}
                    {project.creator.verified && (
                      <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Project Creator</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Project content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* About section */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {t('project.about')}
              </h2>
              <div 
                className="prose prose-black dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: project.longDescription }}
              />
            </section>
            
            {/* Updates section */}
            <section>
              <h2 className="text-2xl font-bold mb-4">
                {t('project.updates')}
              </h2>
              
              <div className="space-y-4">
                {project.updates.map((update, index) => (
                  <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">{update.date}</span>
                    </div>
                    <h3 className="text-lg font-medium mb-1">
                      {update.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {update.content}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      
    </div>
  );
}
