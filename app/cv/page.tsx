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
              <a href="mailto:benli2029@u.northwestern.edu" className="hover:underline">Email</a>
              <a href="https://github.com/Twis06" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
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
                <h3 className="text-xl font-light mb-1">Bachelor of Science in Computer Science & Mechanical Engineering, Northwestern University</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Evanston, IL</p>
              </div>
              <div className="border-l-2 border-gray-300 dark:border-gray-700 pl-6">
                <h3 className="text-xl font-light mb-1">IBDP Candidate, Shanghai Pinghe School</h3>
                {/* <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">2023 - 2025</p> */}
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
              <div className="border-l-2 border-gray-300 dark:border-gray-700 pl-6 flex gap-6 items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-light mb-1">Undergraduate Research Assistant, <a href="https://www.xenobot.group/" target="_blank" rel="noopener noreferrer" className="text-[#434E78] dark:text-[#7A84B8]">Xenobot Lab</a></h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">October 2025 - Present</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Built a DW1000-based localization system with three-anchor triangulation, achieving cm-level positioning at 30 Hz update rate. Solved concurrent SPI bus contention with IMU through interrupt-driven mutex, providing a low-cost alternative to expensive motion capture systems.</li>
                    <li>• Co-developed <a href="https://modularlegs.github.io/" target="_blank" rel="noopener noreferrer" className="text-[#434E78] dark:text-[#7A84B8]">modular robot</a> hardware and RL control with PhD researchers. Designed novel wheel-leg modules and trained locomotion policies (PPO) across diverse morphologies in MuJoCo. Developing wheel-leg hybrid modules for multi-modal locomotion.</li>
                  </ul>
                </div>
                <iframe
                  width="240"
                  height="135"
                  src="https://www.youtube.com/embed/8VKSx1zSg7Q?autoplay=1&mute=1&loop=1&playlist=8VKSx1zSg7Q"
                  title="Reconfigurable legged machines in the wild"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="rounded flex-shrink-0"
                />
              </div>
              <div className="border-l-2 border-gray-300 dark:border-gray-700 pl-6 flex gap-6 items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-light mb-1">Robotics Engineer, <a href="https://www.hapte.org/" target="_blank" rel="noopener noreferrer" className="text-[#434E78] dark:text-[#7A84B8]">HaptE</a></h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">September 2025 - January 2026</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Built fully local inference pipeline on Nvidia Jetson with TensorFlow, achieving &lt;20ms per-frame latency with zero cloud dependency. Delivered as a paid monthly subscription service to warehouse clients.</li>
                    <li>• Trained recognition system (YOLO detection, MobileViT super-resolution, OCR, QR/barcode) achieving 98%+ item accuracy on 2k-image custom dataset. Integrated LiDAR for 3D spatial awareness in cluttered environments.</li>
                    <li>• Developed multi-edge device orchestration with AWS IoT Core for distributed pick-and-place. Integrated LLM-based task planner for intelligent error prevention and autonomous operation.</li>
                  </ul>
                </div>
                <video
                  src="/cv/warehouse4096A.mp4"
                  autoPlay
                  loop
                  muted
                  className="w-60 h-auto rounded flex-shrink-0"
                />
              </div>
              <div className="border-l-2 border-gray-300 dark:border-gray-700 pl-6 flex gap-6 items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-light mb-1">Research Intern, Machine Learning & Language Lab, Northwestern University</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">September 2025</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Developed object manipulation training environment in Genesis physics simulator with procedural 3D asset generation, automated state initialization, and domain-randomized scene composition for PhD research.</li>
                    <li>• Designed end-to-end pipeline generating curated image-text pairs from simulated manipulation scenes, producing 10k+ training samples for vision-language model fine-tuning.</li>
                  </ul>
                </div>
                <video
                  src="/cv/genesis.mp4"
                  autoPlay
                  loop
                  muted
                  className="w-50 h-auto rounded flex-shrink-0"
                />
              </div>
              <div className="border-l-2 border-gray-300 dark:border-gray-700 pl-6">
                <h3 className="text-xl font-light mb-1">Research Intern (Algorithm), Differential Robotics</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">May 2025 - August 2025</p>
                <ul className="space-y-2 text-sm">
                  <li>• Designed sparse-to-dense reward curriculum for obstacle avoidance, improving training convergence 3× over baseline PPO in cluttered environments in IsaacLab.</li>
                  <li>• Deployed real-time end-to-end vision model for high-speed drone maneuvers through near-vertical frames at 4+ m/s. Achieved 95% success rate with MobileNetV3 optimized via TensorRT (&lt;5ms latency). Successfully transferred to physical hardware.</li>
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
              {/* Completed Projects */}
              <div>
                <h3 className="text-xl font-light mb-1">End-to-End High-Speed Drone Navigation System</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">2025</p>
                <a href="https://framevisualize.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline mb-4 inline-block">
                  Visualized Results →
                </a>
                <ul className="space-y-2 text-sm mb-6">
                  <li>• Developed end-to-end vision-to-control system enabling drones to traverse 85° tilted frames at 4–6 m/s with 95% success rate.</li>
                  <li>• Optimized MobileNetV3 + DeepLabV3+ on Jetson Xavier NX via TensorRT, achieving ~3ms inference and &gt;60Hz closed-loop control.</li>
                </ul>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <img src="/cv/takeoff-1-80deg.gif" alt="Drone takeoff 1" className="w-full h-auto rounded" />
                  <img src="/cv/takeoff-4-80deg.gif" alt="Drone takeoff 4" className="w-full h-auto rounded" />
                  <img src="/cv/takeoff-9-45deg.gif" alt="Drone takeoff 9" className="w-full h-auto rounded" />
                  <img src="/cv/takeoff-low1-80deg.gif" alt="Drone takeoff low" className="w-full h-auto rounded" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-light mb-1">End-to-End RL Drone Navigation System</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">2025</p>
                <ul className="space-y-2 text-sm">
                  <li>• Built an end-to-end navigation pipeline in IsaacLab using deep reinforcement learning (PPO), mapping high-dimensional sensor inputs (depth images + proprioceptive states) directly to low-level motor actions.</li>
                  <li>• Implemented curriculum learning & domain randomization (obstacle density, dynamic disturbances, sensor noise) to improve generalization and enable sim-to-real transfer.</li>
                  <li>• Designed hybrid reward shaping: integrated Dijkstra-based path priors, directional distance rewards, ESDF collision penalties, and smoothness constraints to stabilize long-horizon flight.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-light mb-1">Low-Cost UWB Localization for <a href="https://arxiv.org/abs/2404.05120" target="_blank" rel="noopener noreferrer" className="text-[#434E78] dark:text-[#7A84B8]">Rollbot</a></h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">2025–2026</p>
                <ul className="space-y-2 text-sm">
                  <li>• Built DW1000 localization with concurrent SPI bus sharing (UWB + IMU) via interrupt-driven hardware mutex for stable multi-device communication.</li>
                  <li>• Rewrote TWR ranging protocol, increasing update rate to 30 Hz and improving accuracy via Kalman-filtered multi-anchor triangulation.</li>
                  <li>• Delivered cm-level autonomous navigation for <a href="https://arxiv.org/abs/2404.05120" target="_blank" rel="noopener noreferrer" className="text-[#434E78] dark:text-[#7A84B8]">Rollbot</a> (single-actuator spherical robot), offering a $50 embedded alternative to $10k+ OptiTrack systems.</li>
                </ul>
              </div>

              {/* Ongoing Projects */}
              <div>
                <h3 className="text-xl font-light mb-1">Wheel-Legged Modular Robot with Evolutionary Design <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">(Ongoing)</span></h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4"></p>
                <ul className="space-y-2 text-sm">
                  <li>• Designing wheel-leg hybrid modules enabling multi-modal locomotion (walking, rolling, climbing) with evolutionary morphology optimization.</li>
                  <li>• Training RL control policies (PPO via SB3) in MuJoCo for computer-generated morphologies; conducting sim-to-real transfer to physical robot.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-light mb-1">Multi-Drone VLA Coordination System <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">(Ongoing)</span></h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4"></p>
                <ul className="space-y-2 text-sm">
                  <li>• Designing hierarchical architecture: VLA model for high-level mission planning, with learned low-level control policies for agile flight.</li>
                  <li>• Acheived stable flight with payloads in cluttered environments in IsaacSim.</li>
                  <li>• Building multi-agent simulation for autonomous delivery, collaborative mapping, and object search tasks.</li>
                </ul>
              </div>

              {/* <div>
                <h3 className="text-xl font-light mb-1">Drum Generation from Vocal Beatbox via Flow Matching <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">(Ongoing)</span></h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4"></p>
                <ul className="space-y-2 text-sm">
                  <li>• Developing data pipeline mapping drum MIDI datasets to vocal beatbox audio for paired training corpus generation.</li>
                </ul>
              </div> */}

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
            <div className="space-y-6">
              {[
                { category: 'Programming', items: ['Python', 'C/C++', 'MATLAB', 'LaTeX'] },
                { category: 'Robotics & AI', items: ['Reinforcement Learning (PPO, SAC)', 'Computer Vision', 'Motion Planning', 'Sim-to-Real Transfer'] },
                { category: 'Tools & Frameworks', items: ['IsaacLab', 'PyTorch', 'TensorFlow', 'TensorRT', 'OpenCV', 'AWS IoT', 'ROS2'] },
                { category: 'Hardware', items: ['Nvidia Jetson', 'ESP32', 'UWB', 'IMU', 'LiDAR', 'Drone Systems', '3D Printing/CAD'] },
              ].map((group, groupIndex) => (
                <div key={groupIndex}>
                  <h3 className="text-lg font-light mb-3">{group.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill, index) => (
                      <motion.div
                        key={index}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-900 text-sm font-light rounded"
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </div>
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
                <li>• High School Mathematical Contest in Modeling (HiMCM): Outstanding (Global Top 1%) <a href="/cv/14140.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">[pdf link]</a></li>
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
                href="https://www.twis.onl/photography"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                photography portfolio
              </a>
              .
            </p>
          </motion.section>
        </div>
      </div>
    </PageTransition>
  );
};

export default CV;
