/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#ffffff',
        surface: {
          DEFAULT: '#ffffff',
          subtle: '#fafafa',
          muted: '#f4f4f5',
          border: '#e4e4e7',
          borderDark: '#d4d4d8',
        },
        brand: {
          DEFAULT: '#09090b',
          primary: '#4f46e5', // Tech indigo
          accent: '#10b981',  // Emerald green
          violet: '#7c3aed',
          amber: '#f59e0b',
          rose: '#f43f5e',
        },
        ink: {
          DEFAULT: '#09090b',
          secondary: '#3f3f46',
          muted: '#71717a',
          faint: '#a1a1aa',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 12px 30px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'elevated': '0 20px 40px -10px rgba(0, 0, 0, 0.1), 0 0 1px 1px rgba(0, 0, 0, 0.05)',
        'glow-violet': '0 0 30px rgba(124, 58, 237, 0.18)',
        'glow-emerald': '0 0 30px rgba(16, 185, 129, 0.18)',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.6, transform: 'scale(0.96)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float-slow 5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};
