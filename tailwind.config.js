/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0A2540', // Deep MNC navy (Stripe/corporate blue)
          accent: '#00D4B2', // Vibrant teal/blue accent
          blueLight: '#635BFF', // Tech primary blue
        },
        surface: {
          white: '#FFFFFF',
          off: '#F8F9FA', // Very clean gray
          grayBorder: '#E6E8EB',
        },
        text: {
          heading: '#0A2540',
          body: '#425466',
          muted: '#697386',
        },
      },
      fontFamily: {
        display: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      borderRadius: {
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        card: '0 2px 5px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07)',
        'btn-shadow': '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};
