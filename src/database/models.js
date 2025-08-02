// Chuyển sang Node.js

const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// Tạo engine (kết nối) với SQLite database
const engine = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../../transactions.db'),
    logging: false,
});

// Định nghĩa model WorkingWallets
const WorkingWallets = engine.define('working_wallets', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    private_key: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    twitter_token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    discord_token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    proxy: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'working_wallets',
    timestamps: false,
});

// Định nghĩa model WalletsTasks
const WalletsTasks = engine.define('wallets_tasks', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    private_key: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    task_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'wallets_tasks',
    timestamps: false,
});

// Hàm khởi tạo các bảng trong database
async function init_models(engineInstance = engine) {
    await engineInstance.sync();
}

module.exports = {
    engine,
    WorkingWallets,
    WalletsTasks,
    init_models,
};
