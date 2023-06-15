/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            type: {
                light: '#02262c',
                dark: '#f4f4f5',
                muted: '#8f8f8f',
            },
            surface: {
                light: '#ffffff',
                dark: '#02262c',
                // dark: '#181818',
                muted: '#f7f7f7',
            },
            primary: '#fba193',
            secondary: '#aee5d8',
            accent: '#fcc4bb',
        },
        extend: {},
    },
    plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
}
