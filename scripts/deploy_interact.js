const { network, run, ethers } = require('hardhat');
const fs = require('fs')
const { MerkleTree } = require('../src/merkleHelper');
const whitelist = require('../Whitelist.json');

const totalToBeMinted = 99;
const TEAM_ADDRESS = '0x9aaB929c32B3CCe2ec0FdBbB21DdD070Fb359fb6';
const reserved = 10;
const reservedNFTForWhitelist = 99;
const BASE_URI = 'https://boredNFT.mypinata.cloud/ipfs/Qmb3jHp92bNuKwXufmHjJVuKn9iEJBD/';

function printLog(msg) {
    console.log(msg);
}

async function main() {
    const [deployer] = await ethers.getSigners();
    const address = await deployer.getAddress();
    if (!deployer.provider) {
        process.exit(1);
    }
    const merkleTree = new MerkleTree(whitelist);

    const merkleRoot = merkleTree.getHexRoot();
    console.log('Computed merkleRoot:', merkleRoot);
    const { chainId } = await deployer.provider.getNetwork();

    console.log('Deploying BoredNFT on network:', network.name);
    console.log('Account address:', address);
    console.log(
        'Account balance:',
        ethers.utils.formatEther(await deployer.provider.getBalance(address)),
    );

    const boredNFTContractFactory = await ethers.getContractFactory('WL');

    printLog('Deploying BoredNFT...');
    const boredNFTContractImplementation = await boredNFTContractFactory.deploy(
        BASE_URI,
        TEAM_ADDRESS,
        totalToBeMinted,
        reserved,
        reservedNFTForWhitelist,
        merkleRoot,
    );
    await boredNFTContractImplementation.deployed();

    const deploymentInfo = {
        network: network.name,
        'BoredNFT Contract Address': boredNFTContractImplementation.address,
    };

    fs.writeFileSync(
        `deployments/${network.name}.json`,
        JSON.stringify(deploymentInfo, undefined, 2),
    );
    const args = [
        BASE_URI,
        TEAM_ADDRESS,
        totalToBeMinted,
        reserved,
        reservedNFTForWhitelist,
        merkleRoot,
    ];
    fs.writeFileSync(
        `argument.js`,
        `module.exports =${JSON.stringify(args, undefined, 2)};`,
    );
    printLog(
        `Latest Contract Address written to: deployments/${network.name}.json
     to verify your contract on etherscan run. 
     $ yarn hardhat verify --network rinkeby --constructor-args argument.js ${boredNFTContractImplementation.address}
     Note that you will need to provide an etherscan API key in your .env    
    `,
    );
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });