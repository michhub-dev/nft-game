// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

/// @title Turn based NFT game
/// @author Michelle
/// @notice Building an NFT game 

import "hardhat/console.sol";

contract NftGame {
/// @notice the character's attribute stored here
struct Persona {
 string name;
 string imageUrl;
 uint256 id;
 uint256 Hp;
 uint256 maxHp;
 uint256 attackDamage;
 uint256 defense;
 uint256 energyLevel;
}

Persona[] defaultPersona;

    constructor() {
        console.log("Hey, this is my NFT game!");
    }
}