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

const Polparam = () => {
  return [
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

let pollTimeout;
async function pollDrives() {
  for (const drive of drives) {
    try {
      let res = await drive.readParameters(Polparam());
      console.log(`${drive.plcSettings.name} updated ${res.length} parameters`);
    } catch (err) {
      console.error(
        `Error ${drive.plcSettings.name} readDrives: ${err} retry in 10s`
      );
    }
  }

  pollTimeout = setTimeout(pollDrives, 30 * 1000);
}

// function to stop polling
function stopPollDB() {
  clearTimeout(pollTimeout);
}

(async function() {
  for (const drive of drives) {
    try {
      await drive.connect();
      console.log(`connected to: ${drive.plcSettings.name}`);
    } catch (error) {
      console.log(`could not connect to: ${drive.plcSettings.name} ${error}`);
    }
  }

  pollDrives();
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
