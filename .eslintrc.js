module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['import'],
  settings: {
    'import/resolver': {
      'babel-module': {
        root: ['./src'],
        alias: {
          '@components': './src/Components',
          '@utils': './src/Utils',
          '@network': './src/Network',
          '@contexts': './src/Contexts',
        },
      },
    },
  },
  rules: {
    'import/no-unresolved': 'error',
  },
};
