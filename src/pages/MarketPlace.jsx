import React, { useEffect, useState } from 'react';
import { getContract } from '../Blockchain.Services';
import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from '../components/Footer';
import NftDetailCard from '../components/NftDetailCard';
import './MarketPlace.css'
import { setGlobalState, useGlobalState, getGlobalState } from '../store'


const MarketPlace = (props) => {
    const [myContract, setMyContract] = useState({});
    const [nftDetailsList, setNftDetailsList] = useState([])
    // too get and set the contract to "myContract" variable
    useEffect(() => {
        async function helloContract() {
            const val = await getContract()
            setMyContract(val)
            const noOfNFTs = await val.methods.GetCurrentToken().call();
            // console.log(noOfNFTs);
            let tempList = [];
            for (let i = noOfNFTs; i >= 5; i--) {
                let nftDetail = await val.methods.GetNFTDetails(i).call();
                nftDetail.tokenId = i
                // console.log(nftDetail);
                tempList.push(nftDetail);
            }
            setGlobalState('nftDetailsList', tempList);
            setNftDetailsList(tempList);
        }
        const helloList = getGlobalState('nftDetailsList');
        if (helloList.length == 0) {
            helloContract();
        } else {
            setNftDetailsList(helloList);
        }
    }, []); // Working

    // Fetching all the NFT details from SmartContract


    return (
        <div className="gradient-bg-hero">
            <div className="">
                <Header />
            </div>
            <br />
            <br />
            <br />
            <br />
            <div className='p-[30px]'>
                {
                    (nftDetailsList.length > 0)
                        ? <div className='mygrid'>{nftDetailsList.map((ele, index, arr) => <NftDetailCard className='myitem' key={index} NFT={ele} />)}</div>
                        : <center className='pt-[200px] pb-[200px] text-[100px]'>Loading...</center>
                }

            </div>
            <br />
            <br />
            <br />
            <br />
            <Footer></Footer>
        </div>
    );
}

export default MarketPlace;