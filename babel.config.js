const path = require("path");

module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo",
      {
        runtime: "automatic"
      }
    ],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".android.js",
            ".android.tsx",
            ".ios.js",
            ".ios.tsx"
          ],
          root: ["./src"],
          alias: {
            "@": path.resolve(__dirname, "src")
          }
        }
      ]
    ]
  };
};
