import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1853CF',
          hover: '#1446B0',
          tint: '#E8F0FE',
          dark: '#10398F',
        },
        brand: {
          bg: '#FBFBF7',
          surface: '#FFFFFF',
          navy: '#0B1B3A',
          muted: '#5B6577',
          border: '#E3E5DD',
        },
        status: {
          success: '#16A34A',
          warning: '#F59E0B',
          danger: '#DC2626',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Plus Jakarta Sans', 'Sora', 'sans-serif'],
        sans: ['var(--font-body)', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        'agency': '14px',
        'agency-lg': '18px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(11, 27, 58, 0.05), 0 2px 6px -1px rgba(11, 27, 58, 0.03)',
        'soft-hover': '0 12px 30px -4px rgba(31, 95, 230, 0.12), 0 4px 12px -2px rgba(11, 27, 58, 0.06)',
        'glow': '0 0 25px rgba(31, 95, 230, 0.25)',
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(#E3E5DD 1px, transparent 1px)",
        'hero-gradient': 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(31, 95, 230, 0.15), rgba(251, 251, 247, 0))',
      },
    },
  },
  plugins: [],
};
export default config;
