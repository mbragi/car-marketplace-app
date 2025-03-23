import { ethers } from "hardhat";

async function main() {
    const CarMarketplace = await ethers.getContractFactory("CarMarketplace");
    const carMarketplace = await CarMarketplace.deploy();

    await carMarketplace.deployed();

    console.log("CarMarketplace deployed to:", carMarketplace.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});