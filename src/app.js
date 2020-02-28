const { Blockchain, Transaction } = require("./blockchain");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const myKey = ec.keyFromPrivate("7ffc91591359a9e7a31676ea875a34a85b811b7bef7e2b312c7bb77a5e2c289f");
const myWalletAddress = myKey.getPublic("hex");

var basicCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
basicCoin.addTransaction(tx1);

console.log('\n Starting the miner...');
basicCoin.minePendingTransaction(myWalletAddress);
console.log("\n miner balance: ", basicCoin.getBalanceAddress(myWalletAddress));

