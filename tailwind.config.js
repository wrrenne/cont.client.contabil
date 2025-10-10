/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const rotateX = plugin(function ({ addUtilities }) {
    addUtilities({
        '.rotate-y-180': {
            transform: 'rotateY(180deg)',
        },
    });
});
module.exports = {
    content: ['./src/**/*.{html,ts}'],
    darkMode: 'class',
    theme: {
        container: {
            center: true,
        },
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#4361ee',
                    light: '#d8e2f7',
                    'dark-light': 'rgba(67,97,238,.15)',
                },
                secondary: {
                    DEFAULT: '#805dca',
                    light: '#ebe4f7',
                    'dark-light': 'rgb(128 93 202 / 15%)',
                },
                success: {
                    DEFAULT: '#00ab55',
                    light: '#d5f9f1',
                    'dark-light': 'rgba(0,171,85,.15)',
                },
                danger: {
                    DEFAULT: '#e7515a',
                    light: '#f9e5e5',
                    'dark-light': 'rgba(231,81,90,.15)',
                },
                warning: {
                    DEFAULT: '#e2a03f',
                    light: '#fff1d4',
                    'dark-light': 'rgba(226,160,63,.15)',
                },
                info: {
                    DEFAULT: '#2196f3',
                    light: '#dcf3ff',
                    'dark-light': 'rgba(33,150,243,.15)',
                },
                dark: {
                    DEFAULT: '#3b3f5c',
                    light: '#eaeaec',
                    'dark-light': 'rgba(59,63,92,.15)',
                },
                black: {
                    DEFAULT: '#090909',
                    light: '#e3e4eb',
                    'dark-light': 'rgba(14,23,38,.15)',
                },
                //black: {
                //    DEFAULT: '#0e1726',
                //    light: '#e3e4eb',
                //    'dark-light': 'rgba(14,23,38,.15)',
                //},
                white: {
                    DEFAULT: '#ffffff',
                    light: '#e0e6ed',
                    dark: '#888ea8',
                },
                silver: {
                    DEFAULT: '#909090',
                    light: '#efefef',
                    dark: '#a0a0a0',
                    'dark-light': '#303030'
                },
                panelbackgroundcolorLight: '#ffffff',
                panelbackgroundcolorDark: '#161616',
                bordercolor: {
                    DEFAULT: '#d0d0d0',
                    dark: '#a0a0a0',
                },
            },
            fontFamily: {
                nunito: ['Nunito', 'sans-serif'],
            },
            spacing: {
                4.5: '18px',
            },
            width: {
                144: '36rem',
            },
            boxShadow: {
                '3xl': '0 2px 2px rgb(224 230 237 / 46%), 1px 6px 7px rgb(224 230 237 / 46%)',
                'autofillWhite': '0 0 0 30px #ffffff inset !important', // backgroundInputWhite
                'autofillBlack': '0 0 0 30px #09090b inset !important', // backgroundInputBlack
            },
            typography: ({ theme }) => ({
                DEFAULT: {
                    css: {
                        '--tw-prose-invert-headings': theme('colors.white.dark'),
                        '--tw-prose-invert-links': theme('colors.white.dark'),
                        h1: {
                            fontSize: '40px',
                            marginBottom: '0.5rem',
                            marginTop: 0,
                        },
                        h2: {
                            fontSize: '32px',
                            marginBottom: '0.5rem',
                            marginTop: 0,
                        },
                        h3: {
                            fontSize: '28px',
                            marginBottom: '0.5rem',
                            marginTop: 0,
                        },
                        h4: {
                            fontSize: '24px',
                            marginBottom: '0.5rem',
                            marginTop: 0,
                        },
                        h5: {
                            fontSize: '20px',
                            marginBottom: '0.5rem',
                            marginTop: 0,
                        },
                        h6: {
                            fontSize: '16px',
                            marginBottom: '0.5rem',
                            marginTop: 0,
                        },
                        p: { marginBottom: '0.5rem' },
                        li: { margin: 0 },
                        img: { margin: 0 },
                    },
                },
            }),
        },
    },
    plugins: [
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
        require('@tailwindcss/typography'),
        rotateX,
        function ({ addVariant }) {
            addVariant('autofill', '&:-webkit-autofill'); // Chrome
            addVariant('autofill-moz', '&:-moz-autofill'); // Firefox
        }
    ],
};
