#!/usr/bin/env node
const { Command } = require('commander');
const chalk = require('chalk');
const { ethers } = require('ethers'); 
const { getLatestBlock, getTransaction, getAccount } = require('./blockchain');

const program = new Command();

program
  .name('blockchain-explorer')
  .description('A CLI tool to explore blockchain data')
  .version('1.0.0');

// Command to get latest block
program
  .command('block')
  .description('Get information about the latest block')
  .action(async () => {
    try {
      console.log(chalk.green('Fetching latest block...'));
      const block = await getLatestBlock();
      
      console.log(chalk.green('\nLatest Block Information:'));
      console.log(chalk.yellow('Block Number:'), block.number);
      console.log(chalk.yellow('Hash:'), block.hash);
      console.log(chalk.yellow('Timestamp:'), new Date(block.timestamp * 1000).toLocaleString());
      console.log(chalk.yellow('Transaction Count:'), block.transactions.length);
      
      // Show some transaction hashes for testing
      if (block.transactions.length > 0) {
        console.log(chalk.green('\nSample Transactions (for testing):'));
        const sampleSize = Math.min(3, block.transactions.length);
        for (let i = 0; i < sampleSize; i++) {
          console.log(chalk.yellow(`Transaction ${i+1}:`), block.transactions[i]);
        }
        console.log(chalk.green('\nTry running: npm start tx <HASH> with one of these transaction hashes'));
      }
    } catch (error) {
      console.error(chalk.red('\nError:'), error.message);
      console.log(chalk.yellow('\nTroubleshooting tips:'));
      console.log('1. Check that your Infura API key is correct in .env file');
      console.log('2. Verify network connectivity');
    }
  });

// Command to get transaction details
program
  .command('tx <hash>')
  .description('Get details of a transaction by hash')
  .action(async (hash) => {
    try {
      console.log(chalk.green('Looking up transaction...'));
      const tx = await getTransaction(hash);
      
      console.log(chalk.green('\nTransaction Details:'));
      console.log(chalk.yellow('Hash:'), tx.hash);
      console.log(chalk.yellow('From:'), tx.from);
      console.log(chalk.yellow('To:'), tx.to);
      console.log(chalk.yellow('Value:'), tx.value, 'ETH');

      // Handle cases where gasPrice might be null or undefined
      if (tx.gasPrice) {
        console.log(chalk.yellow('Gas Price:'), ethers.formatUnits(tx.gasPrice, 'gwei'), 'Gwei');
      }
      
      console.log(chalk.blueBright('Block Number:'), tx.blockNumber);
      console.log(chalk.greenBright('Status:'), tx.status);
    } catch (error) {
      console.error(chalk.red('\nError:'), error.message);
      console.log(chalk.yellow('\nTroubleshooting tips:'));
      console.log('1. Check that your Infura API key is correct in .env file');
      console.log('2. Verify you\'re on the correct network (mainnet, goerli, etc.)');
      console.log('3. Confirm the transaction hash exists and is valid');
      console.log('4. Try a more recent transaction hash');
    }
  });

// Command to get account information
program
  .command('account <address>')
  .description('Get information about an Ethereum address')
  .action(async (address) => {
    try {
      console.log(chalk.green('Fetching account information...'));

      const account = await getAccount(address);

      console.log(chalk.green('\nAccount Information:'));
      console.log(chalk.yellow('Address:'), account.address);
      console.log(chalk.yellow('Balance:'), account.balance, 'ETH'); 
      console.log(chalk.yellow('Transaction Count:'), account.transactionCount);
    } catch (error) {
      console.error(chalk.red('\nError fetching account:'), error.message);
    }
  });

program.parse(process.argv);