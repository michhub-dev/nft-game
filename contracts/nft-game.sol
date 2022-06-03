// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

/// @title Turn based NFT game
/// @author Michelle
/// @notice Building an NFT game 

import "hardhat/console.sol";

contract NftGame {
/// @notice the character's attribute stored here
struct PersonaAttributes {
 string name;
 string imageUrl;
 uint256 id;
 uint256 Hp;
 uint256 maxHp;
 uint256 attackDamage;
 uint256 defense;
 uint256 energyLevel;
}
/// store in an array
PersonaAttributes[] defaultPersonaAttributes;

    constructor(
        string[] memory personaNames,
        string[] memory personaImageUrl,
        uint256[] memory personaHp,
        uint256[] memory personaAttackDamage,
        uint256[] memory personaDefense,
        uint256[] memory personaEnergyLevel
    )
    {
    /// @dev loop through all the attributes and save the values in the contract,
    /// to be used later when an NFT is minted
        for (uint256 i = 0; i < personaNames.length; i +=1) {
            defaultPersonaAttributes.push(PersonaAttributes({
             name: personaNames[i],
             imageUrl: personaImageUrl[i],
             id: i,
             Hp: personaHp[i],
             maxHp: personaHp[i],
           attackDamage: personaAttackDamage[i],
           defense: personaDefense[i],
           energyLevel: personaEnergyLevel[i]
            }));
        PersonaAttributes memory a = defaultPersonaAttributes[i];
        console.log("Successfully initialize with name, imageUrl, hp..", a.name, a.Hp, a.imageUrl);

        }
    }
}