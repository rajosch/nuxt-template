/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    theme: {
        extend: {
        fontFamily: {
            sans:['PP FRAKTION SANS', 'sans-serif'],
            },
            fontFamily: {
            sans:['SANS BOLD', 'sans-serif'],
            },
            fontFamily: {
                sans:['SANS LIGHT', 'sans-serif'],
                },
        fontWeight: {
            thin: 100,
            light: 300,
            normal: 400,
            bold: 700,
        },
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
        boxShadow: {
            'glow': '0 0 400px #00ff00', // change color and size as needed
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