## YorBlacklisterJS

This project is an experimental NodeJS utility that parses Nginx access logs, capturing any red-flags, and updates a CloudFlare blacklist using axios. 

## Requirements

- Latest NodeJS 
- Latest Axios
- Cloudflare Account

## Installing

#### Clone repo

```bash
git clone github.com/yordadev/YorBlacklister
cd YorBlacklister
```

#### Run npm install.

```bash
npm install
```

#### Create Config.js

```bash
cp lib/Example.Config.js lib/Config.js
```

#### Retrieve CloudFlare API key and list IDs

- Retrieve your CloudFlare [key here](https://support.cloudflare.com/hc/en-us/articles/200167836-Managing-API-Tokens-and-Keys#12345682)

- Get your CloudFlare account and list ID's; if you cannot find them, you will need to consume the methods included in the CloudFlare class to get them.

#### Modify `lib/Config.js`

```js
class Config {
    constructor() {
        this.codes = ["301", "400", "404"]; // Set whatever codes you want to watch for being excessively hit
        this.file_path = "../logs/access.log"; // See the next step 
        this.email = ""; // CloudFlare email
        this.key = "";   // CloudFlare key
        this.account_id = ""; // CloudFlare account_id
        this.list_id = ""; // CloudFlare list id for your blacklist
        this.limit = 4; // red-flag if IP occurrences on 301 code over limit
    }
}
```

#### Retrieve Nginx logs from server

- Copy your access logs into the `./logs` folder.

```bash
mkdir logs
scp -r user@your.server.example.com:/var/log/nginx logs
```

## Redflag Demo Screenshot 

![redflag demo screenshot](https://github.com/yordadev/YorBlacklister/blob/master/public/redflags.png)
