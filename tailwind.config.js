/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./core/templates/**/*.html",
    "./services/templates/**/*.html",
    "./core/static/**/*.js",
    "./services/static/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#1e40af',
        'brand-yellow': '#fbbf24',
        'brand-black': '#000000',
        'brand-white': '#ffffff',
        'brand-magenta': '#ff00ff',  // Magenta color
        'brand-orange': '#ff7f00',   // Optional: custom orange color
        'brand-gray': '#1f2937',     // Custom gray color
        'light-gray': '#d3d3d3',     // Light gray color
        'mid-light-gray': '#c0c0c0', // Slightly darker than light gray
        'mid-gray': '#a9a9a9',       // A bit darker than mid-light gray

        // Additional colors for your theme
        'blanc-casse': '#f8f8f2',    // Off-white color for sidebar background
        'charcoal': '#333333',       // Dark charcoal for text
        'gold': '#FFD700',           // Gold for accents
        'brand-primary-dark': '#1a202c', // Darker primary color for buttons
      },
      backgroundImage: {
        // Gradient for primary background
        'printhub-gradient': 'linear-gradient(135deg, #ff00ff 0%, #fbbf24 40%, #fbbf24 60%, #ff00ff 100%)',

        // Secondary gradient for hover effects or additional elements
        'printhub-gradient2': 'linear-gradient(135deg, #ff00ff 0%, #fbbf24 50%, #ff00ff 100%)',
      },
    },
  },
  plugins: [],
}
