("use strict");

const fs = require("fs");

class Investigator {
  constructor(file) {
    this.file = file;

    this.fileContent = [];
    this.investigatedIP = [];
    this.ip_counter = 0;
  }

  async readFile() {
    return (this.fileContent = fs
      .readFileSync(this.file)
      .toString()
      .split("\n"));
  }

  async buildUserAgent(record) {
    let user_agent = "";
    for (let x = 11; x < record.split(" ").length; x++) {
      user_agent = user_agent + " " + record.split(" ")[x];
    }
    return user_agent;
  }

  getFileContent() {
    return this.fileContent;
  }

  addInvestigated(ip_address) {
    return this.investigatedIP.push(ip_address);
  }

  getInvestigated() {
    return this.investigatedIP;
  }

  async investigatedAddress(ip_address) {
    if (this.investigatedIP.includes(ip_address)) {
      return true;
    }
    return false;
  }

  ipFound() {
    return this.ip_counter++;
  }

  ipCount() {
    return this.ip_counter;
  }

  ipCountReset() {
    return (this.ip_counter = 0);
  }
}

module.exports = Investigator;
