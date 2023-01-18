// interact.js
require('dotenv').config()

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = require("../contractAddress_WL.json").address;
const PUBLIC_ADDRESS = process.env.PUBLIC_ADDRESS
const contract = require("../artifacts/contracts/WhitelistSale.sol/WhitelistSale.json");
const {ethers} = require("ethers");


const whitelisted = [
    "0x79Ea2d536b5b7144A3EabdC6A7E43130199291c0",
    "0x18c37f21D3C29f9a53A96CA678026DC660180065",
    "0x4B7E3FD09d45B97EF1c29085FCAe143444E422e8",
    "0x2f9C64174Afa42C87da579Cb8DffD3bb1301b6D9"
];

// provider - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);

// signer - you
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// contract instance
const helloWorldContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);


async function payToMint() {
    const connectedAccount = PUBLIC_ADDRESS
    const contract = helloWorldContract
    const amount = ethers.utils.parseEther('0.001')

    await contract.payToMint([
            '0xe0858ad5cab09e823c8559437a93634ff6d72b980375d8b6b5858caf806eaaca'
        ],
        {
            from: connectedAccount,
            value: amount._hex,
        }
    )
}

payToMint();