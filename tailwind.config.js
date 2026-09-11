/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0f131d',
          dim: '#0f131d',
          bright: '#353944',
          lowest: '#0a0e18',
          low: '#171b26',
          container: '#1c1f2a',
          high: '#262a35',
          highest: '#313540',
          variant: '#313540',
        },
        'on-surface': {
          DEFAULT: '#dfe2f1',
          variant: '#bfc7d2',
        },
        'inverse-surface': '#dfe2f1',
        'inverse-on-surface': '#2c303b',
        outline: {
          DEFAULT: '#89929b',
          variant: '#3f4850',
          subtle: '#334155',
        },
        primary: {
          DEFAULT: '#93ccff',
          electric: '#0284c7',
          container: '#3198dc',
          fixed: '#cce5ff',
          'fixed-dim': '#93ccff',
          inverse: '#006398',
        },
        'on-primary': {
          DEFAULT: '#003351',
          container: '#002c47',
          fixed: '#001d31',
          'fixed-variant': '#004b73',
        },
        secondary: {
          DEFAULT: '#4edea3',
          emerald: '#10b981',
          container: '#00a572',
          fixed: '#6ffbbe',
          'fixed-dim': '#4edea3',
        },
        'on-secondary': {
          DEFAULT: '#003824',
          container: '#00311f',
          fixed: '#002113',
          'fixed-variant': '#005236',
        },
        tertiary: {
          DEFAULT: '#c0c1ff',
          indigo: '#6366f1',
          container: '#8083ff',
          fixed: '#e1e0ff',
          'fixed-dim': '#c0c1ff',
        },
        'on-tertiary': {
          DEFAULT: '#1000a9',
          container: '#0d0096',
          fixed: '#07006c',
          'fixed-variant': '#2f2ebe',
        },
        error: {
          DEFAULT: '#ffb4ab',
          container: '#93000a',
        },
        'on-error': {
          DEFAULT: '#690005',
          container: '#ffdad6',
        },
        background: '#0f131d',
        'on-background': '#dfe2f1',
        
        canvas: '#0b0f19',
        layer1: '#111827',
        layer2: '#1e293b',
        terminal: '#070a10',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        '2xl': '1.5rem',
        xl: '1rem',
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.25rem',
      },
      boxShadow: {
        'glow-primary': '0 0 0 1px #0284c7, 0 4px 20px -2px rgba(2, 132, 199, 0.35)',
        'glow-secondary': '0 0 0 1px #10b981, 0 4px 20px -2px rgba(16, 185, 129, 0.35)',
        'glow-tertiary': '0 0 0 1px #6366f1, 0 4px 20px -2px rgba(99, 102, 241, 0.35)',
        'surface-card': '0 8px 24px -4px rgba(0, 0, 0, 0.45)',
      }
    },
  },
  plugins: [],
}
