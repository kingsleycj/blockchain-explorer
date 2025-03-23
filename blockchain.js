const { getProvider } = require('./config');

async function getLatestBlock() {
  const provider = getProvider();
  return await provider.getBlock('latest');
}

async function getTransaction(txHash) {
  const provider = getProvider();
  const tx = await provider.getTransaction(txHash);
  
  if (!tx) {
    throw new Error(`Transaction with hash ${txHash} not found. Check if the hash is correct and exists on this network.`);
  }
  
  return tx;
}

async function getAccount(address) {
  const provider = getProvider();
  const balance = await provider.getBalance(address);
  const txCount = await provider.getTransactionCount(address);
  
  return {
    address,
    balance: ethers.utils.formatEther(balance),
    transactionCount: txCount
  };
}

module.exports = {
  getLatestBlock,
  getTransaction,
  getAccount
};
