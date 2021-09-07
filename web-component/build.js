const fs = require("fs-extra");
const concat = require("concat");

build = async () => {
  const files = [
    "./dist/video-player-wc/runtime.js",
    "./dist/video-player-wc/polyfills-es5.js",
    "./dist/video-player-wc/polyfills.js",
    "./dist/video-player-wc/scripts.js",
    "./dist/video-player-wc/styles.js",
    "./dist/video-player-wc/vendor.js",
    "./dist/video-player-wc/main.js",
  ];

  await fs.ensureDir("dist/video-player-wc");
  await concat(files, "dist/video-player-wc/sunbird-video-player.js");
  console.log("Files concatenated successfully!!!");
};
build();
