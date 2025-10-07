"use client";

/**
 * Project creation page component
 * Allows users to submit new crowdfunding projects
 */
import React, { useState } from 'react';
import { useTranslations } from '../../context/TranslationContext';
import { Upload, Calendar, Check } from 'lucide-react';

// Available categories for project creation
const CATEGORIES = ['Environment', 'Education', 'Technology', 'Healthcare', 'Arts', 'Community'];

export default function CreateProjectPage() {
  const { t } = useTranslations();
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    longDescription: '',
    target: '',
    deadline: '',
    category: '',
    image: null as File | null
  });
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, image: e.target.files![0] }));
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would send the form data to an API
    console.log('Form submitted:', formData);
    
    // Show success message
    setFormSubmitted(true);
    
    // Reset form after submission
    setFormData({
      name: '',
      description: '',
      longDescription: '',
      target: '',
      deadline: '',
      category: '',
      image: null
    });
  };
  
  return (
    <div className="font-sans min-h-screen bg-background text-foreground">
      
      <main className="max-w-3xl mx-auto py-8 px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {t('create.title')}
          </h1>
          <p className="text-muted-foreground">
            {t('create.subtitle')}
          </p>
        </div>
        
        {formSubmitted ? (
          <div className="bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900 rounded-lg p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 text-green-500 dark:text-green-400 mb-4">
              <Check className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {t('create.success.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('create.success.message')}
            </p>
            <button 
              onClick={() => setFormSubmitted(false)}
              className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              {t('create.success.newProject')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('create.form.name')} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            </div>
            
            {/* Short description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('create.form.description')} *
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
              <p className="text-xs text-gray-500 mt-1">
                {t('create.form.shortDescription')}
              </p>
            </div>
            
            {/* Long description */}
            <div>
              <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('create.form.longDescription')} *
              </label>
              <textarea
                id="longDescription"
                name="longDescription"
                required
                value={formData.longDescription}
                onChange={handleChange}
                rows={8}
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
              <p className="text-xs text-gray-500 mt-1">
                {t('create.form.markdown')}
              </p>
            </div>
            
            {/* Funding target */}
            <div>
              <label htmlFor="target" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('create.form.target')} *
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="target"
                  name="target"
                  required
                  step="0.001"
                  min="0.001"
                  value={formData.target}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  BTC
                </div>
              </div>
            </div>
            
            {/* Project deadline */}
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('create.form.deadline')} *
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  required
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              </div>
            </div>
            
            {/* Project category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('create.form.category')} *
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              >
                <option value="" disabled>
                  {t('create.form.selectCategory')}
                </option>
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Project image */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('create.form.image')} *
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="image" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500 mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {formData.image ? formData.image.name : t('create.form.dragDrop')}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {t('create.form.imageRequirements')}
                    </p>
                  </div>
                </label>
              </div>
            </div>
            
            {/* Compliance notice */}
            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {t('create.compliance.notice')}
              </p>
            </div>
            
            {/* Submit button */}
            <div>
              <button
                type="submit"
                className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                {t('create.form.submit')}
              </button>
            </div>
          </form>
        )}
      </main>
      
    </div>
  );
}
