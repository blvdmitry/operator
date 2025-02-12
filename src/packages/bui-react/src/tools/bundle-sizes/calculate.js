const process = require("process");
const fs = require("fs-extra");
const path = require("path");
const execa = require("execa");
const { red, yellow, green } = require("chalk");
const yargs = require("yargs");

const argv = yargs
  .scriptName("bui-react-bundle-sizes-build")
  .options({
    "bundles-dir": {
      describe: "Path to the bundles folder.",
      demandOption: true,
      type: "string",
    },
    "output-dir": {
      describe: "Path to folder where the output will be saved.",
      demandOption: true,
      type: "string",
    },
    "output-filename": {
      describe: "Name of the file where the output will be saved.",
      demandOption: true,
      type: "string",
    },
  })
  .help().argv;

const bundlesDir = argv["bundles-dir"];
const outputDir = argv["output-dir"];
const outputFilename = argv["output-filename"];

fs.mkdirSync(outputDir, { recursive: true });

if (!fs.existsSync(bundlesDir)) {
  console.error(red(`Could not find bundles in '${bundlesDir}'.`));
  process.exit(1);
}

const bundles = fs
  .readdirSync(bundlesDir)
  .filter((file) => /\.(css|js)$/.test(file));
if (!bundles.length) {
  console.warn(yellow(`No bundles to gzip in '${bundlesDir}'.`));
  process.exit(0);
}

const getSizes = async () => {
  const sizes = {};
  for (const bundle of bundles) {
    const sourcePath = path.join(bundlesDir, bundle);
    const sourceStats = fs.statSync(sourcePath);

    const gzippedSizeCommand = await execa.shell(
      `gzip -c ${sourcePath} | wc -c`
    );

    sizes[bundle] = {
      size: sourceStats.size,
      gzipped: +gzippedSizeCommand.stdout,
    };
  }
  return sizes;
};

const saveGitlabMetrics = (sizes) => {
  const outputPath = path.join(outputDir, outputFilename);
  fs.writeFileSync(outputPath, JSON.stringify(sizes, null, 2));
  console.log(green(`Metrics are saved to '${outputPath}'.`));
};

(async () => {
  try {
    const sizes = await getSizes();
    saveGitlabMetrics(sizes);
  } catch (err) {
    if (err) console.error(red(err.stack || err.toString()));
    process.exit(1);
  }
})();
