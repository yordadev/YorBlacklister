("use strict");

const Cloudflare = require("./lib/Cloudflare.js");
const AddressPool = require("./lib/AddressPool.js");
const Redflag = require("./lib/Redflag.js");
const Investigator = require("./lib/Investigator.js");
const Config = require("./lib/Config.js");

async function run() {
  // initialize
  const conf = new Config();
  const dectivePikachu = new Investigator(conf.settings().file_path);
  const pool = new AddressPool();
  const cf = new Cloudflare(conf);

  // read in the log
  const contentArray = await dectivePikachu.readFile();

  // investigate pikachu.. investigate!
  for (let line = 0; line < contentArray.length; line++) {
    dectivePikachu.ipCountReset();

    if (conf.settings().codes.includes(contentArray[line].split(" ")[8])) {
      if (
        !(await dectivePikachu.investigatedAddress(
          contentArray[line].split(" ")[0]
        ))
      ) {
        dectivePikachu.addInvestigated(contentArray[line].split(" ")[0]);
      }

      for (
        let reversedLine = contentArray.length - 1;
        reversedLine > 0;
        reversedLine--
      ) {
        if (
          contentArray[line].split(" ")[0] ==
          contentArray[reversedLine].split(" ")[0]
        ) {
          dectivePikachu.ipFound();
        }
      }

      // is enough for redflag ser?
      if (dectivePikachu.ipCount() > conf.settings().limit) {
        // that'll do pikachu... that'll do.
        flagged = new Redflag({
          ip_address: contentArray[line].split(" ")[0],
          time: contentArray[line].replace("[", "").split(" ")[3],
          method: contentArray[line].split(" ")[5],
          query_path: contentArray[line].split(" ")[6],
          code: contentArray[line].split(" ")[8],
          body_bytes_sent: contentArray[line].split(" ")[9],
          referrer: contentArray[line].split(" ")[10],
          user_agent: await dectivePikachu.buildUserAgent(contentArray[line]),
        });

        pool.addFlag(flagged);

        pool.add(
          contentArray[line].split(" ")[0],
          "Blacklisted for execessive probing."
        );
      }
    }
  }

  const data = await pool.prepareForCloudflareUpdate();

  // update the blacklist on cloudflare
  cf.updateListItems(data).then((response) => console.log(response));
}

run();
