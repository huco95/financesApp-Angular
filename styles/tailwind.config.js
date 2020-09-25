module.exports = {
  purge: {
    enabled: false,
    content: [
      './src/index.html',
      './src/main.ts',
      './src/**/*.html',
      './src/**/*.ts',
    ],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
