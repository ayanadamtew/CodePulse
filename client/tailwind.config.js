/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#050816',
          surface: '#0d1117',
          card: '#161b27',
          indigo: '#6366f1',
          violet: '#8b5cf6',
          cyan: '#22d3ee',
        }
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        'gradient-hero': 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%)',
        'gradient-card': 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.05))',
      },
      keyframes: {
        float1: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)', opacity: '0.3' },
          '50%': { transform: 'translateY(-30px) translateX(15px) rotate(10deg)', opacity: '0.5' },
        },
        float2: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)', opacity: '0.2' },
          '50%': { transform: 'translateY(25px) translateX(-20px) rotate(-8deg)', opacity: '0.4' },
        },
        float3: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)', opacity: '0.1' },
          '50%': { transform: 'translateY(-20px) translateX(25px) rotate(5deg)', opacity: '0.25' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 8px 2px rgba(99,102,241,0.3)' },
          '50%': { boxShadow: '0 0 24px 6px rgba(139,92,246,0.5)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'count-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'float-1': 'float1 15s ease-in-out infinite',
        'float-2': 'float2 20s ease-in-out infinite',
        'float-3': 'float3 25s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'gradient-shift': 'gradient-shift 6s ease infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.glass': {
          background: 'rgba(22, 27, 39, 0.6)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        },
        '.glass-hover': {
          '&:hover': {
            background: 'rgba(22, 27, 39, 0.85)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
          }
        },
        '.glow-indigo': {
          boxShadow: '0 0 20px rgba(99,102,241,0.4)',
        },
        '.glow-cyan': {
          boxShadow: '0 0 20px rgba(34,211,238,0.4)',
        },
        '.text-glow': {
          textShadow: '0 0 30px rgba(99,102,241,0.5)',
        },
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        },
        '.preserve-3d': {
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
        },
      })
    }
  ],
};
