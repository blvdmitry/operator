const fs = require("fs-extra");
const path = require("path");
const { red } = require("chalk");
const execa = require("execa");
const { step, clean } = require("./utilities");
const rootPath = path.join(__dirname, "../../..");
const distPath = path.resolve(rootPath, "dist");
const srcPath = path.resolve(rootPath, "src");

const webpackProdPath = path.join(__dirname, "webpack.config.production.js");
const foundryRoot = path.join(srcPath, "tools/foundry");
const esmDist = distPath;

const cleanDist = step("Clean dist", async () => {
  const dir = path.join(rootPath, "dist");
  await clean(dir);
});

const buildBundles = step("Building webpack bundles", async () => {
  await execa.shell(`NODE_ENV=production webpack --config ${webpackProdPath}`);
});

const buildESM = step("Compiling to ESM", async () => {
  await execa.shell(
    `tsc --outDir ${esmDist} -p tsconfig.build.json && resolve-tspaths`
  );
});

const moveAssets = step("Moving components assets", async () => {
  await execa.shell(
    'rsync src/* dist/ --exclude="*.tsx" --exclude="*.ts" --exclude="*.js" --exclude="*.css"'
  );

  // Foundry assets
  const foundryDirs = fs.readdirSync(foundryRoot);

  for (let i = 0; i < foundryDirs.length; i += 1) {
    const name = foundryDirs[i];
    const packagePath = path.join(foundryRoot, `${name}`);
    const isDirectory = fs.lstatSync(packagePath).isDirectory();

    if (!isDirectory) continue;

    await execa.shell(`mkdir -p dist/tools/foundry/${name}`);
    await execa.shell(
      `rsync ${packagePath}/ dist/tools/foundry/${name}/ --exclude=*.tsx --exclude=*.ts`
    );
  }
});

(async () => {
  try {
    await cleanDist();
    await buildBundles();
    await buildESM();
    await moveAssets();
  } catch (err) {
    if (err) console.error(red(err.stack || err.toString()));
    process.exit(1);
  }
})();
