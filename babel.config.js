module.exports = function (api) {
  api.cache(true);
  const plugins = ['react-native-reanimated/plugin']; //react-native-reanimated/plugin need to be listed last

  return {
    presets: ['babel-preset-expo'],

    plugins,
  };
};
