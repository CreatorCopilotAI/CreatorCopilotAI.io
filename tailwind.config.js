/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#2563EB',
          indigo: '#4F46E5',
          violet: '#6D28D9',
          'blue-light': '#3B82F6',
        },
        surface: {
          white: '#FFFFFF',
          off: '#F8FAFC',
        },
        text: {
          heading: '#0F172A',
          body: '#475569',
          muted: '#94A3B8',
        },
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #2563EB 0%, #4F46E5 50%, #6D28D9 100%)',
        'brand-gradient-r': 'linear-gradient(to right, #2563EB, #6D28D9)',
        'hero-glow': 'radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        card: '0 4px 24px rgba(15, 23, 42, 0.06)',
        'card-hover': '0 8px 40px rgba(15, 23, 42, 0.12)',
        'btn-glow': '0 8px 25px rgba(37, 99, 235, 0.35)',
        'btn-glow-hover': '0 12px 35px rgba(37, 99, 235, 0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'typing': 'typing 3.5s steps(40) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};
