// Chuyển sang Node.js

const fs = require('fs');
const path = require('path');

const ERC20 = {
    abi: fs.readFileSync(path.join(__dirname, '../../assets/abi/erc20.json'), 'utf-8')
};

const MervData = {
    address: '0xe5e5bE029793A4481287Be2BFc37e2D38316c422',
    abi: fs.readFileSync(path.join(__dirname, '../../assets/abi/merv.json'), 'utf-8')
};

const RaribleData = {
    abi: fs.readFileSync(path.join(__dirname, '../../assets/abi/rarible.json'), 'utf-8')
};

module.exports = {
    ERC20,
    MervData,
    RaribleData
};