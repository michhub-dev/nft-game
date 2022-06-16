import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { CONTRACT_ADDRESS, transformPersonaData } from '../../constants';
import './SelectPersona.css';
import NftGame from '../../utils/NftGame.json';

const SelectPersona = ({ setPersonaNFT }) => {
    
    const [attributes, setAttributes] = useState([]);
    const [gameContract, setGameContract] = useState(null);

    useEffect(() =>{
     
        const {ethereum} = window;

        if(ethereum) {

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const gameContract = new ethers.Contract(CONTRACT_ADDRESS, NftGame.abi, signer);
      // store in state variable
      setGameContract(gameContract);

        } else {
            console.log("Ethereum object not found");
        }
       

    },[])

   useEffect(() => {

        const getPersonas = async () => {
            try {
                console.log("Getting contract personas to mint")
             
                // Call contract to get all mintable personas
                const PersonaTXN = await gameContract.retrieveDefaultAttributes();
                console.log("PersonaTXN", PersonaTXN);
             
                // Go through all the data and transform them
                const personas = PersonaTXN.map((personaData) => {
                    transformPersonaData(personaData);
                });
               
                // Set all the mintable characters in state
                setAttributes(personas)
            } catch (error) {
                console.log( "Something went wrong while fetching data", error)
            }
        }

        // If the gameContract is ready, then display personas 
        if (gameContract) {
            getPersonas(); 
        }
    },[gameContract])


    return (
        <div className='select-character-container'>
        <h2>Mint your hero to play the game</h2>
    </div>
    )
}
export default SelectPersona;