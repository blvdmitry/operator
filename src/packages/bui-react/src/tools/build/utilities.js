const fs = require("fs-extra");
const readline = require("readline");
const { green, cyan } = require("chalk");

const clean = async (dir) => fs.existsSync(dir) && fs.remove(dir);

const log = (text) => {
  process.stdout.write(text);

  return (t) => {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(t);
    process.stdout.write("\n");
  };
};

const step = (name, fn) => async () => {
  const endLog = log(`⏱️  ${cyan("Started: ")}${green(name)}`);
  await fn();
  endLog(`🌟 ${cyan("Finished: ")}${green(name)}`);
};

module.exports = { log, step, clean };
