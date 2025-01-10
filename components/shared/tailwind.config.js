module.exports = {
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            h1: {
              color: theme('colors.red.900'),
            },
            h2: {
              color: theme('colors.red.800'),
            },
            // Puedes personalizar más estilos aquí
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}