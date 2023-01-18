const { ethers } = require('hardhat')
const fs = require("fs");
require('dotenv').config()

async function main() {
    const base_uri = process.env.BASE_URI
    const Contract = await ethers.getContractFactory('WhitelistSale')
    const contract = await Contract.deploy('WL_TEST', 'WL', base_uri, "0xf89d9909a39ae3db694075d1d2233becf943363a6de42e3bfbfd056638494ee4")

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