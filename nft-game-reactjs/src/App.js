import React, { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import SelectPersona from './Components/SelectPersona';
import { CONTRACT_ADDRESS, transformPersonaData } from './constants';
import { ethers } from 'ethers';
import NftGame from './utils/NftGame.json'

// Constants
const TWITTER_HANDLE = 'michyToken';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  //To store the accounts
const [userAccount, setUserAccount] = useState(null);
const [personaNFT, setPersonaNFT] = useState(null);

  // check if there's ethereum in the browser
  const IsWalletConnected = async() => {

      try {
          
        // Ensure we have access to window.ethereum  
        const { ethereum } = window; 

        if(!ethereum) {
          console.log("You need ethereum wallet to access this site!")
          return;
        } else {
                 console.log("You can proceed to connect your wallet", ethereum)
                  
                  // If we are authorized to access the user's wallet
                  const accounts = await ethereum.request({method: 'eth_accounts'});

                    // if user has more than one account then grab the first one
                  if (accounts.length !== 0) {
                    const account = accounts[0]
                    console.log("We have found an account", account)
                    setUserAccount(account)
                  } else {
                      console.log("Didn't find an authorized account")
                  }
               }
      } catch (error) {
              console.log(error)
          }

          };
          // Render method
          const renderComponent = () => {
            
            if (!userAccount) {
              return (
                <div className="connect-wallet-container">
                <iframe src="https://giphy.com/embed/xUA7aYT1c2devuWIFO"
                title='nft-game' width="480" height="262" frameBorder="0" allowFullScreen></iframe>
                 <p className='footer-text'>Who's the hero!</p>

                 
              <button className='cta-button connect-wallet-button'
              onClick={connectToWallet}>Connect Your Wallet to Play</button>
            </div>
              );

            } else if (userAccount && !personaNFT) {
               return (
                <SelectPersona setPersonaNFT={setPersonaNFT} />
               )
            }
          };
// Define connect wallet
const connectToWallet = async () => {
        try {
              // Ensure we have access to ethereum 
              const { ethereum } = window;

              if (!ethereum) {
                alert("Get Metamask!")
                return;
              }
            // Request access to the account 
              const accounts = await ethereum.request({method: 'eth_requestAccounts'});

              console.log("Connected", accounts[0])
              setUserAccount(accounts[0]);
        } catch (error) {
               console.log(error);
             }
}

    // this will run the function when the page loads
    useEffect(() => {
      const checkForNetwork = async () => {
        try {
           if (window.ethereum.networkVersion !== '4') {
             alert("You need to connect to the rinkeby network!")
           }
        } catch(error) {
          console.log(error)
        }
      } 
      IsWalletConnected();
    },[]);
  
  useEffect(() => {
         //The function that will interact with the smart contract 
    const getNftMetadata = async () => {
           console.log("Checking for persona NFT on contract address", userAccount)
           
           /* Main logic to setup the ethers object and call the contract 
           'Provider' is use to actually talk to Ethereum nodes.
           */
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer =  provider.getSigner();

            // This will create the actual connection to the contract 
            const gameContract = new ethers.Contract(CONTRACT_ADDRESS, NftGame.abi, signer);
            
            // Call the function from the contract that checks if a user already has an NFT 
            const txn = await gameContract.userHasNft();

            if (txn.name) {
              console.log("User has persona NFT");
              setPersonaNFT(transformPersonaData(txn));
            } else {
              console.log("No persona NFT found");
            }
         };
           
            // Only run the function if there is a connected wallet 
      if (userAccount) {
          console.log("UserAccount", userAccount)
          getNftMetadata();
        }    

           
  },[userAccount])

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">⚔️ Hero Game ⚔️</p>
          <p className="sub-text">Team up to protect the Metaverse!</p>
           {renderComponent()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
