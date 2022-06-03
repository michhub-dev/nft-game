const main = async () => {
    //@dev this will compile the contract and generate neccesary file to work with the contract under artifect directory
    const gameContractFactory = await hre.ethers.getContractFactory("NftGame");
    const contractFactory = await gameContractFactory.deploy(
        ["Naruto", "Superman", "Fire-Binder", "Iron-Man"], // Names
        ["http://clipart-library.com/images/5cRX6857i.png",
         "http://clipart-library.com/images/6Tp6Kxxnc.jpg",
          "http://clipart-library.com/images/Acbzarqc4.jpg",
        "http://clipart-library.com/images/BTaM9pyT8.jpg"], // imagesUrl
        [100, 50, 25, 60], //Hp values
        [200, 150, 50, 45] // AttackDamage values
    );

    //@notice wait for the contract to officially mine and deploy to the local blockchain 
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