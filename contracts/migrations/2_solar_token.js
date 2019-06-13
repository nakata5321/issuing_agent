const SolarToken = artifacts.require("SolarToken");

module.exports = async (deployer) => {
  await deployer.deploy(SolarToken);
};
