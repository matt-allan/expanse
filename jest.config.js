module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/out/"],
  setupFilesAfterEnv: ["<rootDir>src/setup_tests.ts"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
};
