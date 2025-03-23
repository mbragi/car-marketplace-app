// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CarMarketplace {
    struct Car {
        uint256 id;
        string name;
        string model;
        string image;
        uint256 price;
        address owner;
        bool isListed;
    }

    mapping(uint256 => Car) private cars;
    uint256 private carCount;

    event CarListed(uint256 id, string name, string model, uint256 price, address owner);
    event CarSold(uint256 id, address buyer);

    function listCar(string memory _name, string memory _model, uint256 _price, string memory _image) external {
        carCount++;
        cars[carCount] = Car(carCount, _name, _model, _image, _price, msg.sender, true);
        emit CarListed(carCount, _name, _model, _price, msg.sender);
    }

    function buyCar(uint256 _id) external payable {
        Car storage car = cars[_id];
        require(car.isListed, "Car is not listed for sale");
        require(msg.value >= car.price, "Insufficient funds to buy the car");
        require(car.owner != msg.sender, "Owner cannot buy their own car");

        address seller = car.owner;
        car.owner = msg.sender;
        car.isListed = false;
        payable(seller).transfer(msg.value);
        emit CarSold(_id, msg.sender);
    }

    function getCar(uint256 _id) external view returns (Car memory) {
        return cars[_id];
    }

    function getAllCars() external view returns (Car[] memory) {
        Car[] memory carList = new Car[](carCount);
        for (uint256 i = 1; i <= carCount; i++) {
            carList[i - 1] = cars[i];
        }
        return carList;
    }
}
