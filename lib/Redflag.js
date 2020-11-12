("use strict");

class Redflag {
  constructor(flag) {
    this.ip_address = flag.ip_address;
    this.time = flag.time;
    this.method = flag.method;
    this.query_path = flag.query_path;
    this.code = flag.code;
    this.body_bytes_sent = flag.body_bytes_sent;
    this.referrer = flag.referrer;
    this.user_agent = flag.user_agent;
  }

  information() {
    return {
      ip_address: this.ip_address,
      time: this.time,
      method: this.method,
      query_path: this.query_path,
      code: this.code,
      body_bytes_sent: this.body_bytes_sent,
      referrer: this.referrer,
      user_agent: this.user_agent,
    };
  }
}

module.exports = Redflag;
