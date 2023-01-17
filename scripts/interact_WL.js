// interact.js
require('dotenv').config()

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = require("../contractAddress_WL.json").address;
const PUBLIC_ADDRESS = process.env.PUBLIC_ADDRESS
const contract = require("../artifacts/contracts/WhitelistSale.sol/WhitelistSale.json");
const {ethers} = require("ethers");
const { MerkleTree } = require("merkletreejs");
const { keccak256 } = ethers.utils;

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

// Merkle Tree
const tree = new MerkleTree(leaves, keccak256, { sort: true });
const merkleProof = tree.getHexProof(padBuffer(whitelisted[0].address));

async function payToMint() {
    const connectedAccount = PUBLIC_ADDRESS
    const contract = helloWorldContract
    const amount = ethers.utils.parseEther('0.001')

    await contract.payToMint(amount, [
            '0x08bb9ce92be20031b31597d37daa1c710227e4102c89b5437053cdc1462b1737',
            '0x702d0f86c1baf15ac2b8aae489113b59d27419b751fbf7da0ef0bae4688abc7a',
            '0xb159efe4c3ee94e91cc5740b9dbb26fc5ef48a14b53ad84d591d0eb3d65891ab'
        ]
    )
}

payToMint();