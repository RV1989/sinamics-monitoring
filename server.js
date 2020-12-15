const Sinamics = require("./sinamics");
const parameters = require("./sinamicsParameter");
const express = require("express");
const path = require("path");
const config = require("./config");
const app = express();
app.use(express.static(path.join(__dirname, "build")));
const port = 8080;

// PLC Connection Settings
let drives = [];
for (const drive of config) {
  drives.push(new Sinamics(drive));
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Polparam = () => {
  return [
    { ...parameters.firmwareVersion },
    { ...parameters.driveOperationDisplay },
    { ...parameters.safelyRemoveMemoryCardStatus },
    { ...parameters.dcLinkVoltageSmoothed },
    { ...parameters.absoluteActualCurrentSmoothed },
    { ...parameters.energyBalanceSum },
    { ...parameters.energyDrown },
    { ...parameters.energyFedBack },
    { ...parameters.energyConsumptionSaved },
    { ...parameters.controlUnitTemperature },
    { ...parameters.motorTemperature },
  ];
};

async function pollDrive(drive) {
  return new Promise(async (resolve, reject) => {
    try {
      await drive.connect();
      await drive.readParameters(Polparam());
      await drive.disconnect();
      resolve(`updated: ${drive.plcSettings.name}`);
    } catch (error) {
      reject(error);
    }
  });
}

// function to stop polling

(async function() {
  while (true) {
    for (const drive of drives) {
      try {
        let polResult = await pollDrive(drive);
        console.log(polResult);
        await sleep(100);
      } catch (error) {
        console.log(`${drive.plcSettings.name} error: ${error}`);
      }
    }
    await sleep(10000);
  }
})();

app.get("/api", (req, res) => {
  res.send(JSON.stringify(drives.map((d) => d.driveInfo())));
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
