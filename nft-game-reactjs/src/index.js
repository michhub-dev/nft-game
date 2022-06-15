import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import React, { useEffect, useState } from 'react';
import SelectPersona from './Components/SelectPersona';
import { CONTRACT_ADDRESS, transformPersonaData } from './constants';
import { ethers } from 'ethers';
import NftGame from './utils/NftGame.json';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
