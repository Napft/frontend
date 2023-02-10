import React, { useEffect, useState } from 'react';
import { getAlchemyContract } from '../Blockchain.Services';
import Header from '../components/Header'
import Footer from '../components/Footer';
import NftDetailCard from '../components/NftDetailCard';
import { setGlobalState, useGlobalState, getGlobalState } from '../store'
import './MarketPlace.css'


const MarketPlace = (props) => {
    const [nftDetailsList, setNftDetailsList] = useState([])
    // too get and set the contract to "myContract" variable
    useEffect(() => {
        async function helloContract() {
            const val = await getAlchemyContract()
            const noOfNFTs = await val.GetCurrentToken();
            let tempList = [];
            for (let i = noOfNFTs; i >= 5; i--) {
                let nftDetail = await val.GetNFTDetails(i);
                console.log(nftDetail);
                tempList.push({...nftDetail,tokenId:i});
            }
            console.log(tempList);
            setGlobalState('nftDetailsList', tempList);
            setNftDetailsList(tempList);
        }
        // helloContract();
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