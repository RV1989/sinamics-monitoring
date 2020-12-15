/*
Parameter config for simatic drives
*/

const driveOperationDisplay = {
  name: `r2 driveOperationDisplay`,
  type: "INT",
  start: 0,
  area: "db",
  dbnr: 2,
  formatValue: (value) => {
    switch (value) {
      case 0:
        return `Operation - everything enabled`;
      case 10:
        return `Operation - set "enable setpoint" = "1" (p1142, p1152)`;
      case 11:
        return `Operation - set "enable speed controller" = "1" (p0856)`;
      case 12:
        return `Operation - RFG frozen, set "RFG start" = "1" (p1141)`;
      case 13:
        return `Operation - set "enable RFG" = "1" (p1140)`;
      case 14:
        return `Oper. - MotID, excit. running and/or brake opens, SS2, STOP C`;
      case 15:
        return `Operation - open brake (p1215)`;
      case 16:
        return `Operation - withdraw braking with OFF1 using "ON/OFF1" = "1"`;
      case 17:
        return `Operation - braking with OFF3 can only be interrupted with OFF2`;
      case 18:
        return `Operation - brake on fault, remove fault, acknowledge`;
      case 19:
        return `Operation - armature short-circ./DC brake act. (p1230, p1231)`;
      case 21:
        return `Ready for operation - set "Enable operation" = "1" (p0852)`;
      case 22:
        return `Ready for operation - de-magnetizing running (p0347)`;
      case 23:
        return `Ready for operation - set "Infeed operation" = "1" (p0864)`;
      case 31:
        return `Ready for switching on - set "ON/OFF1" = "0/1" (p0840)`;
      case 35:
        return `Switching on inhibited - carry out first commissioning (p0010)`;
      case 41:
        return `Switching on inhibited - set "ON/OFF1" = "0" (p0840)`;
      case 42:
        return `Switching on inhibited - set "OC/OFF2" = "1" (p0844, p0845)`;
      case 43:
        return `Switching on inhibited - set "OC/OFF3" = "1" (p0848, p0849)`;
      case 44:
        return `Switching on inhibited - supply STO terminal w/ 24 V (hardware)`;
      case 45:
        return `Switching on inhibited - rectify fault, acknowledge fault, STO`;
      case 46:
        return `Switching on inhibited - exit commissioning mode (p0009, p0010)`;
      case 60:
        return `Drive object deactivated/not operational`;
      case 70:
        return `Initialization`;
      case 200:
        return `Wait for booting/partial booting`;
      case 250:
        return `Device signals a topology error`;

      default:
        return `No info available operation Code ${value}`;
    }
  },
};

const firmwareVersion = {
  name: `r18 firmware version`,
  prettyText: "Firmware",
  type: "DWORD",
  start: 0,
  area: "db",
  dbnr: 18,
};
/* r20 speed setpoint smoothed */
const speedSetpointSmoothed = {
  name: `r20 speed setpoint smoothed`,
  unit: `rpm`,
  type: "REAL",
  start: 0,
  area: "db",
  dbnr: 20,
};

const actualSpeedSmoothed = {
  name: `r21 co actual speed smoothed`,
  unit: `rpm`,
  type: "REAL",
  start: 0,
  area: "db",
  dbnr: 21,
};

const actualSpeedRpmSmoothed = {
  name: `r22 actual speed rpm smoothed`,
  unit: `rpm`,
  type: "REAL",
  start: 0,
  area: "db",
  dbnr: 22,
};

const outputFrequencySmoothed = {
  name: `r24 output frequency smoothed`,
  unit: `Hz`,
  type: "REAL",
  start: 0,
  area: "db",
  dbnr: 24,
};

/* r25 output voltage smoothed */
const outputVoltageSmoothed = {
  name: `r25 output voltage smoothed`,
  prettyText: "Voltage",
  type: "REAL",
  start: 0,
  area: "db",
  dbnr: 25,
};

/* r26 dc link voltage smoothed */
const dcLinkVoltageSmoothed = {
  name: `r26 dc link voltage smoothed`,
  prettyText: "Voltage dc link",
  unit: `V`,
  type: "REAL",
  start: 0,
  area: "db",
  dbnr: 26,
};

const absoluteActualCurrentSmoothed = {
  name: `r27 absolute actual current smoothed`,
  prettyText: "Current",
  unit: `Arms`,
  type: "REAL",
  start: 0,
  area: "db",
  dbnr: 27,
};

const actualTorqueSmoothed = {
  name: `r31 actual Torque smoothed`,
  unit: `Nm`,
  type: "REAL",
  start: 0,
  area: "db",
  dbnr: 31,
};

const actualPowerActualValueSmoothed = {
  name: `r32 actual power actual value smoothed`,
  unit: `kW`,
  type: "REAL",
  start: 0,
  area: "db",
  dbnr: 32,
};

