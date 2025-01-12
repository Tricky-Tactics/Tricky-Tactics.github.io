module.exports = {
  content: ['./layouts/**/*.html', './content/**/*.{md,html}'],
  theme: {
    extend: {
      colors: {
        primary_text: {
          light: '#081d2b',
          DEFAULT: '#02070a',
          dark: '#010304'
        },
        primary_background: {
          light: '#fbfdfe',
          DEFAULT: '#f5fafd',
          dark: '#ddeef8'
        },
        primary: {
          light: '#60b6e1',
          DEFAULT: '#39a6db',
          dark: '#2c8ab8'
        },
        secondary: {
          light: '#f4c2c5',    // Lighter pink
          DEFAULT: '#eb8e92',  // Your current default
          dark: '#e35f65'      // Darker pink
        },
        accent: {
          light: '#e8d178',    // Lighter yellow
          DEFAULT: '#e0c454',  // Your current default
          dark: '#c7ac3d'      // Darker yellow
        }
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: '100ch',
            color: theme('colors.primary_text.DEFAULT'),
            h1: {
              color: theme('colors.primary_text.DEFAULT'),
            },
            h2: {
              color: theme('colors.primary_text.DEFAULT'),
            },
            h3: {
              color: theme('colors.primary_text.DEFAULT'),
            },
            h4: {
              color: theme('colors.primary_text.DEFAULT'),
            }

          }
        }
      })
    },
  },
  plugins: [require("@tailwindcss/typography")],
}

