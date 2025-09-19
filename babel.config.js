module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ["module:react-native-dotenv", {
      "moduleName": "@env",
      "path": ".env",
      "safe": false,
      "allowUndefined": true
    }],
    [
      'module-resolver',
      {
        root: ['./src'], // Adjust if your source code is in a different directory
        alias: {
          '@components': './src/Components',
          '@utils': './src/Utils',
          // Add more aliases as needed
        },
      },
    ],
    'react-native-worklets/plugin',
  ]
};
