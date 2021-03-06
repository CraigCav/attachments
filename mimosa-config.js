exports.config = {
  modules: [
    "copy",
    "stream-copy",
    "server",
    "live-reload",
    "require",
    "minify-js",
    "minify-css",
    "bower",
    "autoprefixer",
    "csslint",
    "jshint",
    "minify-svg",
    "minify-html",
    "minify-img",
    "web-package"
  ],
  copy: {
    extensions: ["manifest","js","css","png","jpg","jpeg","gif","html","eot","svg","ttf","woff","otf","yaml","kml","ico","htc","htm","json","txt","xml","xsd","map","md","mp4","mp3"]
  },
  server:{
    port: 3001,
    path: 'server.js'
  }
}