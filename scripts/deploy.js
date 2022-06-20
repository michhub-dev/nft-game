const main = async () => {
     //@dev this will compile the contract and generate neccesary file to work with the contract under artifect directory
    const gameContractFactory = await hre.ethers.getContractFactory("NftGame");

    const contractFactory = await gameContractFactory.deploy(
        ["Naruto", "Superman", "Fire-Binder", "Iron-Man"],  // Names
        ["https://imgur.com/a/luWMEp4",
        "https://imgur.com/a/P1rEt5A",
        "https://imgur.com/a/Ksda8n0",
        "https://imgur.com/a/Xv0cXbY"], // imagesUrl
        [100, 50, 25, 60], //Hp values
        [200, 150, 50, 45], // AttackDamage values
        [2, 3, 6, 4], // Defense
        [15, 10, 5, 18], //Energy level
        "Boss Kadunje", // Boss name
        "https://imgur.com/a/JCNpYsn",  // Boss Image Url 
         50000, //Boss Hp
         40 // Boss attack damage 
    );

    //@notice wait for the contract to officially mine and deploy to the local blockchain 
    await contractFactory.deployed();
   console.log("Contract deployed to ", contractFactory.address);
   

}
const runMain = async () => {
    try{
        await main();
        process.exit(0)
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
}
runMain();

