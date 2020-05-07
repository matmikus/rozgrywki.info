module.exports = {
    testRunner: "jest",
    mutator: "typescript",
    packageManager: "npm",
    reporters: ["clear-text", "progress"],
    coverageAnalysis: "off",
    tsconfigFile: "tsconfig.json",
    mutate: ["**/*.ts", "**/*.vue"],
    jest: {
      config: require('./jest.config.js')
    }
};