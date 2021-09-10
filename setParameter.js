const Sinamics = require("./sinamics");
const parameters = require("./sinamicsParameter");
const config = require("./configJasperStaging2");

// PLC Connection Settings
let drives = [];
let retryDrives = [];
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
        { ...parameters.motorModelErrorTherholdStallDetection },
        50.0
      );
      let writeResult8 = await drive.writeParameter(
        { ...parameters.changeMessageTypeMessage },
        7902
      );

      let writeResult9 = await drive.writeParameter(
        { ...parameters.changeMessageTypeType },
        2
      );
      console.log(writeResult);
      console.log(writeResult8);
      console.log(writeResult9);
      await drive.disconnect();
    } catch (error) {
      retryDrives.push(drive);
      console.log(`${drive.name} ${error}`);
    }
  }
  console.log("_________________Retry________________");
  for (const drive of retryDrives) {
    try {
      await drive.connect();
      let writeResult = await drive.writeParameter(
        { ...parameters.motorModelErrorTherholdStallDetection },
        50.0
      );
      let writeResult8 = await drive.writeParameter(
        { ...parameters.changeMessageTypeMessage },
        7902
      );

      let writeResult9 = await drive.writeParameter(
        { ...parameters.changeMessageTypeType },
        2
      );
      console.log(writeResult);
      console.log(writeResult8);
      console.log(writeResult9);
      await drive.disconnect();
    } catch (error) {
      console.log(`${drive.name} ${error}`);
    }
  }
};

main();
