("use strict");

class Config {
  constructor() {
    this.codes = ["301", "400", "404"];
    this.file_path = "../logs/access.log";
    this.email = "";
    this.key = "";
    this.account_id = "";
    this.list_id = "";
    this.limit = 4;
  }

  settings() {
    return {
      codes: this.codes,
      file_path: this.file_path,
      limit: this.limit,
      timeout: 1000 * 30, // 30sec
    };
  }

  cloudflare() {
    return {
      email: this.email,
      key: this.key,
      account_id: this.account_id,
      list_id: this.list_id,
    };
  }
}

module.exports = Config;
