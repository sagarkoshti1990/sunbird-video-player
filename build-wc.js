const fs = require("fs-extra");
const concat = require("concat");

const build = async () => {
  const files = [
    "./dist/video-player-wc/runtime.js",
    "./dist/video-player-wc/polyfills.js",
    "./dist/video-player-wc/scripts.js",
    "./dist/video-player-wc/vendor.js",
    "./dist/video-player-wc/main.js",
    "web-component/assets/videojs-markers.js",
    "web-component/assets/videojs-transcript-click.min.js",
  ];
  const cssFiles = [
    "./dist/video-player-wc/styles.css",
    "web-component/assets/videojs.markers.min.css",
  ];
  await fs.ensureDir("dist/video-player-wc");
  // make signle js file for web component
  await concat(files, "web-component/sunbird-video-player.js");
  await fs.copy("./dist/video-player-wc/assets", "web-component/assets");
  // make signle css file for web component
  await concat(cssFiles, "web-component/styles.css");
  console.log("Files concatenated successfully!!!");
};
build();
