'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from '@/context/TranslationContext';

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

function FAQItem({ question, answer, index }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border border-border rounded-xl overflow-hidden bg-card"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-muted/50 transition-colors duration-200"
      >
        <span className="font-semibold text-lg pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-5 text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const { t } = useTranslations();

  const faqs = [
    {
      question: t('faq.q1.question') || 'How does Bitcoin fundraising work?',
      answer:
        t('faq.q1.answer') ||
        'When you donate using Bitcoin, your contribution is recorded on the blockchain, providing complete transparency. Project creators receive funds in Bitcoin, which they can convert to their local currency or use directly.',
    },
    {
      question: t('faq.q2.question') || 'Is my donation tax-deductible?',
      answer:
        t('faq.q2.answer') ||
        'Tax deductibility depends on your local regulations and the project\'s charitable status. We recommend consulting with a tax professional in your jurisdiction. We provide detailed transaction records for your tax filing needs.',
    },
    {
      question:
        t('faq.q3.question') || 'How do I track my donation\'s impact?',
      answer:
        t('faq.q3.answer') ||
        'Every project provides regular updates on their progress. You can view these updates on the project page. Additionally, all transactions are recorded on the Bitcoin blockchain, allowing you to verify exactly where your funds went.',
    },
    {
      question: t('faq.q4.question') || 'What happens if a project doesn\'t reach its goal?',
      answer:
        t('faq.q4.answer') ||
        'Projects can operate on either an "all-or-nothing" or "keep-it-all" funding model. This is clearly stated on each project page. For all-or-nothing projects, if the goal isn\'t met, all donations are automatically returned to donors.',
    },
    {
      question:
        t('faq.q5.question') || 'How are projects verified for authenticity?',
      answer:
        t('faq.q5.answer') ||
        'All projects undergo a thorough verification process before being published. We verify the identity of project creators, review project documentation, and assess the feasibility of their plans. Verified projects display a badge on their page.',
    },
    {
      question: t('faq.q6.question') || 'What fees does Bien Star charge?',
      answer:
        t('faq.q6.answer') ||
        'We charge a small platform fee of 5% on successfully funded projects to cover operational costs and platform maintenance. This fee helps us continue providing a secure, transparent fundraising platform. Standard Bitcoin transaction fees also apply.',
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('faq.title') || 'Frequently Asked Questions'}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('faq.subtitle') ||
              'Everything you need to know about using Bien Star'}
          </p>
        </motion.div>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              index={index}
            />
          ))}
        </div>

        {/* Contact section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-center p-8 bg-muted/30 rounded-2xl border border-border"
        >
          <h3 className="text-xl font-semibold mb-2">
            {t('faq.contact.title') || 'Still have questions?'}
          </h3>
          <p className="text-muted-foreground mb-4">
            {t('faq.contact.description') ||
              'Our support team is here to help you'}
          </p>
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200">
            {t('faq.contact.button') || 'Contact Support'}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
