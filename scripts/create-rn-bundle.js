const { execSync } = require("child_process");

console.log("📦 Bundling iOS React Native app...");

execSync(
  "npx react-native bundle --platform ios --dev false --entry-file index.js --bundle-output ios/main.jsbundle --assets-dest ios",
  { stdio: "inherit" }
);

console.log("✅ Bundle created successfully!");
