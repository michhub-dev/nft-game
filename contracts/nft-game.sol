// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// @title Turn based NFT game
// @author Michelle
// @notice Building an NFT game 

//NFT contract to inherit from 
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Helper functions from OpenZeppelin.
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


import "hardhat/console.sol";

// Inherit from openzeppelin, the standard NFT contract 
 contract NftGame is ERC721 {

// @notice the character's attribute stored here
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

// tokenId is the NFT unique identifier 
using Counters for Counters.Counter;
Counters.Counter private _tokenId;

// store in an array
PersonaAttributes[] defaultPersonaAttributes;

// Mapping from the tokenId to the NFT attributes
mapping (uint256 => PersonaAttributes) public nftOwnerAttributes;

/* A mapping from the address to the NFT tokenId.
 An easy way to store the owner of the NFT and reference it later */
mapping (address => uint256) public nftOwner;

    constructor(
        string[] memory personaNames,
        string[] memory personaImageUrl,
        uint256[] memory personaHp,
        uint256[] memory personaAttackDamage,
        uint256[] memory personaDefense,
        uint256[] memory personaEnergyLevel

    // name and symbol of the NFT token
    )
    ERC721 ("Hero Game", "HOGE")
    {
    /*  @notice loop through all the attributes and save the values in the contract,
     to be used later when an NFT is minted */

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
        //increment the tokenId so that the first NFT has the id of 1
        _tokenId.increment();
    }

    // Users hit this function to get their NFT based on the attributeId they send in
    function mintNft(uint256 _attributeId) external {
         // get the current tokenId. It'll start at 1 since it was incremented
         uint256 newTokenId =  _tokenId.current();

         //assigning tokenId to the caller's wallet address
         _safeMint(msg.sender, newTokenId);
    }
}