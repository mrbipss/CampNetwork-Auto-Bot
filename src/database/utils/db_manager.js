// DataBaseUtils class
const { WorkingWallets, WalletsTasks } = require('../models');

class DataBaseUtils {
    constructor(manager_config) {
        this.manager_config = manager_config;
        this.table_object = manager_config.calculated_table_object;
    }

    async add_to_db(params) {
        const { private_key, proxy, twitter_token, email, status, task_name } = params;
        
        try {
            if (this.table_object === WorkingWallets) {
                await WorkingWallets.create({
                    private_key,
                    proxy,
                    twitter_token,
                    email,
                    status
                });
            } else if (this.table_object === WalletsTasks) {
                await WalletsTasks.create({
                    private_key,
                    task_name,
                    status
                });
            }
            console.log(`Added to database: ${private_key.substring(0, 8)}...`);
        } catch (error) {
            console.error('Database error:', error.message);
        }
    }

    async get_uncompleted_wallets() {
        try {
            return await WorkingWallets.findAll({
                where: { status: 'pending' }
            });
        } catch (error) {
            console.error('Error getting uncompleted wallets:', error.message);
            return [];
        }
    }

    async get_wallet_pending_tasks(private_key) {
        try {
            return await WalletsTasks.findAll({
                where: { 
                    private_key,
                    status: 'pending'
                }
            });
        } catch (error) {
            console.error('Error getting pending tasks:', error.message);
            return [];
        }
    }
}

module.exports = {
    DataBaseUtils
};
