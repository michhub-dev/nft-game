const main = async () => {
    ///@dev this will compile the contract and generate neccesary file to work with the contract under artifect directory
    const gameContractFactory = await hre.ethers.getContractFactory("NftGame");
    const contractFactory = await gameContractFactory.deploy();

    ///@dev wait for the contract to officially mine and deploy to the local blockchain 
    await contractFactory.deployed();
    console.log("Contract deployed to..", contractFactory.address);
}

const runMain = async () => {
    try{
        await main();
        process.exit(0);
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
}
runMain();