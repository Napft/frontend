import Web3 from 'web3'
import { ethers } from "ethers";
import { setGlobalState, getGlobalState, setAlert } from './store';
import abi from './abis/NftMarket.json'
import axios from "axios";
//Contract
const CONTRACT_ADDRESS = '0xA149eae19266e92aC3060DA3827013164417adE1';


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
const getAlchemyContract = async () => {
  const contract_address = '0xA149eae19266e92aC3060DA3827013164417adE1';
  const alchemy_api_key = "3OjobC1AhJFMasu3yxQ6UFlk6BE41T1F";
  const alchemy_provider = new ethers.providers.AlchemyProvider('maticmum', alchemy_api_key);
  const alchemy_contract = new ethers.Contract(contract_address, abi, alchemy_provider);
  return alchemy_contract;
}

const get_NFT_details_from_MongoDB = async ({ start, end }) => {
  const online_url = "https://napft-backend.vercel.app/api/nft/";
  const result = await axios.get(online_url, { params: { start: start, end: end } }).then(res => {
    // console.log("get from Mongo",res.data);
    return res.data;
  }).catch(err => {
    console.log(`Error getting NFT Details from MongoDB ${start}-${end}`);
  });
  return result;
}

const getContract = async () => {
  await connectWallet()
  // const abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "price", "type": "uint256" }], "name": "Buy", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "creator", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": true, "internalType": "string", "name": "tokenURI", "type": "string" }], "name": "Mint", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "GetCreatorOfNft", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "GetCurrentToken", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "GetNFTDetails", "outputs": [{ "internalType": "address", "name": "creator", "type": "address" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "string", "name": "IpfsHash", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "GetNftPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "GetTransactionHistory", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "MyTotalNft", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "price", "type": "uint256" }], "name": "UpdateNftPrice", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "buy", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "tokenURI", "type": "string" }, { "internalType": "uint256", "name": "price", "type": "uint256" }], "name": "creatToken", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
  const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/sdwDCJvTN9o-Rw5T87Rud5BHpt_F8mzN"));
  const address = '0xA149eae19266e92aC3060DA3827013164417adE1';
  const web3Contract = new web3.eth.Contract(abi, address);
  return web3Contract;
}

const mintNFT2 = async ({ price, IpfsHash, title = "My NFT title", description = "Some Description...." }) => {
  try {
    const CONTRACT_ADDRESS = '0xA149eae19266e92aC3060DA3827013164417adE1';
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // console.log(provider);
    const NFT = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
    const tx = await NFT.creatToken(IpfsHash, ethers.utils.parseEther(`${price}`))
    // console.log("Transaction :",tx)
    const rc = await tx.wait(); // 0ms, as tx is already confirmed
    const event = rc.events.find(event => event.event === 'Transfer');
    const [from, to, value] = event.args;
    // value is basically token id of latest transaction.
    console.log(from, to, value);

    // Uploading to the Backend
    const new_nft = {
      IPFS_hash: IpfsHash,
      NFT_token_ID: parseInt((value["_hex"]), 16),
      title: title,
      price: price,
      description: description,
      primary_category: "uncategorized",
      tags: [],
      votes: 0,
      transaction_history: [],
      creator_metamask_id: `${getGlobalState('connectedAccount')}`,
      owner_metamask_id: `${getGlobalState('connectedAccount')}`,
      price_timeline: [],
      trend_number: Math.floor(Math.random() * 100),
      image_feature_representation: [],
      date_created: Date(),
      media_type: 'image',
      view_count: 0,
      comments: [],
    };
    console.log("New NFT:", new_nft)

    const online_url = "https://napft-backend.vercel.app/api/nft/"
    axios.post(online_url, new_nft).then((responce) => {
      console.log("Success", responce);
    }).catch((error) => {
      console.log("Error", error);
    })
    return value
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









// AUTHENTICATION RELATED
/// Signing a Message using Metamask.
const signMessage = async (message,account) => {
  const web3 = new Web3(window.ethereum);
  return (await web3.eth.personal.sign(message,account));
}
/// Complete Authentication using Metamask with ExpressJS Backend.
const authenticate = async () => {
  let account = getGlobalState("connectedAccount");
  if(account !== ""){
    const signature = signMessage("Hello",account);
    console.log(signature);
  }
}













export {
  signMessage,
  authenticate,
  getAllNFTs,
  connectWallet,
  mintNFT2,
  buyNFT,
  updateNFT,
  isWallectConnected,
  getContract,
  getAlchemyContract,
  get_NFT_details_from_MongoDB,
}