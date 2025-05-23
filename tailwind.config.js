/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#00112E',
          800: '#001A42',
          700: '#002356',
          600: '#00306E',
          500: '#003C87',
          400: '#0048A0',
          300: '#0054B9',
          200: '#0060D2',
          100: '#006CEB',
        },
        cream: {
          50: '#FFFDF9',
          100: '#FFF9F0',
          200: '#F9F5E9',
          300: '#F5F2E7',
          400: '#E8E3D3',
          500: '#D9D2BA',
          600: '#C0B69A',
          700: '#A29879',
          800: '#7F7556',
          900: '#5D5433',
        },
        gold: {
          900: '#604E10',
          800: '#7A6415',
          700: '#957A1A',
          600: '#B0901F',
          500: '#CBA624',
          400: '#D4AF37',
          300: '#DCBD58',
          200: '#E4CA7A',
          100: '#ECD89B',
          50: '#F4E6BD',
        },
        success: {
          100: '#DCFCE7',
          500: '#10B981',
          900: '#064E3B',
        },
        warning: {
          100: '#FEF3C7',
          500: '#F59E0B',
          900: '#78350F',
        },
        error: {
          100: '#FEE2E2',
          500: '#EF4444',
          900: '#7F1D1D',
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 16px rgba(0, 0, 0, 0.15)',
        'card-hover': '0 6px 24px rgba(0, 0, 0, 0.20)',
      },
      borderRadius: {
        card: '12px',
      },
    },
  },
  plugins: [],
};