const NFT_Contract = artifacts.require("memeNFT");

module.exports = function(deployer) {
    deployer.deploy(NFT_Contract);
};