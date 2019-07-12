const Emitter = artifacts.require("Emitter");
const ConfirmValidator = artifacts.require("ConfirmValidator");
const EnergyToken = artifacts.require("EnergyToken");

module.exports = async (deployer, network, accounts) => {
    await deployer.deploy(Emitter);
    await deployer.deploy(ConfirmValidator, accounts[0]);
    await deployer.deploy(EnergyToken);

    const token = await EnergyToken.deployed();
    await token.addMinter(Emitter.address);
};

