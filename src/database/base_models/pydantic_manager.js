// DataBaseManagerConfig class
class DataBaseManagerConfig {
    constructor({ action }) {
        this.action = action;
        this.calculated_table_object = this.getTableObject();
    }

    getTableObject() {
        const { WorkingWallets, WalletsTasks } = require('../models');
        
        switch (this.action) {
            case 'working_wallets':
                return WorkingWallets;
            case 'wallets_tasks':
                return WalletsTasks;
            default:
                throw new Error(`Unknown action: ${this.action}`);
        }
    }
}

module.exports = {
    DataBaseManagerConfig
};
