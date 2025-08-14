/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../shared/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'navbar-background': 'var(--navbar-background)',
        'footer-background': 'var(--footer-background)',
      }
    },
  },
  plugins: [],
  // Optimisations de performance
  corePlugins: {
    container: false, // Non utilisé dans ton projet
    accessibility: false, // Optimisation si pas besoin
  },
  // Cache et optimisations
  future: {
    hoverOnlyWhenSupported: true,
  },
}
