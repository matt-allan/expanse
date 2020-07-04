module.exports = {
  preset: "ts-jest",
  testPathIgnorePatterns: ["/node_modules/", "/out/"],
  setupFilesAfterEnv: ["<rootDir>src/setup_tests.ts"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
};
