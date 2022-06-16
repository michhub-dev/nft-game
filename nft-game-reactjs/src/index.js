import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './Components/SelectPersona/SelectPersona.css';
import React, { useEffect, useState } from 'react';
import { CONTRACT_ADDRESS, transformPersonaData } from './constants';
import { ethers } from 'ethers';
import './utils/NftGame.json';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
