require('dotenv').config();
const { ethers } = require('ethers');

function getProvider(network = 'mainnet') {
  const infuraKey = process.env.INFURA_API_KEY;
  // Updated provider initialization for ethers v6
  return new ethers.InfuraProvider(network, infuraKey);
}

module.exports = { getProvider };