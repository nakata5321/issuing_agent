const Emitter = artifacts.require("Emitter");
const ConfirmValidator = artifacts.require("ConfirmValidator");
// const EnergyToken = artifacts.require("EnergyToken");

module.exports = async (deployer, network, accounts) => {
    await deployer.deploy(Emitter);
    await deployer.deploy(ConfirmValidator);
    // await deployer.deploy(EnergyToken);

    //const token = await EnergyToken.deployed();
    //await token.addMinter(Emitter.address);

    const emitter = await Emitter.deployed();
    await emitter.addWhitelisted(accounts[0]);
    await emitter.addWhitelisted("0x964471033d7e1dc435e98337ef8267e23f76c379");   // add CPS' account
    await emitter.addWhitelisted("0x4D8a26e1f055c0b28D71cf1deA05f0f595a6975d");

    const validator = await ConfirmValidator.deployed();
    await validator.addWhitelisted(accounts[0]);
    await validator.addWhitelisted("0x4af74a76aA7B934C7397FDD0C2428762c8F7c550");
    await validator.addWhitelisted("0x00646b87655ef94Ec224eE6489Fc98FbE0EfAB6e");
};

