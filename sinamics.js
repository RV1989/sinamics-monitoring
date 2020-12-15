const { S7Client } = require("@rv1989/s7client");
const parameters = require("./sinamicsParameter");
module.exports = class Sinamics {
  constructor({ id, name, ip }) {
    this.id = id;
    this.plcSettings = {
      name: name,
      host: ip,
      port: 102,
      rack: 0,
      slot: 0,
      connectionCheckInterval: 2000,
      maxRetryDelay: 60 * 1000,
      alivePkgCycle: 45,
    };
    this.s7Client = new S7Client(this.plcSettings);
    this.lastReadParameters = [];
    this.lastUpdated = Date.now();
    this.parameters = Object.values(parameters);
    this.available = false;
  }

  async connect() {
    return new Promise(async (resolve, reject) => {
      try {
        await this.s7Client.connect();
        this.available = true;
        resolve(true);
      } catch (error) {
        this.available = false;
        reject(error);
      }
    });
  }

  async readParameters(parameters) {
    return new Promise(async (resolve, reject) => {
      if (this.s7Client.isConnected()) {
        try {
          this.lastReadParameters = await this.s7Client.readVars(parameters);
          this.lastUpdated = Date.now();
          this.lastReadParameters.map((param) => {
            let foundIndex = this.parameters.findIndex(
              (x) => x.name === param.name
            );
            if (param.formatValue) {
              param.formattedValue = param.formatValue(param.value);
            } else {
              param.formattedValue = param.value;
            }
            this.parameters[foundIndex] = param;
          });
          resolve(this.lastReadParameters);
        } catch (error) {
          reject(error);
        }
      } else {
        reject(new Error("client not connected"));
      }
    });
  }

  async disconnect() {
    return this.s7Client.disconnect();
  }
  driveInfo() {
    return {
      name: this.plcSettings.name,
      id: this.id,
      ip: this.plcSettings.host,
      parameters: this.parameters.filter((x) => x.formattedValue !== undefined),
      lastUpdated: this.lastUpdated,
      available: this.available,
    };
  }
};
