const Sinamics = require("./sinamics");
const parameters = require("./sinamicsParameter");
const config = require("./config");

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
        { ...parameters.startingCurrentVoltageBoostPermanent },
        50.0
      );
      let writeResult1 = await drive.writeParameter(
        { ...parameters.startingCurrentVoltageBoostWhenStarting },
        0.0
      );
      let writeResult2 = await drive.writeParameter(
        { ...parameters.startingCurrentVoltageBoostWhenAccelerating },
        0.0
      );
      console.log(writeResult);
      console.log(writeResult1);
      console.log(writeResult2);
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
        { ...parameters.startingCurrentVoltageBoostPermanent },
        50.0
      );
      let writeResult1 = await drive.writeParameter(
        { ...parameters.startingCurrentVoltageBoostWhenStarting },
        0.0
      );
      let writeResult2 = await drive.writeParameter(
        { ...parameters.startingCurrentVoltageBoostWhenAccelerating },
        0.0
      );
      console.log(writeResult);
      console.log(writeResult1);
      console.log(writeResult2);
      await drive.disconnect();
    } catch (error) {
      console.log(`${drive.name} ${error}`);
    }
  }
};

main();
