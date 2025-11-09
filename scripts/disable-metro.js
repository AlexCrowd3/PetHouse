const fs = require("fs");
const path = require("path");

console.log("🔧 Disabling Metro in AppDelegate.swift...");

const appDelegate = path.join(__dirname, "../ios/Hikingprephelper/AppDelegate.swift");
let content = fs.readFileSync(appDelegate, "utf8");

content = content.replace(
  /RCTBundleURLProvider\.sharedSettings\(\)\.jsBundleURL.*;/,
  'Bundle.main.url(forResource: "main", withExtension: "jsbundle")!'
);

fs.writeFileSync(appDelegate, content, "utf8");

console.log("✅ Metro disabled. App will load main.jsbundle from bundle.");
