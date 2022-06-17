const main = async () => {
     //@dev this will compile the contract and generate neccesary file to work with the contract under artifect directory
    const gameContractFactory = await hre.ethers.getContractFactory("NftGame");

    const contractFactory = await gameContractFactory.deploy(
        ["Naruto", "Superman", "Fire-Binder", "Iron-Man"],  // Names
        ["./images/naruto.png",
        "./images/superman.jpg",
        "./images/fire-binder.jpg",
        "./images/iron-man.jpg"], // imagesUrl
        [100, 50, 25, 60], //Hp values
        [200, 150, 50, 45], // AttackDamage values
        [2, 3, 6, 4], // Defense
        [15, 10, 5, 18], //Energy level
        "Boss Kadunje", // Boss name
         "./images/boss-kadunje.png", // Boss Image Url 
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

// current contract address 0x530ddDFbBb459Af282B44594323Cf8d483825Db3