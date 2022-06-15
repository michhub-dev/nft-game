import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { CONTRACT_ADDRESS } from '../../constants';
import './SelectPersona.css';

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

    return (
        <div className='select-character-container'>
        <h2>Mint your hero to play the game</h2>
    </div>
    )
}
export default SelectPersona;