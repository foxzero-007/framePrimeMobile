module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    require('./dist/plugin/cssStyleTranslate.js').default
  ]
};
