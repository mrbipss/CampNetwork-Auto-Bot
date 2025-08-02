# CampNetwork Auto Bot

Automated bot for CampNetwork tasks with multi-account and proxy support.

🌟 Features
✨ Multi-threaded processing with configurable threads
🔄 Automatic retries with configurable attempts
🔐 Proxy support with rotation
📊 Account range selection and exact account targeting
🎲 Random pauses between operations
🔔 Telegram logging integration
📝 Detailed transaction tracking and wallet statistics
🧩 Modular task system with custom sequences
🤖 Social media integration (Twitter, Discord)
💾 SQLite database for task management
🌐 Web-based configuration interface
💱 CEX withdrawal support (OKX, Bitget)
🔄 Cross-chain refueling via CrustySwap
🎯 Available Actions
Network Operations:

Camp Network Faucet
Loyalty Platform Integration
Social Media Connections (Twitter, Discord)
Display Name Configuration
Loyalty Campaigns:

StoryChain
Token Tails
AWANA
Pictographs
Hitmakr
Panenka
Scoreplay
Wide Worlds
EntertainM
RewardedTV
Sporting Cristal
Belgrano
ARCOIN
Kraft
SummitX
Pixudi
Clusters
JukeBlox
Camp Network
DeFi Operations:

CrustySwap Refueling
Cross-chain Bridge Operations
CEX Withdrawals (ETH from OKX/Bitget)

## 🚀 Installation

### System Requirements
- Node.js version 16.0.0 or higher
- npm or yarn

### Step 1: Clone the project
```bash
git clone <repository-url>
cd CampNetwork-Auto-Bot
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Configuration
1. Copy `config.example.js` to `config.js`
2. Edit the parameters in `config.js` according to your needs

## 📋 Configuration

### config.js file
```javascript
module.exports = {
    // Number of accounts running in parallel
    MAX_PARALLEL_ACCOUNTS: 3,
    
    // Pause time between wallets (seconds)
    PAUSE_BETWEEN_WALLETS: [5, 10],
    
    // Pause time between modules (seconds)
    PAUSE_BETWEEN_MODULES: [3, 7],
    
    // Whether to shuffle wallet order
    SHUFFLE_WALLETS: true,
    
    // Telegram Bot configuration
    TG_BOT_TOKEN: "your_bot_token",
    TG_USER_ID: "your_user_id",
    
    // Proxy configuration
    MOBILE_PROXY: false,
    ROTATE_IP: false
};
```

## 🎯 Usage

### Run the bot
```bash
node main.js
```



