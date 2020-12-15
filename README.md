# Web app to have an overview over all your sinamic drives

![printscreen](https://github.com/RV1989/sinamics-monitoring/blob/master/printscreens/printscreen.png)

Change config.js for the drives you want to monitor

```javascript
const drives = [
  { id: 1, name: "020-cc82010-Drive", ip: "10.10.252.70" },
  { id: 2, name: "021-cc82011-Drive", ip: "10.10.252.71" },
  ]
```

To build front-end 
```
npm run build
```

To run the app after you build the front-end.

```
node server
```

To change the parameter that are being read change the poll function in server.js
parameters can be found in sinamicsParameter.js.
```javascript
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
```
