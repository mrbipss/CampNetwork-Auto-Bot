const fs = require('fs');
const os = require('os');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const { EthersWallet } = require('ethersjs3-wallet');
const cliProgress = require('cli-progress');
const { setTimeout: sleep } = require('timers/promises');
const { randomInt } = require('crypto');

const {
    MAX_PARALLEL_ACCOUNTS,
    PAUSE_BETWEEN_WALLETS,
    PAUSE_BETWEEN_MODULES,
    SHUFFLE_WALLETS,
    TG_BOT_TOKEN,
    TG_USER_ID,
    MOBILE_PROXY,
    ROTATE_IP
} = require('./config');
const {
    twitter_quests,
    telegram_quests,
    discord_quests,
    other_quests
} = require('./src/modules/loyalty_quests/data/quests');
const {
    private_keys,
    proxies,
    twitter_tokens,
    emails
} = require('./src/utils/data/helper');
const { generate_database } = require('./src/database/generate_database');
const { init_models, engine } = require('./src/database/models');
const wallet = new EthersWallet();
const module_handlers = require('./src/utils/data/mappings').module_handlers;
const manage_tasks = require('./src/utils/manage_tasks');
const Proxy = require('./src/utils/proxy_manager').Proxy;
const get_routes = require('./src/utils/retrieve_route').get_routes;
const process_stats_checker = require('./src/utils/runner').process_stats_checker;
const analyze_completed = require('./src/utils/runner').analyze_completed;
const TGApp = require('./src/utils/tg_app/telegram_notifications').TGApp;

// Logger
const logger = {
    success: (msg) => console.log(chalk.green(msg)),
    info: (msg) => console.log(chalk.blue(msg)),
    debug: (msg) => console.log(chalk.gray(msg)),
};


// Helper: shuffle array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Helper: concurrency limiter
function pLimit(concurrency) {
    let activeCount = 0;
    const queue = [];
    const next = () => {
        if (queue.length === 0 || activeCount >= concurrency) return;
        activeCount++;
        const { fn, resolve, reject } = queue.shift();
        fn().then(resolve, reject).finally(() => {
            activeCount--;
            next();
        });
    };
    return (fn) => new Promise((resolve, reject) => {
        queue.push({ fn, resolve, reject });
        next();
    });
}

// Get module selection
async function get_module() {
    const { module } = await inquirer.prompt([
        {
            type: 'list',
            name: 'module',
            message: 'Choose module',
            choices: [
                { name: '1) Generate new database', value: 1 },
                { name: '2) Work with existing database', value: 2 },
                { name: '3) Check stats', value: 3 }
            ],
            prefix: '⚙️',
            pointer: '✅'
        }
    ]);
    return module;
}

// Process tasks with concurrency
async function process_task(routes) {
    if (!routes || routes.length === 0) {
        logger.success('All tasks are completed');
        return;
    }
    const limit = pLimit(MAX_PARALLEL_ACCOUNTS);
    const tasks = [];
    for (let i = 0; i < routes.length; i++) {
        tasks.push(limit(() => process_route(routes[i])));
        if (i < routes.length - 1) {
            let time_to_pause = Array.isArray(PAUSE_BETWEEN_WALLETS)
                ? randomInt(PAUSE_BETWEEN_WALLETS[0], PAUSE_BETWEEN_WALLETS[1] + 1)
                : PAUSE_BETWEEN_WALLETS;
            logger.info(`Сплю ${time_to_pause} секунд перед следующим кошельком...`);
            await sleep(time_to_pause * 1000);
        }
    }
    await Promise.all(tasks);
}

// Process a single route
async function process_route(route) {
    if (route.wallet.proxy) {
        if (route.wallet.proxy.proxy_url && MOBILE_PROXY && ROTATE_IP) {
            await route.wallet.proxy.change_ip();
        }
    }
    const private_key = route.wallet.private_key;
    const moduleTasks = [];
    for (const task of route.tasks) {
        moduleTasks.push(process_module(task, route, private_key));
        let random_sleep = Array.isArray(PAUSE_BETWEEN_MODULES)
            ? randomInt(PAUSE_BETWEEN_MODULES[0], PAUSE_BETWEEN_MODULES[1] + 1)
            : PAUSE_BETWEEN_MODULES;
        logger.info(`Сплю ${random_sleep} секунд перед следующим модулем...`);
        await sleep(random_sleep * 1000);
    }
    await Promise.all(moduleTasks);

    if (TG_BOT_TOKEN && TG_USER_ID) {
        const tg_app = new TGApp({
            token: TG_BOT_TOKEN,
            tg_id: TG_USER_ID,
            private_key
        });
        await tg_app.send_message();
    }
}

// Process a module
async function process_module(task, route, private_key) {
    const completed = await module_handlers[task](route);
    if (completed) {
        await manage_tasks(private_key, task);
    }
}

