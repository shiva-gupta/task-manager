(function (window) {
  window.__env = window.__env || {};

  // Storage Type
  window.__env.storage = localStorage;

  // Whether or not to enable debug mode
  // Setting this to false will disable console output
  window.__env.enableDebug = true;
}(this));
