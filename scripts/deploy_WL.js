const { ethers } = require('hardhat')
const fs = require("fs");
require('dotenv').config()

async function main() {
    const base_uri = process.env.BASE_URI
    const Contract = await ethers.getContractFactory('WhitelistSale')
    const contract = await Contract.deploy('Solove', 'SOL', base_uri, "0xf0b8c3c9b71ed496a5b997e8e3a9ed3e9b9bab460f8b99f6a9d51e41dd4cf9c8")

    await contract.deployed()
    const address = JSON.stringify({ address: contract.address }, null, 4)
    fs.writeFile('./contractAddress_WL.json', address, 'utf8', (err) => {
        if (err) {
            console.error(err)
            return
        }
        console.log('Deployed contract address', contract.address)
    })
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})