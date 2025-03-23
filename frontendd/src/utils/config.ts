import { defineChain } from "viem";

export const hardhatChain = defineChain({
 id: 31337,
 name: "Hardhat",
 network: "hardhat",
 nativeCurrency: {
 decimals: 18,
 name: "Ether",
 symbol: "ETH",
 },
 rpcUrls: {
 default: {
  http: ["http://localhost:8545"],
 },
 public: {
  http: ["http://localhost:8545"],
 },
 },
 blockExplorers: {
 default: {
  name: "Block Explorer",
  url: "http://localhost:8545",
 },
 },
 testnet: true,
});
