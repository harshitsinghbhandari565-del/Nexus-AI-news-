import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'space': ['Space Grotesk', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // NEXUS Color Palette
        nexus: {
          bg: '#050508',
          'bg-secondary': '#0a0a12',
          'bg-card': '#0d0d1a',
          'bg-elevated': '#111128',
          border: '#1a1a35',
          'border-bright': '#2a2a55',
          primary: '#00d4ff',
          'primary-dim': '#0099bb',
          secondary: '#7b2fff',
          'secondary-dim': '#5a1fbf',
          accent: '#ff6b35',
          'accent-dim': '#cc5528',
          gold: '#ffd700',
          'gold-dim': '#cc9900',
          green: '#00ff88',
          'green-dim': '#00cc66',
          red: '#ff3366',
          text: '#e8e8ff',
          'text-secondary': '#9999cc',
          'text-muted': '#555588',
          india: '#ff9933',
          'india-dim': '#cc7700',
        }
      },
      backgroundImage: {
        'gradient-nexus': 'linear-gradient(135deg, #050508 0%, #0a0a18 50%, #050510 100%)',
        'gradient-primary': 'linear-gradient(135deg, #00d4ff 0%, #7b2fff 100%)',
        'gradient-india': 'linear-gradient(135deg, #ff9933 0%, #138808 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(13,13,26,0.95) 0%, rgba(17,17,40,0.90) 100%)',
        'gradient-glow': 'radial-gradient(ellipse at center, rgba(0,212,255,0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'nexus': '0 0 30px rgba(0, 212, 255, 0.1), 0 4px 24px rgba(0,0,0,0.6)',
        'nexus-hover': '0 0 50px rgba(0, 212, 255, 0.2), 0 8px 32px rgba(0,0,0,0.8)',
        'gold': '0 0 20px rgba(255, 215, 0, 0.3)',
        'purple': '0 0 30px rgba(123, 47, 255, 0.2)',
        'india': '0 0 20px rgba(255, 153, 51, 0.2)',
        'inner-glow': 'inset 0 0 30px rgba(0,212,255,0.05)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan-line': 'scanLine 8s linear infinite',
        'particle': 'particle 20s linear infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'number-tick': 'numberTick 0.3s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'border-flow': 'borderFlow 4s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        borderFlow: {
          '0%, 100%': { borderColor: 'rgba(0,212,255,0.3)' },
          '50%': { borderColor: 'rgba(123,47,255,0.6)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}

export default config
