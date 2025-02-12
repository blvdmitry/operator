const process = require("process");
const fs = require("fs-extra");
const { red, yellow } = require("chalk");
const yargs = require("yargs");
const {
  commentOnMergeRequest,
} = require("../../../../../tools/gitlab/comment-on-merge-request");

const commentTitle = "## Bundle Size Metrics";
const buildComment = (metrics) => {
  let comment = "";
  comment += `${commentTitle}\n`;
  comment +=
    "| Bundle | Size Before | Size After | Change | Change % | Gzip Size Before | Gzip Size After | Gzip Change | Gzip Change % |\n";
  comment += "| - | - | - | - | - | - | - | - | - |\n";
  Object.keys(metrics).forEach((bundleName) => {
    const {
      sizeBefore,
      sizeAfter,
      diff,
      diffPercent,
      gzSizeBefore,
      gzSizeAfter,
      gzDiff,
      gzDiffPercent,
    } = metrics[bundleName];
    comment += `| ${bundleName} | ${sizeBefore}kb | ${sizeAfter}kb | ${diff}kb | ${diffPercent}% | ${gzSizeBefore}kb | ${gzSizeAfter}kb | ${gzDiff}kb | ${gzDiffPercent}% |\n`;
  });

  return comment;
};

const argv = yargs
  .scriptName("bui-react-bundle-sizes-build")
  .options({
    "base-metrics": {
      describe:
        "Path to the file with the base bundle sizes to compare against.",
      demandOption: true,
      type: "string",
    },
    "current-metrics": {
      describe: "Path to the file with the current build's bundle sizes.",
      demandOption: true,
      type: "string",
    },
  })
  .help().argv;

const beforeMetricsPath = argv["base-metrics"];
const afterMetricsPath = argv["current-metrics"];

if (!fs.existsSync(beforeMetricsPath)) {
  console.error(red(`Could not find base metrics in '${beforeMetricsPath}'.`));
  process.exit(1);
}
if (!fs.existsSync(afterMetricsPath)) {
  console.error(
    red(`Could not find current metrics in '${afterMetricsPath}'.`)
  );
  process.exit(1);
}

const compareMetrics = async () => {
  const beforeMetricsRaw = fs.readFileSync(beforeMetricsPath);
  const beforeMetrics = JSON.parse(beforeMetricsRaw);

  // There is no BUI React job in the default branch because there was no change
  // that would affect BUI React. Therefore the beforeMetrics are not there.
  if (beforeMetrics?.message?.includes("404")) {
    console.warn(
      yellow(
        `Base metrics doesn't exist in the last successful pipeline. Skipping...`
      )
    );
    process.exit(0);
  }

  const afterMetricsRaw = fs.readFileSync(afterMetricsPath);
  const afterMetrics = JSON.parse(afterMetricsRaw);

  const formatKb = (n) => n.toFixed(2);

  const metrics = Object.keys(afterMetrics).reduce((acc, bundleName) => {
    if (!beforeMetrics[bundleName]) {
      console.warn(
        yellow(
          `${bundleName} is a new bundle that doesn't exist on the base branch`
        )
      );
      return acc;
    }

    const sizeBefore = formatKb(beforeMetrics[bundleName].size / 1024);
    const sizeAfter = formatKb(afterMetrics[bundleName].size / 1024);
    const diff = formatKb(sizeAfter - sizeBefore);
    const diffPercent = ((diff / sizeBefore) * 100).toFixed(2);

    const gzSizeBefore = formatKb(beforeMetrics[bundleName].gzipped / 1024);
    const gzSizeAfter = formatKb(afterMetrics[bundleName].gzipped / 1024);
    const gzDiff = formatKb(gzSizeAfter - gzSizeBefore);
    const gzDiffPercent = ((gzDiff / gzSizeBefore) * 100).toFixed(2);

    return {
      ...acc,
      [bundleName]: {
        sizeBefore,
        sizeAfter,
        diff,
        diffPercent,
        gzSizeBefore,
        gzSizeAfter,
        gzDiff,
        gzDiffPercent,
      },
    };
  }, {});

  const comment = buildComment(metrics);
  await commentOnMergeRequest(comment, commentTitle);
};

(async () => {
  try {
    compareMetrics();
  } catch (err) {
    if (err) console.error(red(err.stack || err.toString()));
    process.exit(1);
  }
})();
