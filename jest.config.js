module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest.setup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-clone-referenced-element|@react-native-community|react-native-reanimated|react-native-worklets|react-native-toast-message|react-native-gesture-handler|react-native-reanimated-carousel)/)',
  ],
  moduleNameMapper: {
    '^@env$': '<rootDir>/__mocks__/env.js',
    '^@components/(.*)$': '<rootDir>/src/Components/$1',
    '^@utils/(.*)$': '<rootDir>/src/Utils/$1',
    '^@network/(.*)$': '<rootDir>/src/Network/$1',
    '^@contexts/(.*)$': '<rootDir>/src/Contexts/$1',
    '^@screens/(.*)$': '<rootDir>/src/Screens/$1',
  },
};
