## YorBlacklisterJS

This project is a expirmental utility nodejs application that investigates nginx access logs capturing any redflags and updating cloudflare blacklist through API using axios. 

## Requirements

- Latest NodeJS 
- Latest Axios
- Cloudflare Account

## Installing

- Clone repository.

- run `npm install`.

- Remove `Example.` from `Example.Config.js` in the `./lib/` folder.

    - Get your cloudflare [key here](https://support.cloudflare.com/hc/en-us/articles/200167836-Managing-API-Tokens-and-Keys#12345682)

    - Get your cloudflare account and list id's; if you cannot find them, you will need to consume the methods included in the cloudflare class to get them.

        ```js
        class Confg {
            constructor() {
                this.codes = ["301", "400", "404"]; // set whatever codes you want to watch for being excessively hit
                this.file_path = "../logs/access.log"; // See the next step 
                this.email = ""; // cloudflare email
                this.key = "";   // cloudflare key
                this.account_id = ""; // cloudflare account_id
                this.list_id = ""; // cloudflare list id for your blacklist
                this.limit = 4; // redflag if ip occurences on 301 code over limit
            }
        }
        ```

- Get your nginx access logs into the `./logs` folder.

    ```
    scp -r user@your.server.example.com:/var/log/nginx D://YorBlacklister/logs

    ```

## Redflag Demo Screenshot 

![redflag demo screenshot](https://github.com/yordadev/YorBlacklister/blob/master/resources/redflags.png)