// Main function
async function main(module) {
    await init_models(engine);
    if (module === 1) {
        if (SHUFFLE_WALLETS) {
            shuffle(private_keys);
        }
        logger.debug("Generating new database");
        await generate_database(engine, private_keys, proxies, twitter_tokens, emails);
    } else if (module === 2) {
        logger.debug("Working with the database");
        const routes = await get_routes(private_keys);
        await process_task(routes);
    } else if (module === 3) {
        // Stats check
        const bar = new cliProgress.SingleBar({
            format: 'Проверка кошельков |' + chalk.cyan('{bar}') + '| {percentage}% || {value}/{total} Wallets',
            barCompleteChar: '\u2588',
            barIncompleteChar: '\u2591',
            hideCursor: true
        });
        logger.debug("Checking stats...");
        let proxy_index = 0;

        function format_progress(value, total) {
            const percent = Math.floor((value / total) * 100);
            let color = percent >= 75 ? 'green' : percent >= 50 ? 'yellow' : 'red';
            return chalk[color](`${value}/${total} (${percent}%)`);
        }
        function format_tx_progress(value) {
            let color = value >= 3 ? 'green' : 'red';
            return chalk[color](`${value}/3`);
        }
        function format_total_progress(done, total) {
            const percent = Math.floor((done / total) * 100);
            let color = percent >= 75 ? 'green' : percent >= 50 ? 'yellow' : 'red';
            return chalk.bold[color](`${done}/${total} (${percent}%)`);
        }

        async function run_with_progress(private_key, proxy) {
            let proxy_instance = null;
            if (proxy) {
                proxy_instance = new Proxy({ proxy_url: 'http://' + proxy, change_link: null });
            }
            const result = await process_stats_checker(private_key, proxy_instance);
            bar.increment();
            return result;
        }

        bar.start(private_keys.length, 0);
        const tasks = [];
        for (const private_key of private_keys) {
            const proxy = proxies[proxy_index];
            proxy_index = (proxy_index + 1) % proxies.length;
            tasks.push(run_with_progress(private_key, proxy));
            let time_to_pause = Array.isArray(PAUSE_BETWEEN_WALLETS)
                ? randomInt(PAUSE_BETWEEN_WALLETS[0], PAUSE_BETWEEN_WALLETS[1] + 1)
                : PAUSE_BETWEEN_WALLETS;
            await sleep(time_to_pause * 1000);
        }
        const results = await Promise.all(tasks);
        bar.stop();

        // Prepare stats
        const twitter_ids = new Set(twitter_quests);
        const telegram_ids = new Set(telegram_quests.map(q => q[0]));
        const discord_ids = new Set(discord_quests.map(q => q[0]));
        const other_ids = new Set(other_quests.map(q => q[0]));

        const TOTALS = {
            Twitter: twitter_ids.size,
            Telegram: telegram_ids.size,
            Discord: discord_ids.size,
            Other: other_ids.size
        };

        // Table output
        const Table = require('cli-table3');
        const table = new Table({
            head: [
                chalk.cyan('Wallet'),
                chalk.green('Twitter Quests'),
                chalk.green('Telegram Quests'),
                chalk.green('Discord Quests'),
                chalk.green('Other Quests'),
                chalk.green('Total Quests'),
                chalk.yellow('Ethereum Transactions')
            ]
        });

        const totals_done = { Twitter: 0, Telegram: 0, Discord: 0, Other: 0 };
        let count_valid = 0;

        for (const result of results) {
            if (Array.isArray(result) && result.length === 3) {
                const [wallet, completed, erc20_txs] = result;
                if (completed == null) {
                    table.push([
                        chalk.red(wallet),
                        '-', '-', '-', '-', '-', `${erc20_txs}/3`
                    ]);
                    continue;
                }
                const counts = analyze_completed(completed, twitter_ids, telegram_ids, discord_ids, other_ids);
                const total_done = Object.values(counts).reduce((a, b) => a + b, 0);
                const total_possible = Object.values(TOTALS).reduce((a, b) => a + b, 0);
                table.push([
                    wallet,
                    format_progress(counts.Twitter, TOTALS.Twitter),
                    format_progress(counts.Telegram, TOTALS.Telegram),
                    format_progress(counts.Discord, TOTALS.Discord),
                    format_progress(counts.Other, TOTALS.Other),
                    format_progress(total_done, total_possible),
                    format_tx_progress(erc20_txs)
                ]);
                for (const k in counts) {
                    totals_done[k] += counts[k];
                }
                count_valid += 1;
            } else {
                table.push([chalk.red('Ошибка'), '-', '-', '-', '-', '-', '-']);
            }
        }

        const total_all_done = Object.values(totals_done).reduce((a, b) => a + b, 0);
        const total_all_possible = Object.values(TOTALS).reduce((a, b) => a + b, 0) * private_keys.length;

        table.push([
            '-'.repeat(20), '-'.repeat(10), '-'.repeat(10), '-'.repeat(10), '-'.repeat(10), '-'.repeat(10), '-'.repeat(10)
        ]);
        table.push([
            chalk.bold('TOTAL'),
            ...['Twitter', 'Telegram', 'Discord', 'Other'].map(k =>
                format_total_progress(totals_done[k], TOTALS[k] * private_keys.length)
            ),
            format_total_progress(total_all_done, total_all_possible),
            '-'
        ]);

        console.log(table.toString());
        console.log(chalk.bold.yellow(`Обработано кошельков: ${count_valid}/${results.length}`));
    } else {
        console.log("Wrong choice");
        return;
    }
}

// Start event loop
(async () => {
    const module = await get_module();
    await main(module);
})();

