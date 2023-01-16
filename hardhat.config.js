/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.11",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: "https://eth-goerli.alchemyapi.io/v2/CadMuxF9mnzGWq1fyhEpIOHAUAN77jd5",
      accounts: [`0x71a9e82dffe5bfa5433a4f6f29e9564d3fab6093783ed9f968c28ce84e38e979`]
    }
  },
}
