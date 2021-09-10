const Sinamics = require("./sinamics");
const parameters = require("./sinamicsParameter");
const config = require("./configjasperStaging2");

// PLC Connection Settings
let drives = [];
for (const drive of config) {
  drives.push(new Sinamics(drive));
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const main = async () => {
  for (const drive of drives) {
    try {
      await drive.connect();
      let writeResult = await drive.writeParameter(
        { ...parameters.motorDataIdent },
        2
      );
      console.log(writeResult);
      await drive.disconnect();
    } catch (error) {
      console.log(error);
    }
  }
};

main();
