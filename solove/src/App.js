import React, { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import Solove from './Solove.json';

const getEthereumObject = () => window.ethereum;

/*
 * This function returns the first linked account found.
 * If there is no account linked, it will return null.
 */
const findMetaMaskAccount = async () => {
  try {
    const ethereum = getEthereumObject();

    /*
    * First make sure we have access to the Ethereum object.
    */
    if (!ethereum) {
      console.error("Make sure you have Metamask!");
      return null;
    }

    console.log("We have the Ethereum object", ethereum);
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      return account;
    } else {
      console.error("No authorized account found");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");

  /*
   * The passed callback function will be run when the page loads.
   * More technically, when the App component "mounts".
   */
  useEffect(() => {
    findMetaMaskAccount().then((account) => {
      if (account !== null) {
        setCurrentAccount(account);
      }
    });
  }, []);

  const connectWallet = async () => {
    try {
      const ethereum = getEthereumObject();
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const askContractToMintNft = async () => {  
    try {
      const { ethereum } = window;
  
      if (ethereum) {
        const CONTRACT_ADDRESS = "0xA8A3521a86Fa3b4c5f497a676dB33Cc2747FB30B"  // contract 주소
        const PUBLIC_ADDRESS = "0x167C7010D50C88915C787f0503bE4f4D18028b35" // 받는사람 지갑주소
        const {ethers} = require("ethers");
        const alchemyProvider = new ethers.providers.AlchemyProvider("goerli", "cmz9ptl4wYGJxw-4MDZRHaAHGY7N42eH"); //알케미 api 주소
        const signer = new ethers.Wallet("f6f92dadcfbed58f4207255702f49a1b6ed71de0a591c80a56c0a568b3a83d07", alchemyProvider); // 메타마스크 비공개키
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