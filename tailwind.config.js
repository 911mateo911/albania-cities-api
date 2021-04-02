module.exports = {
  purge: {enabled: true, content: ["./index.html"]},
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      '2xl': {'max': '1535px'},
      'xl': {'max': '1279px'},
      'lg': {'max': '1023px'},
      'md': {'max': '767px'},
      'sm': {'max': '639px'}
    },
    fontFamily: {
      'open-sans': ['"Open Sans"'],
      'cabin': ['cabin']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
