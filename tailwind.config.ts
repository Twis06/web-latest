import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'liquid-border': 'liquid 8s ease-in-out infinite',
        'blob': 'blob 7s infinite',
        'refraction': 'refraction 5s ease-in-out infinite',
      },
      keyframes: {
        liquid: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' }
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' }
        },
        refraction: {
          '0%': { opacity: '0.5', transform: 'translateY(0px)' },
          '50%': { opacity: '0.8', transform: 'translateY(-10px)' },
          '100%': { opacity: '0.5', transform: 'translateY(0px)' }
        }
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}

export default config