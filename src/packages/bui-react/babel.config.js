// Used by Jest to transform node_modules packages
module.exports = {
  presets: [["@babel/preset-env", { targets: { node: "current" } }]],
};
