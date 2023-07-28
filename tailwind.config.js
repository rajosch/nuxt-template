/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  theme: {
      extend: {

        "backgroundColor": {
          "primary": "#00b8ff",
          "secondary": "#001eff",
          "primary-dark": "#005266",
          "secondary-dark": "#000099"
        },
        "textColor": {
            "primary": "#00b8ff",
            "secondary": "#001eff"
        },
        "gradientColorStops": {
            "primary-start": "#00b8ff",
            "primary-end": "#bd00ff",
            "primary-start-dark": "#005266",
            "primary-end-dark": "#600080"
        }
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