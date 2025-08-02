// Chuyển sang Node.js

const { MOBILE_PROXY } = require('../../config');
const { Proxy } = require('../utils/proxy_manager');

/**
 * Wallet class
 */
class Wallet {
    /**
     * @param {Object} params
     * @param {string} params.private_key
     * @param {string} [params.twitter_token]
     * @param {string} [params.discord_token]
     * @param {string} [params.email]
     * @param {string} [params.proxy]
     */
    constructor({ private_key, twitter_token = null, discord_token = null, email = null, proxy = null }) {
        this.private_key = private_key;
        this.twitter_token = twitter_token;
        this.discord_token = discord_token;
        this.email = email;
        this.proxy = null;

        if (proxy) {
            let proxy_url, change_link = null;
            if (MOBILE_PROXY) {
                [proxy_url, change_link] = proxy.split('|');
            } else {
                proxy_url = proxy;
            }
            this.proxy = new Proxy({ proxy_url: `http://${proxy_url}`, change_link });
        }
    }
}

/**
 * Route class
 */
class Route {
    /**
     * @param {Object} params
     * @param {string[]} params.tasks
     * @param {Wallet} params.wallet
     */
    constructor({ tasks, wallet }) {
        this.tasks = tasks;
        this.wallet = wallet;
    }
}

module.exports = {
    Wallet,
    Route
};
