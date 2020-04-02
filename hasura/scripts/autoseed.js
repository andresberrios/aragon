// MEANT TO RUN INSIDE THE `automigrate` CONTAINER DEFINED IN `docker-compose.yml`

const fs = require("fs");

main().catch(e => {
  console.error(e);
  process.exit(1);
});

async function main() {
  if (!fs.existsSync("/state/seeded")) {
    const { main } = require("../seeds/index");
    await main();
    fs.writeFileSync("/state/seeded", "true");
    console.log("Database seeding successful.");
  } else {
    console.log("Database seeding already done.");
  }
  console.log("Enjoy!");
}
