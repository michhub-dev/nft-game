import React, { useEffect, useState } from 'react';
import './SelectPersona.css';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, transformPersonaData } from '../../constants.js';
import NftGame from '../../utils/NftGame.json';


const SelectPersona = ({ setPersonaNFT }) => {
   const [ personas, setPersonas ] = useState([]);
   const [ gameContract, setGameContract ] = useState(null);
  
   // Action to call mint function 
   const mintPersonaNFTAction = async (personaId) => {
     try{

        if (gameContract) {
            console.log("Minting persona...");
            const mintTXN = await gameContract.mintNft(personaId);
            await mintTXN.wait();
            console.log("mintTXN", mintTXN);
        }
     } catch (error) {
        console.warn("mintPersonaNFTAction error", error);
     };
   }; 

  useEffect(() =>{
    const { ethereum } = window;

    if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const gameContract = new ethers.Contract(CONTRACT_ADDRESS, NftGame.abi, signer);
       
        // Set the gameContract in state
        setGameContract(gameContract);
    } else {
        console.log("Ethereum object not found")
    }

  },[]);

  useEffect(() => {
    const getPersonas = async () => {
        try {
            console.log("Trying to get contract to mint...");

            //call contract to get all mintable personas
            const personasTXN = await gameContract.retrieveDefaultAttributes();
            console.log("personasTXN", personasTXN);

            // Go through all the personas and transform the data
            const personas = personasTXN.map((personaData) => 
                transformPersonaData(personaData)  
            );
            console.log("personas", personas);

            // Set all mintable personas in state
            setPersonas(personas);
        } catch(error) {
          console.log("Something went wrong fetching personas. Couldn't get personas", error);
        }
    };

      /* A callback method that will fire when this event is received.
         The method is called anytime a new persona NFT is minted 
       */
      const onPersonaMint = async ( sender, tokenId, personaIndex ) => {
             console.log(` onPersonaMint - sender: ${sender}, tokenId: ${tokenId}, personaIdex: ${personaIndex}`);
      

            /* Once persona Nft is minted, fetch the metadata from the contract
            and set it in state to move onto the arena 
            */ 
            if (gameContract) {
            const personaNFT = await gameContract.userHasNft();
            console.log("personaNFT", personaNFT);
            setPersonaNFT(transformPersonaData(personaNFT));
            }
      };  

    // If gameContract is ready, get personas
    if (gameContract) {
        getPersonas();

        // Setup NFT minted listener 
        gameContract.on('personaAttributeMinted', onPersonaMint);
    }

    return () => {
        // When the component unmounts, clean the listener
        if (gameContract) {
            gameContract.off('personaAttributeMinted', onPersonaMint);
        }
    };
  },[gameContract]);
  
  //Render function
  const renderPersonas = () => 
     personas.map((persona, index) => (
        <div className='character-item' key={persona.name}>
            <div className='name-container'>
                <p>{persona.name}</p>
            </div>
            <img  src={persona.imageURI} alt={persona.name} 
                 />
            <button type="button" className="character-mint-button" onClick={() => mintPersonaNFTAction(index)}>
                {`Mint ${persona.name}`}
             </button>
        </div>
     ));

   return (
    <div className='select-character-container'>
        <h2>Mint your hero to play the game. Choose wisely!</h2>
     {/* Only show this when there are personas in state */}
     {personas.length > 0 && (
        <div className='character-grid'>{renderPersonas()}</div>
     )}
    </div>
   );
}
 export default SelectPersona;