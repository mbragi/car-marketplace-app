// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICarMarketplace {
 struct Car {
        uint256 id;
        string name;
        string model;
        string image;
        uint256 price;
        address owner;
        bool isListed;
    }
    function listCar(string memory name, string memory model, uint256 price, string memory image) external;
    function buyCar(uint256 carId) external payable;
    function getCar(uint256 carId) external view returns (string memory name, string memory model, uint256 price, string memory image, address owner);
    function getAllCars() external view returns (Car[] memory);
}