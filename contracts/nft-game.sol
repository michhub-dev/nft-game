// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.1;

// @title Turn based NFT game
// @author Michelle
// @notice Building an NFT game 

//NFT contract to inherit from 
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Helper functions from OpenZeppelin.
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// helper to encode in Base64
import "./libraries/Base64.sol";

import "hardhat/console.sol";

// Inherit from openzeppelin, the standard NFT contract 
 contract NftGame is ERC721 {

// @notice the character's attribute stored here
struct PersonaAttributes {
 string name;
 string imageUrl;
 uint256 attributeIndex;
 uint256 Hp;
 uint256 maxHp;
 uint256 attackDamage;
 uint256 defense;
 uint256 energyLevel;
}

// tokenId is the NFT unique identifier 
using Counters for Counters.Counter;
Counters.Counter private _tokenIds;

// store in an array
PersonaAttributes[] defaultPersonaAttributes;

// Mapping from the tokenId to the NFT attributes. Store state of the player's NFT
mapping (uint256 => PersonaAttributes) public nftOwnerAttributes;

struct BossData {
    string name;
    string imageUrl;
    uint256 Hp;
    uint256 maxHp;
    uint256 attackDamage;
}

BossData public bossData; 
/* A mapping from the address to the NFT tokenId.
 An easy way to store the owner of the NFT and reference it later */
mapping (address => uint256) public nftOwner;

    constructor(
        string[] memory personaNames,
        string[] memory personaImageUrl,
        uint256[] memory personaHp,
        uint256[] memory personaAttackDamage,
        uint256[] memory personaDefense,
        uint256[] memory personaEnergyLevel,
        string memory bossName, // New variable  
        string memory bossImageUrl,
        uint256 bossHp,
        uint256 bossAttackDamage                    
                                
    // name and symbol of the NFT token
    )
    ERC721 ("Hero Game", "HOGE")
    {
        //initialize the BossData and save it in the global 'bossData' state variable
       bossData = BossData({
           name: bossName,
           imageUrl: bossImageUrl,
           Hp: bossHp,
           maxHp: bossHp,
           attackDamage: bossAttackDamage
       }); 
       console.log("Done initializing Boss with Hp, ImageUri ", bossData.name, bossData.imageUrl, bossData.Hp);
    /*  @notice loop through all the attributes and save the values in the contract,
     to be used later when an NFT is minted */

        for (uint256 i = 0; i < personaNames.length; i +=1) {
            defaultPersonaAttributes.push(PersonaAttributes({
             name: personaNames[i],
             imageUrl: personaImageUrl[i],
             attributeIndex: i,
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
        _tokenIds.increment();
    }

    /* Users hit this function to get their NFT based on the attributeIndex they send in
     where the actual minting is happening. 
     @param _attributeIndex so players can specify which character they want
    */
    function mintNft(uint256 _attributeIndex) external {
         // get the current tokenId. It'll start at 1 since it was incremented
         uint256 newTokenId =  _tokenIds.current();

         /* assigning tokenId to the caller's wallet address
         this will mint the NFT with the Id, newTokenId to the users address, msg.sender
         */
         _safeMint(msg.sender, newTokenId);

         // map the tokenId to the persona attributes 
         nftOwnerAttributes[newTokenId] = PersonaAttributes({
             name: defaultPersonaAttributes[_attributeIndex].name,
             imageUrl: defaultPersonaAttributes[_attributeIndex].imageUrl,
             attributeIndex: _attributeIndex,
             Hp: defaultPersonaAttributes[_attributeIndex].Hp,
             maxHp: defaultPersonaAttributes[_attributeIndex].maxHp,
             attackDamage: defaultPersonaAttributes[_attributeIndex].attackDamage,
             defense: defaultPersonaAttributes[_attributeIndex].defense,
             energyLevel: defaultPersonaAttributes[_attributeIndex].energyLevel
         });
         console.log("Minted NFT with tokenId and attributeIndex", newTokenId, _attributeIndex);

    // Easy way to see who owns what NFT 
    nftOwner[msg.sender] = newTokenId;

    // increment the tokenId for the next token minted
    _tokenIds.increment();

    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        PersonaAttributes memory personAttribute = nftOwnerAttributes[_tokenId];

        string memory attrHp = Strings.toString(personAttribute.Hp);
        string memory attrMaxHp = Strings.toString(personAttribute.maxHp);
        string memory attrAttackDamage = Strings.toString(personAttribute.attackDamage);

        string memory json = Base64.encode(
            abi.encodePacked(
                '{"name": "',
                personAttribute.name,
                '-- NFT #:',
                Strings.toString(_tokenId),
                '", "description": "This is an NFT that lets people choose a prefered persona to play a game", "image": "',
                personAttribute.imageUrl,
         '", "attributes": [ { "trait_type": "Health Points", "value": ',attrHp,', "max_value":',attrMaxHp,'}, { "trait_type": "Attack Damage", "value": ',
      attrAttackDamage,'} ]}'
            )
        );

        string memory combineData = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        return combineData;
    }
    function attackBossBaby() public {
        /* 
        Get the state of the player's NFT 
        1. grab the NFT tokenId that the player owns using nftOwner[msg.sender]
        2. grab the player's attribute using nftOwnerAttributes[]
        */
        uint256 playerTokenId = nftOwner[msg.sender];
        PersonaAttributes storage player = nftOwnerAttributes[playerTokenId];

        console.log("player with character about to attack w/% Hp, attackDamage", player.name, player.Hp, player.attackDamage);
        console.log("Boss has Hp and AttackDamage", bossData.name, bossData.Hp, bossData.attackDamage);
     
     // Ensure the player has more than 0 Hp
      require(player.Hp > 0, "Error: character must have Hp to attack boss");
   
   // Ensure the boss has more than 0 Hp
     require(bossData.Hp > 0, "Error: Boss must have Hp to attack" );
}
}