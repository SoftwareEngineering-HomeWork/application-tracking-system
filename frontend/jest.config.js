module.exports = {

    roots: ['<rootDir>/src'],
  
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  
    testEnvironment: 'jsdom',
  
    collectCoverageFrom: [
      'src/**/*.{js,jsx}',
      '!src/index.js',
      '!src/reportWebVitals.js',
    ],
  
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
  
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/__mocks__/fileMock.js',
    },
  };