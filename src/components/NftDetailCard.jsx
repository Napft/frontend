import React from 'react';
import { buyNFT } from '../Blockchain.Services';
import { getGlobalState } from '../store';
import { ethers } from 'ethers';
const NftDetailCard = (props) => {
    const connectedAccount = getGlobalState('connectedAccount');

    return (
        <div className="m-[10px] shadow-xl shadow-black rounded-[15px] overflow-hidden bg-gray-800" style={{ maxHeight: "550px" }} >
            <center>
                <div >
                    <img style={{ objectFit: "cover", borderTopLeftRadius: "15px", borderTopRightRadius: "15px", width: "inherit", width: "100%", height: "300px" }} alt="Error due to Invalid IPFS Hash " src={`https://gateway.pinata.cloud/ipfs/${props.NFT.IPFS_hash}`} onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = "http://www.lyon-ortho-clinic.com/files/cto_layout/img/placeholder/book.jpg";
                    }} />
                </div>
            </center>
            <div style={{ padding: "10px", color: "#aaa" }} >
                <p>Token Id : {`${props.NFT.NFT_token_ID}`}</p>
                <p style={{ color: "white" }}>Owner   : {`${props.NFT.owner_metamask_id}`}</p>
                <p>Creator : {`${props.NFT.creator_metamask_id}`}</p>
                <p>Price   : {props.NFT.price} MATIC</p>
                <br />
                <center>
                    <button onClick={() => { buyNFT(props.NFT.NFT_token_ID); }} className="buybutton text-[white]" >Purchase Now</button>
                </center>
            </div>
            <div style={{ textAlign: "right" }}>
                <a href={`./nft-detail-page/${props.NFT.NFT_token_ID}`} style={{ color: "white", margin: "20px", textAlign: "right" }}>view details &gt;&gt;&gt; </a>
            </div>
        </div>
    );
}

export default NftDetailCard;