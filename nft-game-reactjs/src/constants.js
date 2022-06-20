const CONTRACT_ADDRESS = "0x6d0b401B5EB68eBd87bB6dD6b605D1E966396339";

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