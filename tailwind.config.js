/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'datako-blue': '#3B82F6',
        'datako-navy': '#1E3A5F',
        surface: '#0F1117',
        'surface-2': '#181C27',
        'surface-3': '#1F2537',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
