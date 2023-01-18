// interact.js
require('dotenv').config()

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = require("../contractAddress.json").address;
const PUBLIC_ADDRESS = process.env.PUBLIC_ADDRESS
const contract = require("../artifacts/contracts/Solove.sol/Solove_test.json");
const {ethers} = require("ethers");

// provider - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);

// signer - you
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// contract instance
const helloWorldContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);


const getEtheriumContract = () => {
    const connectedAccount = PUBLIC_ADDRESS

    if (connectedAccount) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, contractAbi, signer)

        return contract
    } else {
        return getGlobalState('contract')
    }
}

async function payToMint() {
    const connectedAccount = PUBLIC_ADDRESS
    const contract = helloWorldContract
    const amount = ethers.utils.parseEther('0.001')

    await contract.payToMint({
        from: connectedAccount,
        value: amount._hex,
    })
}

payToMint();
