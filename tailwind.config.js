/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    theme: {
        extend: {
            backgroundColor: {
                'primary': '#00b8ff',
                'secondary': '#001eff',
            },
            textColor: {
                'primary': '#00b8ff',
                'secondary': '#001eff',
            },
            gradientColorStops: {
                'primary-start': '#00b8ff',
                'primary-end': '#bd00ff',
            },
        },
    },
    variants: {
        extend: {
        backgroundColor: ['dark'],
        textColor: ['dark'],
        },
    },
    plugins: [],
}