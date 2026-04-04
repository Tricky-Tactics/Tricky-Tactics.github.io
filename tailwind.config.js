module.exports = {
    content: ['./layouts/**/*.html', './content/**/*.{md,html}'],
    theme: {
        extend: {
            colors: {
                background: {
                    light: '#ffffff',
                    DEFAULT: '#e6e6e6',
                    dark: '#c0c0c0',
                },
                on_everything: {
                    light: '#2d2d2d',
                    DEFAULT: '#0f0f0f',
                    dark: '#000000',
                },
                primary: {
                    light: '#659cf6',
                    DEFAULT: '#3b82f6',
                    dark: '#1f6ae2'
                },
                secondary: {
                    light: '#f4c2c5',
                    DEFAULT: '#eb8e92',
                    dark: '#e35f65'
                },
                accent: {
                    light: '#e8d178',
                    DEFAULT: '#e0c454',
                    dark: '#c7ac3d'
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

