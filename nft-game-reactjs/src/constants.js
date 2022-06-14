const CONTRACT_ADDRESS = "0xa8E3f4C25989213e353183bd2907C440F44a097B";

const transformPersonaData = (personaData) => {
    return {
      name: personaData.name,
      imageUrl: personaData.imageUrl,
      Hp: personaData.Hp.toNumber(),
      maxHp: personaData.maxHp.toNumber(),
      attackDamage: personaData.attackDamage.toNumber(),
}
};
export {CONTRACT_ADDRESS, transformPersonaData};