# Ethereum_mint_dapp
Basic ways to deploy and interact smart contract for ethereum NFTS, especially ERC721

## Install Dependencies

Run the commands below
``` 
npm install --save-dev hardhat
npm install dotenv --save
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
``` 

## Update .env file

fill the empty srings with your own values. We need metamask, alchemy account, and any ipfs urls that uploaded images and json files

``` 
BASE_URI = ""

API_URL = "https://eth-goerli.alchemyapi.io/v2/YOUR-API-KEY"

API_KEY = ""

PUBLIC_ADDRESS = ""

PRIVATE_KEY = ""
``` 



## Compile and Deploy Contract

``` 
npx hardhat compile
npx hardhat run scripts/deploy.js --network goerli
``` 
## Ready to mint

Run the command below, then you can see your nfts at 'https://testnets.opensea.io/' or 'https://goerli.etherscan.io/'

``` 
npx hardhat run scripts/interact.js --network goerli
``` 
  
  
  
