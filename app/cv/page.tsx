'use client';

import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const CV = () => {
  const experiences = [
    {
      title: 'Full Stack Developer',
      company: 'Your Company',
      period: '2023 - Present',
      description: 'Building web applications with modern technologies.',
    },
    {
      title: 'Junior Developer',
      company: 'Previous Company',
      period: '2022 - 2023',
      description: 'Started my development journey working on various projects.',
    },
  ];

  const skills = ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Photography', 'UI/UX'];

  return (
    <PageTransition>
      <div className="min-h-screen bg-white dark:bg-black px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-7xl font-light mb-2">CV</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-12 font-light">Resume & Professional Background</p>
          </motion.div>

          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl font-light mb-12">Experience</h2>
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-light mb-1">{exp.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 font-light">{exp.company}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 font-light mb-3">{exp.period}</p>
                  <p className="text-gray-700 dark:text-gray-300 font-light">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-light mb-8">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-900 text-sm font-light"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CV;
