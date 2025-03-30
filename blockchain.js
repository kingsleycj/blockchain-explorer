const ethers = require('ethers');
const { getProvider } = require('./config');

console.log('Ethers version:', ethers.version);
// console.log('Ethers Object:', ethers);

function validateProvider(provider) {
  if (!provider) {
    console.log('Error: Provider is undefined. Check your Infura API key or network setup.');
    process.exit(1); // Exit to prevent further errors
  }
}

async function getLatestBlock() {
  try {
    const provider = getProvider();
    validateProvider(provider);

    const block = await provider.getBlock('latest');

    if (!block) {
      throw new Error('Unable to fetch the latest block');
    }

    return block;
  } catch (error) {
    console.log('Error in getLatestBlock:', error.message);
    throw error;
  }
}

async function getTransaction(txHash) {
  try {
    const provider = getProvider();
    validateProvider(provider);

    console.log(`Looking up transaction: ${txHash}`);

    const tx = await provider.getTransaction(txHash);
    if (!tx) {
      throw new Error(`Transaction not found: ${txHash}`);
    }

    let receipt = null;
    if (tx.blockNumber) {
      receipt = await provider.getTransactionReceipt(txHash);
    }

    return {
      hash: tx.hash,
      from: tx.from,
      to: tx.to || '(Contract Creation)',
      value: tx.value ? ethers.formatEther(tx.value) : '0',
      gasPrice: tx.gasPrice || tx.maxFeePerGas,
      blockNumber: tx.blockNumber || 'Pending',
      status: receipt ? (receipt.status === 1 ? 'Success' : 'Failed') : 'Pending'
    };
  } catch (error) {
    console.log('Error in getTransaction:', error.message);
    throw error;
  }
}

async function getAccount(address) {
  try {
    const provider = getProvider();
    if (!provider) {
      throw new Error('Provider is undefined. Check your Infura API key or network setup.');
    }

    if (!ethers.isAddress(address)) {
      throw new Error(`Invalid Ethereum address: ${address}`);
    }

    const balance = await provider.getBalance(address);
    console.log('Balance before formatting:', balance.toString());

    const txCount = await provider.getTransactionCount(address);

    // Check Ethers version and apply formatting accordingly
    const formatEther = ethers.formatEther || (ethers.utils ? ethers.utils.formatEther : null);
    if (!formatEther) {
      throw new Error('Ethers.formatEther is undefined. Check your ethers version.');
    }

    return {
      address,
      balance: formatEther(balance),
      transactionCount: txCount
    };
  } catch (error) {
    console.log('Error in getAccount:', error.message);
    throw error;
  }
}


module.exports = {
  getLatestBlock,
  getTransaction,
  getAccount
};
