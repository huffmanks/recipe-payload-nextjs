/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        colors: {
            'main-dark': '#0d1116',
            'main-light': '#dbdfe2',
            'gray-dark': '#20262f',
            'gray-light': '#1f2329',
            'primary-dark': '#15202e',
            'primary-light': '#608cbd',
            'alt-dark': '#258637',
            'alt-light': '#b5edc5',
        },
        extend: {},
    },
    plugins: [],
}
