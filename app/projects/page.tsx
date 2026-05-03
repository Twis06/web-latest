'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import PageTransition from '../components/PageTransition';

const Projects = () => {
  const projects = [
    {
      title: 'Zombies VS Plants',
      description: 'Real-time PvP Plants vs. Zombies-inspired strategy game with playable plant/zombie sides, AI opponents trained from gameplay logs, and a CV physical board interface.',
      tags: ['JavaScript', 'HTML/CSS', 'Python', 'Computer Vision', 'AI Agents'],
      links: [
        { label: 'GitHub', href: 'https://github.com/Twis06/wildhack_pvz' },
        { label: 'Video', href: 'https://www.youtube.com/watch?v=29wHaHFr8EQ' },
      ],
    },
    {
      title: 'Beatbox-to-Drum Generation',
      description: 'Beatbox-to-drum generation system that converts vocal percussion into symbolic 9-class drum patterns using flow matching, MIDI tooling, and human-feedback ranking.',
      tags: ['Python', 'PyTorch', 'torchaudio', 'Flow Matching', 'MIDI'],
      links: [
        { label: 'Demo', href: 'https://bbox-translator-demo.vercel.app/' },
      ],
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-white dark:bg-black px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-7xl font-light mb-2">Projects</h1>
            <p className="text-gray-600 dark:text-gray-400 font-light mb-12">
              A selection of work I&apos;ve created
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                <h3 className="text-2xl font-light">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 font-light">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="text-xs text-gray-600 dark:text-gray-500 font-light">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4">
                  {project.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-gray-900 dark:text-white font-light hover:text-gray-600 dark:hover:text-gray-400"
                    >
                      {link.label} →
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Projects;
