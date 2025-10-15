'use client';

import { motion, Variants } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { useTranslations } from '@/context/TranslationContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export default function TestimonialsSection() {
  const { t } = useTranslations();

  const testimonials = [
    {
      name: 'Maria Rodriguez',
      role: t('testimonials.role1') || 'Project Creator',
      image: '👩‍🌾',
      quote:
        t('testimonials.quote1') ||
        'Bien Star helped us raise funds for our community farm in just 30 days. The transparency of Bitcoin transactions gave our donors confidence.',
      rating: 5,
    },
    {
      name: 'David Chen',
      role: t('testimonials.role2') || 'Regular Donor',
      image: '👨‍💼',
      quote:
        t('testimonials.quote2') ||
        'I love being able to track exactly where my donations go. The impact reports and blockchain verification make me trust this platform completely.',
      rating: 5,
    },
    {
      name: 'Sarah Johnson',
      role: t('testimonials.role3') || 'Environmental Activist',
      image: '👩‍🔬',
      quote:
        t('testimonials.quote3') ||
        'Finally, a crowdfunding platform that combines social impact with financial innovation. The tree planting feature is a beautiful touch!',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
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
            {t('testimonials.title') || 'What People Say'}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('testimonials.subtitle') ||
              'Real stories from our community members who are making a difference'}
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="relative group"
            >
              <div className="bg-card border border-border rounded-2xl p-8 h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                {/* Quote icon */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="w-6 h-6" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-500 text-yellow-500"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-foreground/90 mb-6 flex-grow leading-relaxed">
                  {testimonial.quote}
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-2xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Decorative gradient */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-500 -z-10" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
