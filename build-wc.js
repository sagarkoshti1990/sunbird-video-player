const fs = require("fs-extra");
const concat = require("concat");

const build = async () => {
  const files = [
    "./dist/video-player-wc/runtime.js",
    "./dist/video-player-wc/polyfills.js",
    "./dist/video-player-wc/scripts.js",
    "./dist/video-player-wc/vendor.js",
    "./dist/video-player-wc/main.js",
    "projects/sunbird-video-player/src/lib/assets/videojs-markers.js",
    "projects/sunbird-video-player/src/lib/assets/videojs-transcript-click.min.js"
  ];
  const cssFiles = [
    "./dist/video-player-wc/styles.css",
    "projects/sunbird-video-player/src/lib/assets/videojs.markers.min.css",
  ];
  await fs.ensureDir("dist/video-player-wc");
  // make signle js file for web component
  await concat(files, "web-component/sunbird-video-player.js");
  const assetFilesToBeDeleted = ["videojs-markers.js", "videojs-transcript-click.min.js", "videojs.markers.min.css"]

  assetFilesToBeDeleted.forEach(async (file) => {
    await fs.remove(`web-component/assets/${file}`)
    await fs.remove(`web-component-demo/assets/${file}`)
  })
  await fs.copy("README.md", "web-component/README.md")

  // make signle css file for web component
  await concat(cssFiles, "web-component/styles.css");
  console.log("Files concatenated successfully!!!");
};
build();
