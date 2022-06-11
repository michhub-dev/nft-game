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
        [200, 150, 50, 45], // AttackDamage values
        [2, 3, 6, 4], // Defense
        [15, 10, 5, 18], //Energy level
        "Boss Kadunje", // Boss name
        "https://www.pngall.com/wp-content/uploads/5/The-Boss-Baby-PNG-Free-Image.png", // Boss Image Url 
        50000, //Boss Hp
        40 // Boss attack damage 
    );
   

    //@notice wait for the contract to officially mine and deploy to the local blockchain 
    await contractFactory.deployed();
    console.log("Contract deployed to..", contractFactory.address);

    console.log("------------------------------------------------------------");
    // call the mint function here
    let txn;
    txn = await contractFactory.mintNft(3);
    await txn.wait();

    console.log("------------------------------------------------------------");
  // Call attack function
    txn = await contractFactory.attackBossBaby();
    await txn.wait();

    console.log("------------------------------------------------------------");

    txn - await contractFactory.attackBossBaby();
    await txn.wait(); 

    console.log("------------------------------------------------------------");

    /* Get the value of the NFT URI 
    tokenURI is a function on every NFT that returns the actual data attached to the NFT
    */
    let getTokenUrl = await contractFactory.tokenURI(1);
    console.log("Token URI", getTokenUrl);
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