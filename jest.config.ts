module.exports = {
  preset: "ts-jest/presets/js-with-ts", // Use the preset for TypeScript and ESModules
  testEnvironment: "jsdom", // Use jsdom for testing React components
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Transform TypeScript files
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  moduleNameMapper: {
    // If necessary, map paths to handle imports properly
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
