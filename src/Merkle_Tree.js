
// 1. Imports
const { ethers } = require("ethers");
const { MerkleTree } = require("merkletreejs");
const { keccak256 } = ethers.utils;

// 2. Whitelisted addresses
const whitelisted = [
    "0x79Ea2d536b5b7144A3EabdC6A7E43130199291c0",
    "0x18c37f21D3C29f9a53A96CA678026DC660180065",
    "0x4B7E3FD09d45B97EF1c29085FCAe143444E422e8",
];

// 3. Creating a buffer since we bytes array
const padBuffer = (addr) => {
    return Buffer.from(addr.substr(2).padStart(32 * 2, 0), "hex");
};

// 4. Creating buffer from leaves (lowest points in tree)
const leaves = whitelisted.map((address) => padBuffer(address));
const tree = new MerkleTree(leaves, keccak256, { sort: true });

// 5. Creating a merkleRoot that we'll inject into smart contract
const merkleRoot = tree.getHexRoot();
console.log('Root: ', merkleRoot)

// 6. Calculating merkleProof to check if an address is whitelisted
const merkleProof = tree.getHexProof(padBuffer(whitelisted[0]));
console.log('Proof: ', merkleProof)

console.log('Verifty:', tree.verify(merkleProof, "0x18c37f21D3C29f9a53A96CA678026DC660180065", merkleRoot));