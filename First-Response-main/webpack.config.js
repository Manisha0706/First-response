const path = require('path')

module.exports = {
  mode: 'development',
  entry: { 
  index: './src/index.js',
  cont_ems: './src/cont_ems.js',
  call_fa: './src/call_fa.js',
  fa_tips: './src/fa_tips.js',
  ca: './src/ca.js',
  login: './src/login.js',
  profile: './src/profile.js',
},
  output: {
    path: path.resolve(__dirname, 'src/bundle'),
    filename: '[name].bundle.js'
  },
  watch: true,
  resolve: {
    alias: {
      'firebase/app': path.resolve(__dirname, 'node_modules/@firebase/app'),
      'firebase/firestore': path.resolve(__dirname, 'node_modules/@firebase/firestore'),
      // add more aliases for other Firebase modules if needed
    },
    extensions: ['.js'],
  },
};