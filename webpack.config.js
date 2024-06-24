const path = require('path');

module.exports = {
  // Other webpack configuration options...

  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      // Add other necessary polyfills here based on your application needs
    },
  },
};
