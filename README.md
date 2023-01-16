# Ethereum_mint_dapp
basic minting functions includes both cli(infura) and client(alchemy)

## Install Dependencies

'''
npm install --save-dev hardhat
npx hardhat
'''

then we could see a welcome message, select "Create an empty hardhat.config.js"

'''
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.12.2 👷‍

? What do you want to do? … 
  Create a JavaScript project
  Create a TypeScript project
❯  Create an empty hardhat.config.js
  Quit
  '''
  
  '''
  npm install dotenv --save
  npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
  '''
  ## Update .env file
  '''
  # ipfs 주소
BASE_URI = ""

# url + alchemy api key
API_URL = "https://eth-goerli.alchemyapi.io/v2/YOUR-API-KEY"

# alchemy api key
API_KEY = ""

# ethereum contract address
CONTRACT_ADDRESS = ""

# 메타마스크 public address
PUBLIC_ADDRESS = ""

# 메타마스크 private key
PRIVATE_KEY = ""

'''

fill the empty srings with your own values. We need metamask, alchemy account, and any ipfs urls that uploaded images and json files
you need to fill contract_address after deploy contract

## Compile and Deploy Contract

'''
npx hardhat compile
npx hardhat run scripts/deploy.js --network goerli
'''
# Ready to mint
'''
npx hardhat run scripts/interact_solove.js --network goerli
'''
  
  
  
