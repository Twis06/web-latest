import type { ReactNode } from "react";

/*
  Everything the CV page shows. Adding an entry is an edit here, not in a component.
  Dates come from the CV and Resume/cv.tex; leave `when` out rather than guess one.
*/

export type Link = { label: string; href: string };

export type Clip = { src: string; poster: string; alt: string };

export type Media =
  | ({ kind: "clip"; ratio: number } & Clip)
  | { kind: "grid"; ratio: number; clips: Clip[] }
  | { kind: "youtube"; id: string; ratio: number; poster: string; title: string }
  | { kind: "flight"; ratio: number; angles: number[]; runs: FlightRun[] };

/** One recorded traversal from the drone flight tests: a takeoff point flown through a frame tilted `angle`°. */
export type FlightRun = { id: number; angle: number; src: string; poster: string };

// The recorded flight-test runs (from the framevisualize project): takeoff points 1–10 at two frame tilts.
const RECORDED: Record<number, number[]> = { 45: [2, 3, 4, 6, 7, 8, 9, 10], 80: [1, 2, 3, 4, 6, 7, 8, 9] };
const flightRuns: FlightRun[] = Object.entries(RECORDED).flatMap(([angle, ids]) =>
  ids.map((id) => ({ id, angle: Number(angle), src: `/cv/flight/t${id}-${angle}.mp4`, poster: `/cv/flight/t${id}-${angle}.jpg` })),
);

export type Figure = {
  caption: string;
  media: Media;
  /** Run the figure under the entry across the text and figure columns, for footage with small detail. */
  wide?: boolean;
  /** Readouts laid over the footage on hover; facts from the entry's own text that hold for this footage. */
  hud?: string[];
};

export type Entry = {
  /** The date column: one readout, or a start and an end. */
  when?: [string] | [string, string];
  title: ReactNode;
  /** Plain-text title, where `title` carries a link. */
  name?: string;
  org?: Link | string;
  /** Place, or the stack for a project. */
  meta?: string;
  /** Filter tags for the run table. */
  tags?: string[];
  /** The one number the row leads with, taken from the entry's own text. */
  metric?: { value: string; label: string };
  links?: Link[];
  press?: Link[];
  points: ReactNode[];
  figure?: Figure;
};

export type Section = { id: string; title: string; entries: Entry[] };

export const profile = {
  name: "Peiyang (Ben) Li",
  short: "Ben Li",
  line: "Student",
  email: "benli2029@u.northwestern.edu",
  github: "https://github.com/Twis06",
  photography: "https://mediaportfolio.vercel.app/",
};

const a = (href: string, label: ReactNode) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {label}
  </a>
);

