
const tokenExtension = require('./tokens/tokens.json');

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
 theme: {  
    extend: {
      ...(tokenExtension?.theme?.extend || {}),
      // colors: {
      //   background: 'var(--background-color)',
      //   text: 'var(--text-color)',
      //   primary: 'var(--primary-color)'
      // }
    }
  },

  plugins: []
};
