const fs = require('fs');
const path = require('path');

// Load private keys from pk.txt
let private_keys = [];
try {
    const pkPath = path.join(__dirname, '../../../pk.txt');
    const pkContent = fs.readFileSync(pkPath, 'utf8');
    private_keys = pkContent.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0); // Remove empty lines
} catch (error) {
    console.error('Error loading private keys from pk.txt:', error.message);
    private_keys = [];
}

// Load proxies from data/proxies.txt
let proxies = [];
try {
    const proxiesPath = path.join(__dirname, '../../../data/proxies.txt');
    const proxiesContent = fs.readFileSync(proxiesPath, 'utf8');
    proxies = proxiesContent.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
    if (proxies.length === 0) {
        proxies = new Array(private_keys.length).fill(null);
    }
} catch (error) {
    console.log('No proxies.txt found, using null proxies');
    proxies = new Array(private_keys.length).fill(null);
}

// Load twitter tokens from data/twitter_tokens.txt
let twitter_tokens = [];
try {
    const twitterPath = path.join(__dirname, '../../../data/twitter_tokens.txt');
    const twitterContent = fs.readFileSync(twitterPath, 'utf8');
    twitter_tokens = twitterContent.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
} catch (error) {
    console.log('No twitter_tokens.txt found');
    twitter_tokens = [];
}

// Load emails from data/emails.txt
let emails = [];
try {
    const emailsPath = path.join(__dirname, '../../../data/emails.txt');
    const emailsContent = fs.readFileSync(emailsPath, 'utf8');
    emails = emailsContent.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
} catch (error) {
    console.log('No emails.txt found');
    emails = [];
}

console.log(`Loaded ${private_keys.length} wallets from pk.txt`);

module.exports = {
    private_keys,
    proxies,
    twitter_tokens,
    emails
}; 