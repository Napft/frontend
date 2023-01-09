import Web3 from 'web3'
import { ethers } from "ethers";
// const web3 = new Web3(window.ethereum);
// await window.ethereum.enable();
// const NameContract = web3.eth.Contract(contract_abi, contract_address);
import { setGlobalState, getGlobalState, setAlert } from './store';
import abi from './abis/NftMarket.json'


const { ethereum } = window
if(ethereum){
  window.web3 = new Web3(ethereum)
  window.web3 = new Web3(window.web3.currentProvider)
}

//Contract
const CONTRACT_ADDRESS = '0xA149eae19266e92aC3060DA3827013164417adE1';
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const ethContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);


const getEtheriumContract = async () => {
  const connectedAccount = getGlobalState('connectedAccount')

  if (connectedAccount) {
    const web3 = window.web3
    const networkId = await web3.eth.net.getId()
    const Contract_Address = '0xA149eae19266e92aC3060DA3827013164417adE1';
    const contract = new web3.eth.Contract(abi, Contract_Address)

    return contract
  } else {
    return getGlobalState('contract')
  }
}



const connectWallet = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    setGlobalState('connectedAccount', accounts[0])
  } catch (error) {
    reportError(error)
  }
}


const isWallectConnected = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_accounts' })

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload()
    })

    window.ethereum.on('accountsChanged', async () => {
      setGlobalState('connectedAccount', accounts[0])
      await isWallectConnected()
    })

    if (accounts.length) {
      setGlobalState('connectedAccount', accounts[0])
    } else {
      alert('Please connect wallet.')
      console.log('No accounts found.')
    }
  } catch (error) {
    reportError(error)
  }
}

const structuredNfts = (nfts) => {
  return nfts
    .map((nft) => ({
      id: Number(nft.id),
      owner: nft.owner.toLowerCase(),
      cost: window.web3.utils.fromWei(nft.cost),
      title: nft.title,
      description: nft.description,
      metadataURI: nft.metadataURI,
      timestamp: nft.timestamp,
    }))
    .reverse()
}

const getAllNFTs = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')

    const contract = await getEtheriumContract()
    const nfts = await contract.methods.getAllNFTs().call()
    const transactions = await contract.methods.getAllTransactions().call()

    setGlobalState('nfts', structuredNfts(nfts))
    setGlobalState('transactions', structuredNfts(transactions))
  } catch (error) {
    reportError(error)
  }
}
const updateNFT = async ({ id, cost }) => {
  try {
    cost = window.web3.utils.toWei(cost.toString(), 'ether')
    const contract = await getEtheriumContract()
    const buyer = getGlobalState('connectedAccount')

    await contract.methods.changePrice(Number(id), cost).send({ from: buyer })
  } catch (error) {
    reportError(error)
  }
}

// const reportError = (error) => {
//   // setAlert(JSON.stringify(error), 'red')
//   throw new Error('No ethereum object.')
// }






///============================================================= My Mint Function
const getContract = async () => {
  await connectWallet()
  // Previous Code to create Contract... :
  // const CONTRACT_ADDRESS = '0xA149eae19266e92aC3060DA3827013164417adE1';
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const signer = provider.getSigner();
  // const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  // New Code using Web3 : 
  const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/sdwDCJvTN9o-Rw5T87Rud5BHpt_F8mzN"));
  const address = '0xA149eae19266e92aC3060DA3827013164417adE1';
  // const abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "price", "type": "uint256" }], "name": "Buy", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "creator", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": true, "internalType": "string", "name": "tokenURI", "type": "string" }], "name": "Mint", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "GetCreatorOfNft", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "GetCurrentToken", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "GetNFTDetails", "outputs": [{ "internalType": "address", "name": "creator", "type": "address" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "string", "name": "IpfsHash", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "GetNftPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "GetTransactionHistory", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "MyTotalNft", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "price", "type": "uint256" }], "name": "UpdateNftPrice", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "buy", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "tokenURI", "type": "string" }, { "internalType": "uint256", "name": "price", "type": "uint256" }], "name": "creatToken", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
  const web3Contract = new web3.eth.Contract(abi, address);
  return web3Contract;
}

const mintNFT2 = async ({ price, IpfsHash }) => {
  try {
    const CONTRACT_ADDRESS = '0xA149eae19266e92aC3060DA3827013164417adE1';
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // console.log(provider);
    const NFT = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
    const tokenId = await NFT.creatToken(IpfsHash, ethers.utils.parseEther(`${price}`))
    console.log(tokenId)
    console.log("Success");

    return tokenId
  } catch (error) {
    console.log(error);
  }
}

const buyNFT = async (tokenId) => {
  const web3Contract = await getContract();
  const getPrice = await web3Contract.methods.GetNftPrice(tokenId).call();
  const price = ethers.utils.parseEther(`${getPrice}`)
  // console.log(price);
  const res = await ethContract.buy(tokenId, { value: getPrice });
  console.log(res);
}















export {
  getAllNFTs,
  connectWallet,
  mintNFT2,
  buyNFT,
  updateNFT,
  isWallectConnected,
  getContract,
}