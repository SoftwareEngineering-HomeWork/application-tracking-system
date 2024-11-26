module.exports = {
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./src/setupTests.js'],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(scss|sass|css)$": "identity-obj-proxy"
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/index.js",
    "!src/**/*.test.{js,jsx}",
  ],
  coverageReporters: ["json", "lcov", "text", "clover"],
};  