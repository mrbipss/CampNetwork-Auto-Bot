// Chuyển đổi sang Node.js

const MOBILE_PROXY = false; // True - мобильные proxy/False - обычные proxy
const ROTATE_IP = false; // Настройка только для мобильных proxy

const CAMP_TESTNET_RPC = 'https://rpc.basecamp.t.raas.gelato.cloud';

const TG_BOT_TOKEN = ''; // str ('2282282282:AAZYB35L2PoziKsri6RFPOASdkal-z1Wi_s')
const TG_USER_ID = null; // int (22822822) or null
const ANTI_CAPTCHA_API = ''; // https://anti-captcha.com/
const SOLVIUM_API_KEY = ''; // @solvium_crypto_bot

const SHUFFLE_WALLETS = false;
const PAUSE_BETWEEN_WALLETS = [1, 2];
const PAUSE_BETWEEN_MODULES = [10, 20];
const MAX_PARALLEL_ACCOUNTS = 10;
const MAX_GWEI = 20;

const FAUCET = false; // https://faucet.campnetwork.xyz/
const GAS_ZIP = false; // https://www.gas.zip/

// Quests //
const TWITTER_QUESTS = false;
const DISCORD_QUESTS = false;
const TELEGRAM_QUESTS = false;
const OTHER_QUESTS = false;

const UNLINK_TWITTER = false; // Отключение твиттера от аккаунта

// NFT //
const PICTOGRAPGHS_MINT = false; // https://app.pictographs.io/mint/pictographs
const BLEETZ_MINT = false; // https://www.bleetz.io/
const MERV_MINT = false; // https://camp.merv.wtf/
const THE_CAMPFIRE_RARIBLE = false; // https://camp.rarible.fun/collections/basecamptestnet/0x10caa985ef1dfca51a0cdb33e939e115db0b6c03/drops
const CAMPING_WITH_RARIBLE = false; // https://camp.rarible.fun/collections/basecamptestnet/0x529dcdae937d2f50c9ae79637e1d43f2144f846a/drops

// Other //
const AWANA = false; // https://tech.awana.world/
const CLUSTERS = false; // https://clusters.xyz/community/campnetwork/register

// Mainnet //
const SELF_TRANSFERS = false; // Набив 3 транзакций (отправка токенов самому себе)

const GasZipSettings = {
    eth_to_refuel: [0.00015, 0.0002], // Сколько будет потрачено ETH на покупку SAHARA
    preferred_chains: ['ARB', 'OP', 'BASE'], // Сети, из которых будет выводиться ETH
    to_chain: 'ERC20', // CAMP / ERC20
    min_balance: 0.5 // Минимальный баланс сети to_chain (CAMP/ETH), выше которого бридж сделан не будет
};

module.exports = {
    MOBILE_PROXY,
    ROTATE_IP,
    CAMP_TESTNET_RPC,
    TG_BOT_TOKEN,
    TG_USER_ID,
    ANTI_CAPTCHA_API,
    SOLVIUM_API_KEY,
    SHUFFLE_WALLETS,
    PAUSE_BETWEEN_WALLETS,
    PAUSE_BETWEEN_MODULES,
    MAX_PARALLEL_ACCOUNTS,
    MAX_GWEI,
    FAUCET,
    GAS_ZIP,
    TWITTER_QUESTS,
    DISCORD_QUESTS,
    TELEGRAM_QUESTS,
    OTHER_QUESTS,
    UNLINK_TWITTER,
    PICTOGRAPGHS_MINT,
    BLEETZ_MINT,
    MERV_MINT,
    THE_CAMPFIRE_RARIBLE,
    CAMPING_WITH_RARIBLE,
    AWANA,
    CLUSTERS,
    SELF_TRANSFERS,
    GasZipSettings
};
