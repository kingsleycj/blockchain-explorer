# Blockchain Explorer CLI

A command-line interface tool for exploring Ethereum blockchain data. This tool allows you to fetch information about blocks, transactions, and account balances directly from your terminal.

## Features

- 🔍 Get latest block information
- 💸 Look up transaction details by hash
- 💰 Check account balances and transaction counts
- 🎨 Colored output for better readability
- ⚡ Real-time data from the Ethereum network

## Prerequisites

- Node.js (v12 or higher)
- npm (Node Package Manager)
- An Infura API key (sign up at https://infura.io)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/kingsleycj/blockchain-explorer.git
cd blockchain-explorer
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
echo "INFURA_API_KEY=your_infura_api_key_here" > .env
```

## Usage

The CLI provides three main commands:

### Get Latest Block Information
```bash
npm start block
```
This will display:
- Block number
- Block hash
- Timestamp
- Number of transactions
- Sample transaction hashes for testing

### Look up Transaction Details
```bash
npm start tx <transaction-hash>
```
This will show:
- Transaction hash
- From address
- To address
- Value in ETH
- Gas price (in Gwei)
- Block number
- Transaction status

### Check Account Information
```bash
npm start account <ethereum-address>
```
This will display:
- Account address
- Current balance in ETH
- Total transaction count

## Dependencies

- commander: CLI framework
- ethers: Ethereum library
- chalk: Terminal styling
- dotenv: Environment variable management

## Error Handling

The tool includes comprehensive error handling for common issues:
- Invalid/missing Infura API key
- Network connectivity problems
- Invalid transaction hashes
- Invalid Ethereum addresses
- Rate limiting

## Troubleshooting

If you encounter issues:

1. Verify your Infura API key is correct in the `.env` file
2. Check your network connectivity
3. Ensure you're using valid transaction hashes or Ethereum addresses
4. Try using more recent transaction hashes
5. Verify you're on the correct network (mainnet, goerli, etc.)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
