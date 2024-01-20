# Quillo - Tokenizing Company Shares on the ICP Blockchain

Quillo is a platform designed to tokenize company shares using the Internet Computer (ICP) blockchain. It leverages the Rust CDK for smart contract development and React.js for the user interface. The platform allows companies to onboard, undergo valuation using Discounted Cash Flow and Multiple of earnings algorithms to tokenize a portion of their shares, and facilitate trading of these tokens on the blockchain.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Valuation Algorithm:** Utilizes Multiple of earnings and Discounted Cash flow methods for comprehensive valuation.
- **Tokenization:** Converts a specified percentage of company shares into tokens for trading.
- **Investor Trading:** Allows investors to buy, sell, and trade these tokens on the ICP blockchain.
- **Liquidity:** Provides liquidity options for investors to buy fractions of tokens.
- **Financial Statement Updates:** Companies can regularly update their financial statements for reevaluation.

## Installation

### Prerequisites

Make sure you have the following installed on your system:

- Rust: [Installation Guide](https://www.rust-lang.org/learn/get-started)
- Node.js: [Download Page](https://nodejs.org/)
- DFINITY Canister SDK (dfx): [Installation Guide](https://sdk.dfinity.org/docs/quickstart/quickstart.html)

### Clone and Build

1. Clone the Quillo repository:

   ```bash
   git clone https://github.com/your-username/quillo.git
   cd quillo
   ```

## Usage

1. **Run Locally:**

   Start the local development environment:

   ```bash
   dfx start --background
   ```

   Build and Deploy the canisters locally:

   ```bash
   npm run gen-deploy
   ```

2. **Interact with the UI:**

   Access the web interface by navigating to the generated url on your browser.

## License

This project is licensed under the [MIT License](LICENSE).
