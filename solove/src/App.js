import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import { ethers, getDefaultProvider } from "ethers";
import Solove from './Solove.json';



const App = () => {
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [walletAddress, setWalletAddress] = useState(undefined)
  const [currentBalance, setCurrentBalance] = useState(undefined)
  const [chainId, setChainId] = useState(undefined)
  const result = [];
  const connectWallet = useCallback(async () => {
    try {
      if(typeof window.ethereum !== 'undefined') {
        const provider = await new ethers.providers.Web3Provider(
          window.ethereum
           );
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        setSigner(signer)

        const result = await Promise.all([
          signer.getAddress(),
          signer.getBalance(),
          signer.getChainId()
        ])

        setWalletAddress(result[0]) // address
        setCurrentBalance(Number(result[1])) //Balance
        setChainId(result[2]) // ChainId
        console.log(result[0]);
        console.log(result[1]);
        console.log(result[2]);
      } else {
        alert("please install MetaMask")
      }
    } catch (error) {
      console.log(error);
    }
  },[])

  


  const askContractToMintNft = async () => {  
    try {
      const { ethereum } = window;
  
      if (ethereum) {
        const CONTRACT_ADDRESS = "0x82b6b883D0CCcc2cE1C74baA629F83A3294460cd" // contract address
        const PUBLIC_ADDRESS = result[0]; //지갑주소
        const {ethers} = require("ethers");
        const alchemyProvider = new ethers.providers.AlchemyProvider("goerli", "ciwXbQ8IjvLpPlqk04Md8GdGzSwN6JCV"); //alchemy api
        const signer = new ethers.Wallet("f6f92dadcfbed58f4207255702f49a1b6ed71de0a591c80a56c0a568b3a83d07", alchemyProvider);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, Solove.abi, signer);
        const amount = ethers.utils.parseEther('0.001')

        console.log("Going to pop wallet now to pay gas...")
        let nftTxn = await contract.payToMint({
          from: PUBLIC_ADDRESS,
          value: amount._hex,
        })
  
        console.log("Mining...please wait.")
        await nftTxn.wait();
      
        console.log(`Mined, see transaction: https://goerli.etherscan.io//tx/${nftTxn.hash}`);
  
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
          connectwallet
        </div>

        <button className="waveButton" onClick={connectWallet}>
          Connect Wallet
        </button> 

        <button onClick={askContractToMintNft} className="cta-button connect-wallet-button">
          Mint NFT
        </button>
      </div>
    </div>
  );
};

export default App;