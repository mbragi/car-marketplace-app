import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const FORK_RPC_URL =
  process.env.MAINNET_RPC_URL ||
  "https://eth-sepolia.g.alchemy.com/v2/9-PIwmEK19yyEu468y65gQSJEIjflXjA";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      forking: {
        url: FORK_RPC_URL,
      },
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "https://eth-sepolia.g.alchemy.com/v2/9-PIwmEK19yyEu468y65gQSJEIjflXjA",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || "",
  },
};

export default config;
