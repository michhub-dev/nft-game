import React, { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

// Constants
const TWITTER_HANDLE = 'michyToken';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  //To store the accounts
const [userAccount, setUserAccount] = useState(null);
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


    // this will run the function when the page loads
    useEffect(() => {
      IsWalletConnected();
    },[]);
  

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">⚔️ Hero Game ⚔️</p>
          <p className="sub-text">Team up to protect the Metaverse!</p>
          <div className="connect-wallet-container">
          <iframe src="https://giphy.com/embed/xUA7aYT1c2devuWIFO" title='nft-game' width="480" height="262" frameBorder="0" allowFullScreen></iframe><p>Who's the hero!</p>
          </div>
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
