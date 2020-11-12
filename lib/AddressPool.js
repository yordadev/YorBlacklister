("use strict");

class AddressPool {
  constructor() {
    this.addressToBlackList = new Array();
    this.addressToBlackListComment = new Array();
    this.redFlags = new Array();
  }

  async prepareForCloudflareUpdate() {
    const pool = new Array();
    for (let entry = 0; entry < this.addressToBlackList.length; entry++) {
      pool.push({
        ip_address: this.addressToBlackList[entry],
        comment: this.addressToBlackListComment[entry],
      });
    }
    return pool;
  }

  add(ip_address, comment) {
    if (!this.addressToBlackList.includes(ip_address)) {
      this.addressToBlackListComment.push(comment);
      this.addressToBlackList.push(ip_address);
    }
  }

  remove(ip_address) {
    var index = this.addressToBlackList.indexOf(ip_address);
    while (index > -1) {
      this.addressToBlackList.splice(index, 1);
      this.addressToBlackListComment.splice(index, 1);
      index = this.addressToBlackList.indexOf(ip_address);
    }
  }

  addFlag(flag) {
    return this.redFlags.push(flag);
  }

  async getFlags() {
    return this.redFlags;
  }
}

module.exports = AddressPool;
