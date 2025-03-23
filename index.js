#!/usr/bin/env node
const { Command } = require('commander');
const chalk = require('chalk');
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
      const block = await getLatestBlock();
      console.log(chalk.green('Latest Block Information:'));
      console.log(chalk.yellow('Block Number:'), block.number);
      console.log(chalk.yellow('Hash:'), block.hash);
      console.log(chalk.yellow('Timestamp:'), new Date(block.timestamp * 1000).toLocaleString());
      console.log(chalk.yellow('Transaction Count:'), block.transactions.length);
    } catch (error) {
      console.error(chalk.red('Error fetching block:'), error.message);
    }
  });

// Command to get transaction details
program
  .command('tx <hash>')
  .description('Get details of a transaction by hash')
  .action(async (hash) => {
    try {
      const tx = await getTransaction(hash);
      console.log(chalk.green('Transaction Details:'));
      console.log(chalk.yellow('Hash:'), tx.hash);
      console.log(chalk.yellow('From:'), tx.from);
      console.log(chalk.yellow('To:'), tx.to);
      console.log(chalk.yellow('Value:'), ethers.utils.formatEther(tx.value), 'ETH');
      console.log(chalk.yellow('Gas Price:'), ethers.utils.formatUnits(tx.gasPrice, 'gwei'), 'Gwei');
      console.log(chalk.yellow('Block Number:'), tx.blockNumber);
    } catch (error) {
      console.error(chalk.red('Error fetching transaction:'), error.message);
      console.log(chalk.yellow('Tip:'), 'Make sure you are on the correct network and the transaction hash exists.');
    }
  });

// Command to get account information
program
  .command('account <address>')
  .description('Get information about an Ethereum address')
  .action(async (address) => {
    try {
      const account = await getAccount(address);
      console.log(chalk.green('Account Information:'));
      console.log(chalk.yellow('Address:'), account.address);
      console.log(chalk.yellow('Balance:'), account.balance, 'ETH');
      console.log(chalk.yellow('Transaction Count:'), account.transactionCount);
    } catch (error) {
      console.error(chalk.red('Error fetching account:'), error.message);
    }
  });

program.parse(process.argv);