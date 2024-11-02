module.exports = {
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testEnvironment: 'jsdom'
}; 