import { ethers } from "hardhat";

async function main() {
    const CarMarketplace = await ethers.getContractFactory("CarMarketplace");
    const carMarketplace = await CarMarketplace.deploy();


    console.log("CarMarketplace deployed to:", await carMarketplace.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});