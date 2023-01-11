const { ethers } = require('hardhat')
const fs = require('fs')

async function main() {
  const base_uri = 'https://gateway.pinata.cloud/ipfs/QmX6pi7eLqyTDuukafzdWz2pP4ds3ULMsFSzmyiCXaecqA/'
  const Contract = await ethers.getContractFactory('Solove')
  const contract = await Contract.deploy('Solove', 'SOL', base_uri)

  await contract.deployed()

  const address = JSON.stringify({ address: contract.address }, null, 4)
  fs.writeFile('./src/abis/contractAddress.json', address, 'utf8', (err) => {
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