const motorUtilizationThermal = {
  name: `r34 motor utilization thermal`,
  unit: `%`,
  type: "REAL",
  start: 0,
  area: "db",
  dbnr: 34,
};
const motorTemperature = {
  name: `r35 motor temperature`,
  prettyText: "Motor temp",
  unit: `°C`,
  type: "REAL",
  start: 0,
  area: "db",
  dbnr: 35,
};

const powerUnitOverloadl2t = {
  name: `r36 power unit overload l2t`,
  unit: `%`,
  type: "REAL",
  start: 0,
  area: "db",
  dbnr: 36,
};

const energyBalanceSum = {
  name: `r39.0 energy balance (sum)`,
  prettyText: "Energy Total",
  unit: `kWh`,
  type: "REAL",
  start: 0,
  area: "db",
  dbnr: 39,
};

const energyDrown = {
  name: `r39.1 energy drown`,
  prettyText: "Energy Consumed",
  unit: `kWh`,
  type: "REAL",
  start: 1,
  area: "db",
  dbnr: 39,
};
const energyFedBack = {
  name: `r39.2 energy fed back`,
  prettyText: "Energy fed back",
  unit: `kWh`,
  type: "REAL",
  start: 2,
  area: "db",
  dbnr: 39,
};

const energyConsumptionSaved = {
  name: `r41 energy Consumption Saved`,
  prettyText: "Energy Saved Total",
  unit: `kWh`,
  type: "REAL",
  start: 0,
  area: "db",
  dbnr: 41,
};
/*
2: MICROMASTER 440
3: MICROMASTER 411
4: MICROMASTER 410
5: MICROMASTER 436
6: MICROMASTER 440 PX
7: MICROMASTER 430
100: SINAMICS S
101: SINAMICS S (value)
102: SINAMICS S (combi)
103: SINAMICS S120M (distributed)
112: PM220 (SINAMICS G120)
113: PM230 (SINAMICS G120)
114: PM240 (SINAMICS G120 / S120)
115: PM250 (SINAMICS G120 / S120)
116: PM260 (SINAMICS G120)
118: SINAMICS G120 Px
120: PM340 (SINAMICS S120 / G120)
126: SINAMICS ET200PRO
130: PM250D (SINAMICS G120D)
133: SINAMICS G120C
135: SINAMICS PMV40
136: SINAMICS PMV60
137: SINAMICS PMV80
138: SINAMICS G110M
150: SINAMICS G
151: PM330 (SINAMICS G120)
200: SINAMICS GM
250: SINAMICS SM
260: SINAMICS MC
300: SINAMICS GL
350: SINAMICS SL
400: SINAMICS DCM
*/
const actualPowerUnitType = {
  name: `r203 Actual power unit type`,
  type: "INT",
  start: 0,
  area: "db",
  dbnr: 203,
};

const faultCode = {
  name: `r945 fault code`,
  type: "WORD",
  start: 0,
  area: "db",
  dbnr: 945,
};
const faultNumber = {
  name: `r947 fault number`,
  type: "WORD",
  start: 0,
  area: "db",
  dbnr: 947,
};
const controlUnitTemperature = {
  name: `r3960 controlUnitTemperature`,
  prettyText: "Cu temp",
  unit: `°C`,
  type: "REAL",
  start: 0,
  area: "db",
  dbnr: 3960,
};

const safelyRemoveMemoryCardStatus = {
  name: `r9401 memory card inserted`,
  type: "WORD",
  start: 0,
  area: "db",
  dbnr: 9401,
  formatValue: (value) => {
    let binString = hex2bin(value);
    let returnVal = {};
    if (binString[7] === "1") {
      returnVal.memoryCardInserted = true;
    } else {
      returnVal.memoryCardInserted = false;
    }
    if (binString[6] === "1") {
      returnVal.memoryCardActivated = true;
    } else {
      returnVal.memoryCardActivated = false;
    }
    if (binString[5] === "1") {
      returnVal.memoryCardIsSiemens = true;
    } else {
      returnVal.memoryCardIsSiemens = false;
    }
    if (binString[4] === "1") {
      returnVal.memoryCardIsNotSiemens = true;
    } else {
      returnVal.memoryCardIsNotSiemens = false;
    }
    return returnVal;
  },
};
function hex2bin(hex) {
  return parseInt(hex, 16)
    .toString(2)
    .padStart(8, "0");
}
const parameters = {
  driveOperationDisplay,
  firmwareVersion,
  speedSetpointSmoothed,
  actualSpeedSmoothed,
  actualSpeedRpmSmoothed,
  outputFrequencySmoothed,
  outputVoltageSmoothed,
  dcLinkVoltageSmoothed,
  absoluteActualCurrentSmoothed,
  actualTorqueSmoothed,
  actualPowerActualValueSmoothed,
  motorUtilizationThermal,
  motorTemperature,
  powerUnitOverloadl2t,
  energyBalanceSum,
  energyDrown,
  energyFedBack,
  energyConsumptionSaved,
  actualPowerUnitType,
  controlUnitTemperature,
  safelyRemoveMemoryCardStatus,
  faultCode,
  faultNumber,
};
module.exports = parameters;
