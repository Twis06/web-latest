'use client';

import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const CV = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-white dark:bg-black px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-light mb-2">Peiyang (Ben) Li</h1>
            <p className="text-gray-600 dark:text-gray-400 font-light text-lg">Student</p>
            <div className="flex gap-6 mt-4 text-sm">
              <a href="mailto:twislpy01@icloud.com" className="hover:underline">Email</a>
              <a href="https://github.com/Twis06" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
              <a href="https://peiyangli104.cargo.site/" target="_blank" rel="noopener noreferrer" className="hover:underline">Portfolio</a>
            </div>
          </motion.div>

          {/* Education */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-light mb-8">Education</h2>
            <div className="space-y-8">
              <div className="border-l-2 border-gray-300 dark:border-gray-700 pl-6">
                <h3 className="text-xl font-light mb-1">Bachelor's Degree, Northwestern University</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">2025 - 2029</p>
              </div>
              <div className="border-l-2 border-gray-300 dark:border-gray-700 pl-6">
                <h3 className="text-xl font-light mb-1">IBDP Candidate, Shanghai Pinghe School</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">2023 - 2025</p>
                <p className="text-sm">Graduated on the Principal's List (top 5% of class)</p>
              </div>
            </div>
          </motion.section>

          {/* Experience */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-light mb-8">Work Experience</h2>
            <div className="space-y-12">
              <div className="border-l-2 border-gray-300 dark:border-gray-700 pl-6">
                <h3 className="text-xl font-light mb-1">Undergraduate Research Assistant, Xenobot Lab</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">October 2025 - Present</p>
                <ul className="space-y-2 text-sm">
                  <li>• Developed and implemented a UWB-based localization system using the DW1000 transceiver</li>
                  <li>• Achieved accurate 3D positioning with a three-anchor, one-tag setup</li>
                  <li>• Optimized the communication protocol to enhance system efficiency and reliability</li>
                </ul>
              </div>
              <div className="border-l-2 border-gray-300 dark:border-gray-700 pl-6">
                <h3 className="text-xl font-light mb-1">Research Intern, Machine Learning & Language Lab, Northwestern University</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">September 2025 - Present</p>
                <ul className="space-y-2 text-sm">
                  <li>• Researching spatial intelligence agents and helping PHD research projects in embodied AI</li>
                  <li>• Developing comprehensive training playground for object manipulation using Genesis physics simulator</li>
                  <li>• Designed automated system to import 3D objects, generate target/initial states, and produce optimal image-text sequences for standardized multi-modal training pipelines</li>
                </ul>
              </div>
              <div className="border-l-2 border-gray-300 dark:border-gray-700 pl-6">
                <h3 className="text-xl font-light mb-1">Research Intern (Algorithm), Differential Robotics, Hangzhou</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">June 2025 - August 2025</p>
                <p className="text-sm mb-3">Worked on two autonomous drone projects:</p>
                <ul className="space-y-2 text-sm">
                  <li>• Optimized sparse reward RL for obstacle avoidance navigation</li>
                  <li>• Implemented real-time computer vision for high-speed stunt maneuvers, achieved 90% success rate in extreme conditions using MobileNetV3 architecture</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Projects */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-light mb-8">Projects</h2>
            <div className="space-y-12">
              {/* End-to-End High-Speed Drone Frame Navigation System */}
              <div>
                <h3 className="text-xl font-light mb-1">End-to-End High-Speed Drone Frame Navigation System</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">2025</p>
                <a href="https://framevisualize.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline mb-4 inline-block">
                  Visualized Results →
                </a>
                <ul className="space-y-2 text-sm mb-6">
                  <li>• Developed an End-to-End vision-based navigation system enabling drones to traverse 85° tilted frames at 4–6 m/s with near-100% success under standard conditions.</li>
                  <li>• Developed a custom deflicker algorithm to mitigate indoor lighting flicker, ensuring stable frame detection.</li>
                  <li>• Designed and trained CNN-based segmentation models with multi-color frame detection, incorporating extensive data augmentation (noise, brightness shifts, geometric transforms) to enhance robustness.</li>
                  <li>• Optimized MobilenetV3 + DeeplabV3+ backbone by reducing network depth; achieved ~3ms inference latency on Jetson Xavier NX using FP16 TensorRT quantization.</li>
                  <li>• Trained control policy in simulation with RL, leveraging shaped rewards (center alignment, collision penalties, smoothness constraints, Distillation-awareness Regularization).</li>
                  <li>• Deployed segmentation and policy jointly with combined latency &lt;16ms, enabling &gt;60Hz control frequency for onboard flight.</li>
                  <li>• Conducted extensive real-world tests, validating segmentation robustness and system stability in high-speed traversal.</li>
                  <li>• Acquired strong manual piloting skills, supporting iterative testing and system verification.</li>
                </ul>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <img src="/cv/takeoff-1-80deg.gif" alt="Drone takeoff 1" className="w-full h-auto rounded" />
                  <img src="/cv/takeoff-4-80deg.gif" alt="Drone takeoff 4" className="w-full h-auto rounded" />
                  <img src="/cv/takeoff-9-45deg.gif" alt="Drone takeoff 9" className="w-full h-auto rounded" />
                  <img src="/cv/takeoff-low1-80deg.gif" alt="Drone takeoff low" className="w-full h-auto rounded" />
                </div>
              </div>

              {/* End-to-End RL Drone Navigation System */}
              <div>
                <h3 className="text-xl font-light mb-1">End-to-End RL Drone Navigation System</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">2025</p>
                <ul className="space-y-2 text-sm">
                  <li>• Built an end-to-end navigation pipeline in IsaacLab using deep reinforcement learning (PPO), mapping high-dimensional sensor inputs (depth images + proprioceptive states) directly to low-level motor actions.</li>
                  <li>• Implemented curriculum learning & domain randomization (obstacle density, dynamic disturbances, sensor noise) to improve generalization and enable sim-to-real transfer.</li>
                  <li>• Designed hybrid reward shaping: integrated Dijkstra-based path priors, directional distance rewards, ESDF collision penalties, and smoothness constraints to stabilize long-horizon flight.</li>
                </ul>
              </div>

              {/* Modeling Soccer Ball Trajectory */}
              <div>
                <h3 className="text-xl font-light mb-1">Modeling Soccer Ball Trajectory</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">2023</p>
                <ul className="space-y-2 text-sm">
                  <li>• Developed computational simulation using Python, hydrodynamics, and ML</li>
                  <li>• Incorporated Magnus effect for accurate modeling</li>
                  <li>• Achieved &lt;40cm trajectory error in windless conditions</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Skills */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-light mb-8">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                'LaTeX',
                'Python',
                'Data Analysis',
                'Machine Learning',
                'Reinforcement Learning',
                'Computer Vision',
                'Web Development',
                'Drone Operation',
                'Photography',
                'Video Editing',
                '3D Modeling',
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-900 text-sm font-light rounded"
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Awards */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-light mb-8">Awards</h2>
            <div className="border-l-2 border-gray-300 dark:border-gray-700 pl-6">
              <h3 className="text-xl font-light mb-4">Mathematics & Modeling</h3>
              <ul className="space-y-2 text-sm">
                <li>• High School Mathematical Contest in Modeling (HiMCM): Outstanding (Global Top 1%)</li>
                <li>• American Regions Mathematics League (ARML): Global Top 10</li>
              </ul>
            </div>
          </motion.section>

          {/* Languages */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-light mb-8">Languages</h2>
            <p className="text-gray-700 dark:text-gray-300">Chinese (Native), English (Native), German (Basic)</p>
          </motion.section>

          {/* Interests */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-light mb-8">Interests</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Photography, Filmmaking, Travel, Soccer, Badminton. View my{' '}
              <a
                href="https://peiyangli104.cargo.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                photography portfolio
              </a>
              {' '}for creative work samples.
            </p>
          </motion.section>
        </div>
      </div>
    </PageTransition>
  );
};

export default CV;
