const CONTRACT_ADDRESS = " 0x3Bc3b13e0235379a6455AcA5867d45781a069F74";

const transformPersonaData = (personaData) => {
    return {
      name: personaData.name,
      imageURI: personaData.imageURI,
      Hp: personaData.Hp.toNumber(),
      maxHp: personaData.maxHp.toNumber(),
      attackDamage: personaData.attackDamage.toNumber(),
};
};
export {CONTRACT_ADDRESS, transformPersonaData};