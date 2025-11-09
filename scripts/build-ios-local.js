const { execSync } = require("child_process");

console.log("🏗️ Building standalone iOS project...");

try {
  execSync("node scripts/create-rn-bundle.js", { stdio: "inherit" });
  execSync("node scripts/disable-metro.js", { stdio: "inherit" });

  execSync("cd ios && pod install --repo-update && cd ..", { stdio: "inherit" });

  execSync(
    "xcodebuild clean -workspace ios/Hikingprephelper.xcworkspace -scheme Hikingprephelper",
    { stdio: "inherit" }
  );

  execSync(
    "xcodebuild -workspace ios/Hikingprephelper.xcworkspace -scheme Hikingprephelper -configuration Release -destination 'generic/platform=iOS'",
    { stdio: "inherit" }
  );

  console.log("✅ iOS build finished successfully!");
} catch (err) {
  console.error("❌ Build failed:", err.message);
  process.exit(1);
}
