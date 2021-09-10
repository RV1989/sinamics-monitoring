const Sinamics = require("./sinamics");
const parameters = require("./sinamicsParameter");
const config = require("./config15BDF");

// PLC Connection Settings
let drives = [];
let retryDrives = [];
for (const drive of config) {
  drives.push(new Sinamics(drive));
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const writeParameters = async (drive) => {
  await drive.connect();
  let writeResult = await drive.writeParameter(
    { ...parameters.currentLimit },
    6.2
  );

  let writeResult1 = await drive.writeParameter(
    { ...parameters.torqueLimitUpper },
    12
  );

  let writeResult2 = await drive.writeParameter(
    { ...parameters.torqueLimitLower },
    -12
  );

  let writeResult3 = await drive.writeParameter(
    { ...parameters.powerLimitMotoring },
    2.25
  );

  let writeResult4 = await drive.writeParameter(
    { ...parameters.powerLimitRegenerative },
    -0.56
  );

  let writeResult5 = await drive.writeParameter(
    { ...parameters.torqueSetpointStatic },
    75.0
  );

  let writeResult6 = await drive.writeParameter(
    { ...parameters.additionalAccelartionTorque },
    50.0
  );

  let writeResult7 = await drive.writeParameter(
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

  console.log(writeResult1);

  console.log(writeResult2);

  console.log(writeResult3);

  console.log(writeResult4);

  console.log(writeResult5);

  console.log(writeResult6);

  console.log(writeResult7);

  console.log(writeResult8);

  console.log(writeResult9);

  return await drive.disconnect();
};

const main = async () => {
  for (const drive of drives) {
    try {
      await writeParameters(drive);
    } catch (error) {
      retryDrives.push(drive);
      console.log(`${drive.name} ${error}`);
    }
  }
  console.log("_________________Retry________________");
  for (const drive of retryDrives) {
    try {
      await writeParameters(drive);
    } catch (error) {
      console.log(`${drive.name} ${error}`);
    }
  }
};

main();
