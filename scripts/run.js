const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory("NftGame");
    const contractFactory = await gameContractFactory.deploy();
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