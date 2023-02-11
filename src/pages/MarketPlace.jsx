import React, { useEffect, useState } from 'react';
import { getAlchemyContract } from '../Blockchain.Services';
import Header from '../components/Header'
import Footer from '../components/Footer';
import NftDetailCard from '../components/NftDetailCard';
import { setGlobalState, useGlobalState, getGlobalState } from '../store'
import './MarketPlace.css'
import axios from 'axios';

const MarketPlace = (props) => {
    const [nftDetailsList, setNftDetailsList] = useState([])
    // too get and set the contract to "myContract" variable
    useEffect(() => {
        async function helloContract() {
            const val = await getAlchemyContract()
            const noOfNFTs = await val.GetCurrentToken();
            const online_url = "https://napft-backend.vercel.app/api/nft/"
            axios.get(online_url, { params: { start: 1, end: noOfNFTs } }).then(res => {
                const nfts_lst = res.data.reverse();
                console.log(nfts_lst);
                setGlobalState('nftDetailsList', nfts_lst);
                setNftDetailsList(nfts_lst);
                // console.log("Success getting Data from MoongoDB through Express server",res);
            }).catch(err => {
                // console.log("Error getting Data from MoongoDB through Express server",err);
            })
            // for (let i = noOfNFTs; i >= noOfNFTs - 5; i--) {
            //     let nftDetail = await val.GetNFTDetails(i);
            //     console.log(nftDetail);
            //     tempList.push({...nftDetail,tokenId:i});
            // }
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