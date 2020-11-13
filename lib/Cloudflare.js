("use strict");

const axios = require("axios");

class Cloudflare {
  constructor(conf) {
    this.base_uri = "https://api.cloudflare.com/client/v4/accounts/";
    this.conf = conf;

    this.instance = axios.create({
      baseURL: this.base_uri,
      timeout: this.conf.settings().timeout,
      headers: {
        "X-Auth-Email": this.conf.cloudflare().email,
        "X-Auth-Key": this.conf.cloudflare().key,
        "Content-Type": "application/json",
      },
    });
  }

  async getLists() {
    try {
      return await this.instance.get(
        this.base_uri + "/" + this.conf.cloudflare().account_id + "/rules/lists"
      ).data;
    } catch (error) {
      return error;
    }
  }

  async getAccountID() {
    try {
      return await this.instance.get(this.base_uri).data;
    } catch (error) {
      return error;
    }
  }

  async getListItems() {
    try {
      return await this.instance.get(
        this.base_uri +
          "/" +
          this.conf.cloudflare().account_id +
          "/rules/lists/" +
          this.conf.cloudflare().list_id +
          "/items?cursor=zzz"
      ).data;
    } catch (error) {
      return error;
    }
  }

  async updateListItems(data) {
    try {
      return await this.instance({
        url:
          this.base_uri +
          "/" +
          this.conf.cloudflare().account_id +
          "/rules/lists/" +
          this.conf.cloudflare().list_id +
          "/items",
        method: "POST",
        data: data,
      }).data;
    } catch (error) {
      return error;
    }
  }
}

module.exports = Cloudflare;
