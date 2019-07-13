const Emitter = artifacts.require("Emitter");
const ConfirmValidator = artifacts.require("ConfirmValidator");
const EnergyToken = artifacts.require("EnergyToken");

module.exports = async (deployer, network, accounts) => {
    await deployer.deploy(Emitter);
    await deployer.deploy(ConfirmValidator, accounts[0]);
    await deployer.deploy(EnergyToken);

    const token = await EnergyToken.deployed();
    await token.addMinter(Emitter.address);

    const emitter = await Emitter.deployed();
    await emitter.addWhitelisted(accounts[0]);
    await emitter.addWhitelisted("0x964471033d7e1dc435e98337ef8267e23f76c379");   // add CPS' account
};

