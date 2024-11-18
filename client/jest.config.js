module.exports = {
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest', // Transpile JavaScript and JSX files
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    testEnvironment: 'jsdom', // Mimic browser environment for React components
};
  