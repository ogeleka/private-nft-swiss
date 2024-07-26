require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  defaultNetwork: "swisstronik",
  solidity: "0.8.20",
  networks: {
    swisstronik: {
      url: "https://json-rpc.testnet.swisstronik.com/", //URL of the RPC node for Swisstronik.
      accounts: [`0x` + `${process.env.PRIVATE_KEY}`], //
      //Make sure you have enough funds in this wallet to deploy the smart contract
    },
	bsctestnet: {
      url: "https://data-seed-prebsc-2-s3.binance.org:8545/",
	  chainId: 97,	  //URL of the RPC node for Swisstronik.
      accounts: [`0x` + `${process.env.PRIVATE_KEY}`], //
      //Make sure you have enough funds in this wallet to deploy the smart contract
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://bscscan.com/
    apiKey: "5ADJCEV3JP77R8E8ZV1VME9NJVU2EVE3V4"
  },
};
