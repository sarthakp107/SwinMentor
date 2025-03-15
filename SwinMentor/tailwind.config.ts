import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF0000',  // Red
          dark: '#CC0000',
        }
      }
    },
  },
  plugins: [],
}

export default config 