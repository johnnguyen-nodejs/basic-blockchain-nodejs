const SHA256 = require("crypto-js/sha256");

class Block{
    constructor(index, timestamp, data, previousHash= ""){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "18/02/2020", "Start Blcokchain", "0");
    }
    getLastestBlock(){
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLastestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false
            }
        }
        return true;
    }
}

var basicCoin = new Blockchain();

basicCoin.addBlock(new Block(1, "19/02/2020", { amount: 4}));
basicCoin.addBlock(new Block(2, "20/02/2020", { amount: 40}));

console.log("is chain valid?", basicCoin.isChainValid());

basicCoin.chain[1].data = { amount: 100 };
console.log("is chain valid?", basicCoin.isChainValid());


console.log(JSON.stringify(basicCoin, null, 4));