export const sections: Section[] = [
  {
    id: "education",
    title: "Education",
    entries: [
      {
        when: ["Expected 2029"],
        title: "Bachelor of Science in Computer Science & Mechanical Engineering",
        tags: ["Education"],
        metric: { value: "4.0", label: "GPA" },
        org: "Northwestern University",
        meta: "Evanston, IL",
        points: ["GPA: 4.0 / 4.0", "Freshman Dean’s List — High Honors"],
      },
      {
        when: ["Graduated 2025"],
        title: "IBDP Candidate",
        tags: ["Education"],
        metric: { value: "Top 5%", label: "of class" },
        org: "Shanghai Pinghe School",
        points: ["Graduated on the Principal’s List (top 5% of class)"],
      },
    ],
  },
  {
    id: "experience",
    title: "Experience",
    entries: [
      {
        when: ["Oct 2025", "Now"],
        title: "Undergraduate Research Assistant",
        tags: ["Hardware", "RL", "Embedded"],
        metric: { value: "30 Hz", label: "cm-level UWB" },
        org: { label: "Xenobot Lab", href: "https://www.xenobot.group/" },
        points: [
          "Built a DW1000-based localization system with three-anchor triangulation, achieving cm-level positioning at 30 Hz update rate. Solved concurrent SPI bus contention with IMU through interrupt-driven mutex, providing a low-cost alternative to expensive motion capture systems.",
          <>
            Co-developed {a("https://modularlegs.github.io/", "modular robot")} hardware and RL control with PhD
            researchers. Designed novel wheel-leg modules and trained locomotion policies (PPO) across diverse
            morphologies in MuJoCo. Developing wheel-leg hybrid modules for multi-modal locomotion.
          </>,
          "Received $4,000 in Northwestern research funding to continue this work through the summer; selected by the Hung-Farinelli family as one of the fund’s featured projects.",
        ],
        press: [
          { label: "Reuters", href: "https://www.youtube.com/watch?v=-jUiWRV27fo" },
          { label: "BBC", href: "https://soundcloud.com/kriegman-lab/bbc-newshour-a-robot-that-can" },
          {
            label: "Northwestern",
            href: "https://www.mccormick.northwestern.edu/news/articles/2026/03/evolved-robots-are-born-to-run-and-refuse-to-die/",
          },
          {
            label: "WGN",
            href: "https://tech.yahoo.com/science/articles/northwestern-university-explores-animal-evolution-225509073.html",
          },
        ],
        figure: {
          caption: "Reconfigurable legged machines in the wild",
          media: {
            kind: "youtube",
            id: "8VKSx1zSg7Q",
            ratio: 16 / 9,
            poster: "/cv/xenobot-legged-machines.jpg",
            title: "Reconfigurable legged machines in the wild",
          },
        },
      },
      {
        when: ["Sep 2025", "Jan 2026"],
        title: "Robotics Engineer",
        tags: ["Perception", "Edge AI"],
        metric: { value: "<20 ms", label: "per frame" },
        org: { label: "HaptE", href: "https://www.hapte.org/" },
        points: [
          "Built fully local inference pipeline on Nvidia Jetson with TensorFlow, achieving <20ms per-frame latency with zero cloud dependency. Delivered as a paid monthly subscription service to warehouse clients.",
          "Trained recognition system (YOLO detection, MobileViT super-resolution, OCR, QR/barcode) achieving 98%+ item accuracy on 2k-image custom dataset. Integrated LiDAR for 3D spatial awareness in cluttered environments.",
          "Developed multi-edge device orchestration with AWS IoT Core for distributed pick-and-place. Integrated LLM-based task planner for intelligent error prevention and autonomous operation.",
        ],
        figure: {
          caption: "Warehouse deployment, on-device camera feed",
          hud: ["<20 ms per frame", "98%+ item accuracy", "On-device · Jetson"],
          media: {
            kind: "clip",
            ratio: 1280 / 666,
            src: "/cv/warehouse-preview.mp4",
            poster: "/cv/warehouse-preview.jpg",
            alt: "Camera feed from a HaptE warehouse deployment",
          },
        },
      },
      {
        when: ["May 2025", "Aug 2025"],
        title: "Research Intern (Algorithm)",
        tags: ["RL", "Perception"],
        metric: { value: "3×", label: "faster convergence" },
        org: "Differential Robotics",
        points: [
          "Designed sparse-to-dense reward curriculum for obstacle avoidance, improving training convergence 3× over baseline PPO in cluttered environments in IsaacLab.",
          "Deployed real-time end-to-end vision model for high-speed drone maneuvers through near-vertical frames at 4+ m/s. Achieved 95% success rate with MobileNetV3 optimized via TensorRT (<5ms latency). Successfully transferred to physical hardware.",
        ],
      },
    ],
  },
  {
    id: "projects",
    title: "Projects",
    entries: [
      // From the Wheg_v2 repo (Xenobot/26Lab/Wheg_v2): hardware bring-up is real; locomotion results are simulation.
      {
        when: ["Jul 2026", "Now"],
        title: "Wheel-Legged Modular Robot",
        tags: ["RL", "Hardware", "Sim-to-real"],
        metric: { value: "2.26M", label: "steps/s" },
        meta: "MuJoCo / mjlab, Isaac Lab, RSL-RL PPO, ESP32, Sim-to-Real",
        points: [
          "Building an 8-module wheel-legged robot for the lab’s modular robot platform: 3-DoF legs on driven wheels, each module an MG4010 motor with its own ESP32 and IMU.",
          "Built the RL training pipeline from MuJoCo/mjlab to Isaac Lab (RSL-RL PPO, GRU policies) at 2.26M physics steps/s across 32k parallel environments; policies cross slopes, steps and rough terrain in simulation.",
          "Brought up the hardware: calibrated six leg modules to within 3 mm and wrote a 50 Hz control daemon with watchdog and E-stop for sim-to-real deployment.",
          "Traced sim-to-real gaps to the plant model (measured wheel mass, a unit bug capping wheel speed near 25%) and revalidated every policy against the corrected model.",
        ],
        figure: {
          caption: "Simulation: 12 locomotion tasks on the full CAD model",
          hud: ["Simulation", "2.26M steps/s", "32k parallel envs"],
          wide: true,
          media: {
            kind: "clip",
            ratio: 16 / 9,
            src: "/cv/wheg-sim-tasks.mp4",
            poster: "/cv/wheg-sim-tasks.jpg",
            alt: "Grid of twelve simulated runs of the wheel-legged robot: standing, driving, turning, slopes, rough terrain, waves, steps and obstacles",
          },
        },
      },
      // Under double-blind review: no link and no paper title until it is public.
      {
        when: ["2026"],
        title: "Evolved Robot Manipulators, Sim-to-Real",
        tags: ["Hardware", "Sim-to-real", "Manipulation"],
        metric: { value: "8/10", label: "picks, unseen objects" },
        meta: "Sim-to-Real, Reinforcement Learning, 3D-Printed Hardware",
        points: [
          "Built the real-world and sim-to-real side: designs evolved in simulation were printed, assembled and deployed zero-shot.",
          "On hardware: picked 24 unseen objects (8 of 10 attempts on average), hung from a bar under a 500 g load, and pulled a cube out of a pipe.",
        ],
        figure: {
          caption: "Evolved two-finger rotator turning a cube on hardware",
          hud: ["Real hardware", "Zero-shot deploy", "Evolved in sim"],
          media: {
            kind: "clip",
            ratio: 16 / 9,
            src: "/cv/evolved-rotator.mp4",
            poster: "/cv/evolved-rotator.jpg",
            alt: "An evolved two-finger robot manipulator rotating a Rubik's cube",
          },
        },
      },
      {
        when: ["2025"],
        title: "End-to-End High-Speed Drone Navigation System",
        tags: ["RL", "Perception", "Sim-to-real"],
        metric: { value: "95%", label: "success at 4–6 m/s" },
        meta: "Computer Vision, Reinforcement Learning, TensorRT, Sim-to-Real",
        links: [
          { label: "Demo", href: "https://framevisualize.vercel.app/" },
          { label: "IROS 2025", href: "https://2025.ieee-iros.org/" },
          { label: "Science Robotics", href: "https://www.science.org/doi/pdf/10.1126/scirobotics.aeb0180" },
          { label: "ICRA", href: "https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=11128088" },
        ],
        points: [
          "Led the full sim-to-real deployment of the paper’s end-to-end sensorimotor policy, enabling a physical drone to traverse 85° tilted frames at 4–6 m/s with 95% success and high repeatability; the resulting demo was exhibited at IROS 2025.",
          "Optimized MobileNetV3 + DeepLabV3+ on Jetson Xavier NX via TensorRT, achieving ~3 ms inference and >60 Hz closed-loop control.",
          <>
            Deployed models developed in <em>Precise Aggressive Aerial Maneuvers with Sensorimotor Policies</em>{" "}
            (Science Robotics) and <em>Whole-Body Control Through Narrow Gaps from Pixels to Action</em> (ICRA).
          </>,
        ],
        figure: {
          caption: "Flight tests: pick a frame tilt and a takeoff point",
          hud: ["~3 ms inference", ">60 Hz control"],
          wide: true,
          media: { kind: "flight", ratio: 16 / 9, angles: [45, 80], runs: flightRuns },
        },
      },
      {
        title: "Dexterous Hand Object Reorientation",
        tags: ["Manipulation", "Sim-to-real"],
        metric: { value: "16", label: "DoF hand" },
        meta: "Isaac Lab, PyBullet, Dexterous Manipulation, Sim-to-Real",
        points: [
          "Assembled and calibrated a 16-DoF dexterous hand platform; built a PyBullet digital twin for joint-level control tests, policy debugging, and hardware-safe command validation.",
          "Trained Isaac Lab object-reorientation policies with randomized object poses, dynamics, and actuator parameters, then deployed them on the physical hand and iteratively tuned sim-to-real reliability.",
        ],
        figure: {
          caption: "Reorienting a cube on the physical hand",
          hud: ["16-DoF hand", "Isaac Lab → real"],
          media: {
            kind: "clip",
            ratio: 640 / 854,
            src: "/cv/leap-hand.mp4",
            poster: "/cv/leap-hand.jpg",
            alt: "16-DoF robotic hand reorienting a cube",
          },
        },
      },
      {
        title: "ME 433 Haptic Feedback Joystick",
        tags: ["Hardware", "Embedded"],
        metric: { value: "500 Hz", label: "control loop" },
        meta: "Embedded Control, Haptics, STM32, Raspberry Pi Pico 2 W",
        links: [{ label: "GitHub", href: "https://github.com/Twis06/ME433HW" }],
        points: [
          "Designed and built a two-axis force-feedback joystick as the final class project for Northwestern’s ME 433: Advanced Mechatronics.",
          "Integrated modified servos, magnetic encoders, force sensing, and custom STM32/Pico 2 W electronics.",
          "Implemented a 500 Hz closed-loop controller that renders programmable textures and forces through the joystick.",
        ],
        figure: {
          caption: "Two-axis force-feedback joystick",
          hud: ["500 Hz control loop", "STM32 · Pico 2 W"],
          media: {
            kind: "clip",
            ratio: 16 / 9,
            src: "/cv/me433-haptic-joystick-preview.mp4",
            poster: "/cv/me433-haptic-joystick-preview.jpg",
            alt: "Hand moving the haptic joystick while a plot updates on screen",
          },
        },
      },
      {
        title: "F1TENTH Autonomous Driving",
        tags: ["Autonomy"],
        meta: "ROS 2, LiDAR SLAM, A*, MPPI, Ackermann Control",
        points: [
          "Built and deployed a ROS 2 autonomy stack on a physical F1TENTH car, integrating LiDAR SLAM, localization, and RViz-based debugging.",
          "Combined A* global planning with MPPI local trajectory tracking and Ackermann drive control for closed-loop navigation.",
        ],
      },
      {
        when: ["2026"],
        title: "Zombies VS Plants",
        tags: ["Software", "Perception"],
        metric: { value: "24 h", label: "hackathon build" },
        meta: "JavaScript, HTML/CSS, Python, Computer Vision, AI Agents",
        links: [
          { label: "GitHub", href: "https://github.com/Twis06/wildhack_pvz" },
          { label: "Video", href: "https://www.youtube.com/watch?v=29wHaHFr8EQ" },
        ],
        points: [
          "Built a real-time PvP strategy game inspired by Plants vs. Zombies, adding playable plant/zombie sides, local 1v1 gameplay, animated sprites, sound effects, and AI opponents trained from recorded gameplay logs.",
          "Integrated a computer-vision physical board interface that detects real-world game pieces and maps their type/location onto the in-game grid; built in 24 hours at WildHacks 2026.",
        ],
        figure: {
          caption: "Demo video, WildHacks 2026",
          hud: ["Built in 24 h", "WildHacks 2026"],
          media: {
            kind: "youtube",
            id: "29wHaHFr8EQ",
            ratio: 16 / 9,
            poster: "/cv/zombies-vs-plants.jpg",
            title: "Zombies VS Plants demo",
          },
        },
      },
      {
        when: ["2026"],
        title: "Beatbox-to-Drum Generation",
        tags: ["ML", "Audio"],
        metric: { value: "9", label: "drum classes" },
        meta: "Python, PyTorch, torchaudio, Flow Matching, MIDI, Human Feedback",
        links: [{ label: "Demo website", href: "https://bbox-translator-demo.vercel.app/" }],
        points: [
          "Developed a beatbox-to-drum generation system that converts vocal percussion recordings into symbolic 9-class drum patterns using a flow-matching-based generative model.",
          "Built an audio preprocessing/model training pipeline, MIDI/audio tooling, and a human-feedback review loop for ranking outputs, training reward models, and iteratively improving rhythmic alignment and musical realism.",
        ],
      },
      {
        when: ["2025"],
        title: "End-to-End RL Drone Navigation System",
        tags: ["RL", "Sim-to-real"],
        meta: "IsaacLab, PPO, Curriculum Learning, Domain Randomization",
        points: [
          "Built an end-to-end navigation pipeline in IsaacLab using deep reinforcement learning (PPO), mapping high-dimensional sensor inputs (depth images + proprioceptive states) directly to low-level motor actions.",
          "Implemented curriculum learning & domain randomization (obstacle density, dynamic disturbances, sensor noise) to improve generalization and enable sim-to-real transfer.",
          "Designed hybrid reward shaping: integrated Dijkstra-based path priors, directional distance rewards, ESDF collision penalties, and smoothness constraints to stabilize long-horizon flight.",
        ],
      },
      {
        when: ["2025", "2026"],
        title: <>Low-Cost UWB Localization for {a("https://arxiv.org/abs/2404.05120", "Rollbot")}</>,
        name: "Low-Cost UWB Localization for Rollbot",
        tags: ["Embedded", "Localization"],
        metric: { value: "$50", label: "vs $10k+ mocap" },
        points: [
          "Built DW1000 localization with concurrent SPI bus sharing (UWB + IMU) via interrupt-driven hardware mutex for stable multi-device communication.",
          "Rewrote TWR ranging protocol, increasing update rate to 30 Hz and improving accuracy via Kalman-filtered multi-anchor triangulation.",
          <>
            Delivered cm-level autonomous navigation for {a("https://arxiv.org/abs/2404.05120", "Rollbot")}{" "}
            (single-actuator spherical robot), offering a $50 embedded alternative to $10k+ OptiTrack systems.
          </>,
        ],
      },
    ],
  },
];
