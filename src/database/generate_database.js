// Chuyển sang Node.js

const { DataBaseManagerConfig } = require('./base_models/pydantic_manager');
const { WorkingWallets, WalletsTasks, engine } = require('./models');
const { DataBaseUtils } = require('./utils/db_manager');
const { Sequelize } = require('sequelize');
const chalk = require('chalk');
const logger = {
    info: (msg) => console.log(chalk.blue(msg)),
    error: (msg) => console.log(chalk.red(msg)),
};

// Helper: shuffle array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Xoá toàn bộ database
async function clear_database(engine) {
    // Xoá tất cả dữ liệu trong WorkingWallets và WalletsTasks
    await WorkingWallets.destroy({ where: {}, truncate: true });
    await WalletsTasks.destroy({ where: {}, truncate: true });
    logger.info("The database has been cleared");
}

/**
 * Tạo database mới với các private_keys, proxies, twitter_tokens, emails
 * @param {Sequelize} engine
 * @param {string[]} private_keys
 * @param {string[]} proxies
 * @param {string[]} twitter_tokens
 * @param {string[]} emails
 */
async function generate_database(
    engine,
    private_keys,
    proxies,
    twitter_tokens,
    emails
) {
    // Lấy các biến cấu hình từ config.js
    const {
        FAUCET,
        TWITTER_QUESTS,
        DISCORD_QUESTS,
        TELEGRAM_QUESTS,
        OTHER_QUESTS,
        AWANA,
        PICTOGRAPGHS_MINT,
        BLEETZ_MINT,
        MERV_MINT,
        CLUSTERS,
        GAS_ZIP,
        SELF_TRANSFERS,
        UNLINK_TWITTER,
        THE_CAMPFIRE_RARIBLE,
        CAMPING_WITH_RARIBLE,
        MOBILE_PROXY
    } = require('../../config');

    await clear_database(engine);

    let tasks = [];
    if (FAUCET) tasks.push('FAUCET');
    if (TWITTER_QUESTS) tasks.push('TWITTER_QUESTS');
    if (DISCORD_QUESTS) tasks.push('DISCORD_QUESTS');
    if (TELEGRAM_QUESTS) tasks.push('TELEGRAM_QUESTS');
    if (OTHER_QUESTS) tasks.push('OTHER_QUESTS');
    if (AWANA) tasks.push('AWANA');
    if (PICTOGRAPGHS_MINT) tasks.push('PICTOGRAPGHS_MINT');
    if (BLEETZ_MINT) tasks.push('BLEETZ_MINT');
    if (MERV_MINT) tasks.push('MERV_MINT');
    if (CLUSTERS) tasks.push('CLUSTERS');
    if (GAS_ZIP) tasks.push('GAS_ZIP');
    if (SELF_TRANSFERS) tasks.push('SELF_TRANSFERS');
    if (UNLINK_TWITTER) tasks.push('UNLINK_TWITTER');
    if (THE_CAMPFIRE_RARIBLE) tasks.push('THE_CAMPFIRE_RARIBLE');
    if (CAMPING_WITH_RARIBLE) tasks.push('CAMPING_WITH_RARIBLE');

    const has_faucet = tasks.includes('FAUCET');
    const has_gas_zip = tasks.includes('GAS_ZIP');
    const has_self_transfers = tasks.includes('SELF_TRANSFERS');
    const has_unlink_twitter = tasks.includes('UNLINK_TWITTER');

    let proxy_index = 0;
    for (let i = 0; i < private_keys.length; i++) {
        const private_key = private_keys[i];

        // Shuffle other tasks (không phải các task đặc biệt)
        let other_tasks = tasks.filter(
            (task) => !['FAUCET', 'GAS_ZIP', 'SELF_TRANSFERS', 'UNLINK_TWITTER'].includes(task)
        );
        shuffle(other_tasks);

        // Sắp xếp lại tasks cho wallet này
        const wallet_tasks = [
            ...(has_faucet ? ['FAUCET'] : []),
            ...(has_gas_zip ? ['GAS_ZIP'] : []),
            ...(has_self_transfers ? ['SELF_TRANSFERS'] : []),
            ...(has_unlink_twitter ? ['UNLINK_TWITTER'] : []),
            ...other_tasks
        ];

        let twitter_token = null;
        let email = null;

        if (wallet_tasks.includes("TWITTER_QUESTS")) {
            if (twitter_tokens.length !== private_keys.length) {
                logger.error('Number of twitter tokens does not match number of private keys.');
                return;
            }
            twitter_token = twitter_tokens[i];
        }

        if (wallet_tasks.includes("AWANA")) {
            if (emails.length !== private_keys.length) {
                logger.error('Number of emails does not match number of private keys.');
                return;
            }
            email = emails[i];
        }

        let proxy;
        if (proxies.length !== private_keys.length) {
            proxy = proxies[proxy_index];
            proxy_index = (proxy_index + 1) % proxies.length;
        } else {
            proxy = proxies[i];
        }

        let proxy_url = null;
        let change_link = '';
        if (proxy) {
            if (MOBILE_PROXY) {
                // proxy dạng: url|change_link
                const parts = proxy.split('|');
                proxy_url = parts[0];
                change_link = parts[1] || '';
            } else {
                proxy_url = proxy;
            }
        }

        // Thêm vào bảng working_wallets
        const db_utils_wallet = new DataBaseUtils(
            new DataBaseManagerConfig({ action: 'working_wallets' })
        );
        await db_utils_wallet.add_to_db({
            private_key: private_key,
            proxy: MOBILE_PROXY ? `${proxy_url}|${change_link}` : proxy_url,
            twitter_token: twitter_token,
            email: email,
            status: 'pending'
        });

        // Thêm từng task vào bảng wallets_tasks
        for (const task of wallet_tasks) {
            const db_utils_task = new DataBaseUtils(
                new DataBaseManagerConfig({ action: 'wallets_tasks' })
            );
            await db_utils_task.add_to_db({
                private_key: private_key,
                status: 'pending',
                task_name: task
            });
        }
    }
}

module.exports = {
    clear_database,
    generate_database
};
