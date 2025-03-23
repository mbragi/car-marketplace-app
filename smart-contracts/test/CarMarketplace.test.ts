import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("CarMarketplace", function () {
  async function deployCarMarketplaceFixture() {
    const [owner, buyer, otherAccount] = await ethers.getSigners();
    const CarMarketplace = await ethers.getContractFactory("CarMarketplace");
    const carMarketplace = await CarMarketplace.deploy();
    return { carMarketplace, owner, buyer, otherAccount };
  }

  describe("Deployment", function () {
    it("should return an empty list when no car is listed", async function () {
      const { carMarketplace } = await loadFixture(deployCarMarketplaceFixture);
      const cars = await carMarketplace.getAllCars();
      expect(cars.length).to.equal(0);
    });
  });

  describe("Listing", function () {
    it("should allow a user to list a car and store its details correctly", async function () {
      const { carMarketplace, owner } = await loadFixture(
        deployCarMarketplaceFixture
      );
      const price = ethers.parseEther("10");
      const tx = await carMarketplace.listCar(
        "Tesla",
        "Model S",
        price,
        "tesla-model-s.jpg"
      );
      await tx.wait();
      await expect(tx)
        .to.emit(carMarketplace, "CarListed")
        .withArgs(1, "Tesla", "Model S", price, owner.address);
      const car = await carMarketplace.getCar(1);
      expect(car.id).to.equal(1);
      expect(car.name).to.equal("Tesla");
      expect(car.model).to.equal("Model S");
      expect(car.price).to.equal(price);
      expect(car.owner).to.equal(owner.address);
      expect(car.isListed).to.equal(true);
    });

    it("should list multiple cars and return them via getAllCars", async function () {
      const { carMarketplace } = await loadFixture(deployCarMarketplaceFixture);
      const price1 = ethers.parseEther("10");
      const price2 = ethers.parseEther("20");
      await (
        await carMarketplace.listCar("CarA", "Model A", price1, "car-a.jpg")
      ).wait();
      await (
        await carMarketplace.listCar("CarB", "Model B", price2, "car-b.jpg")
      ).wait();
      const allCars = await carMarketplace.getAllCars();
      expect(allCars.length).to.equal(2);
      expect(allCars[0].id).to.equal(1);
      expect(allCars[0].name).to.equal("CarA");
      expect(allCars[1].id).to.equal(2);
      expect(allCars[1].name).to.equal("CarB");
    });
  });

  describe("Buying", function () {
    it("should revert when trying to buy a non-existent car", async function () {
      const { carMarketplace, buyer } = await loadFixture(
        deployCarMarketplaceFixture
      );
      const price = ethers.parseEther("10");
      await expect(carMarketplace.connect(buyer).buyCar(1, { value: price })).to
        .be.reverted;
    });

    it("should revert if insufficient funds are provided", async function () {
      const { carMarketplace, buyer } = await loadFixture(
        deployCarMarketplaceFixture
      );
      const price = ethers.parseEther("10");
      await (
        await carMarketplace.listCar("Audi", "A4", price, "audi-a4.jpg")
      ).wait();
      await expect(
        carMarketplace
          .connect(buyer)
          .buyCar(1, { value: ethers.parseEther("5") })
      ).to.be.revertedWith("Insufficient funds to buy the car");
    });

    it("should revert if the car owner tries to buy their own car", async function () {
      const { carMarketplace, owner } = await loadFixture(
        deployCarMarketplaceFixture
      );
      const price = ethers.parseEther("10");
      await (
        await carMarketplace.listCar("BMW", "X5", price, "bmw-x5.jpg")
      ).wait();
      await expect(
        carMarketplace.buyCar(1, { value: price })
      ).to.be.revertedWith("Owner cannot buy their own car");
    });

    it("should update ether balances when a valid buyer purchases a listed car", async function () {
      const { carMarketplace, owner, buyer } = await loadFixture(
        deployCarMarketplaceFixture
      );
      const price = ethers.parseEther("10");
      await (
        await carMarketplace.listCar(
          "Mercedes",
          "C-Class",
          price,
          "mercedes-c-class.jpg"
        )
      ).wait();
      await expect(() =>
        carMarketplace.connect(buyer).buyCar(1, { value: price })
      ).to.changeEtherBalances([owner, buyer], [price, -price]);
    });

    it("should emit CarSold event when a valid buyer purchases a listed car", async function () {
      const { carMarketplace, buyer } = await loadFixture(
        deployCarMarketplaceFixture
      );
      const price = ethers.parseEther("10");
      await (
        await carMarketplace.listCar(
          "Mercedes",
          "C-Class",
          price,
          "mercedes-c-class.jpg"
        )
      ).wait();
      const tx = await carMarketplace
        .connect(buyer)
        .buyCar(1, { value: price });
      await expect(tx)
        .to.emit(carMarketplace, "CarSold")
        .withArgs(1, buyer.address);
    });

    it("should update the car state when a valid buyer purchases a listed car", async function () {
      const { carMarketplace, buyer } = await loadFixture(
        deployCarMarketplaceFixture
      );
      const price = ethers.parseEther("10");
      await (
        await carMarketplace.listCar(
          "Mercedes",
          "C-Class",
          price,
          "mercedes-c-class.jpg"
        )
      ).wait();
      await carMarketplace.connect(buyer).buyCar(1, { value: price });
      const car = await carMarketplace.getCar(1);
      expect(car.owner).to.equal(buyer.address);
      expect(car.isListed).to.equal(false);
    });
  });
});
