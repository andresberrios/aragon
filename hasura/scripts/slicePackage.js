const fs = require("fs");

const pkg = require(__dirname + "/../package.json");
const pkgLock = require(__dirname + "/../package-lock.json");

delete pkg.dependencies;
pkgLock.dependencies = { "hasura-cli": pkgLock.dependencies["hasura-cli"] };

fs.writeFileSync(`${process.argv[2]}/package.json`, JSON.stringify(pkg));
fs.writeFileSync(
  `${process.argv[2]}/package-lock.json`,
  JSON.stringify(pkgLock)
);
