require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    rinkeby: {
      url: 'YOUR ALCHEMY_API_URL',
      accounts: ['9947f7669069318bd168057b066506ddca6f7a89e26b4b82b85bc93'],
    },
  },
};
