'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import PageTransition from '../components/PageTransition';

const Projects = () => {
  const projects = [
    {
      title: 'Project One',
      description: 'A brief description of your first project.',
      tags: ['React', 'TypeScript', 'Tailwind'],
      link: '#',
    },
    {
      title: 'Project Two',
      description: 'A brief description of your second project.',
      tags: ['Next.js', 'PostgreSQL'],
      link: '#',
    },
    {
      title: 'Project Three',
      description: 'A brief description of your third project.',
      tags: ['React', 'Framer Motion', 'Design'],
      link: '#',
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
              A selection of work I've created
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
                <Link href={project.link} className="inline-block text-gray-900 dark:text-white font-light hover:text-gray-600 dark:hover:text-gray-400">
                  View →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Projects;
