import { ethers } from 'ethers';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import { getContract, get_NFT_details_from_MongoDB } from '../Blockchain.Services';
import Header from '../components/Header';
import './NftDetailPage.css'
import NFTDetailSection from '../components/NFTDetailSection';

// Sections of the page
import NFTCommentSection from '../components/NFTCommentSection';
import NFTChartSection from '../components/NFTChartSection';



const NftDetailPage = () => {
  const { tokenid } = useParams();
  const [nftDetail, setNftDetail] = useState({});
  useEffect(() => {
    async function get_and_set_NFT_details() {
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const my_nft = (await get_NFT_details_from_MongoDB({ start: tokenid, end: tokenid }))[0];
      const d = new Date(Date.parse(my_nft.date_created));
      const my_date_string = `${d.getDate()}-${monthNames[d.getMonth()].slice(0, 3)}-${d.getFullYear()}`;
      setNftDetail({
        IPFS_hash: my_nft.IPFS_hash,
        NFT_token_ID: my_nft.NFT_token_ID,
        comments: my_nft.comments,
        title: my_nft.title,
        price: my_nft.price,
        description: my_nft.description,
        primary_category: my_nft.primary_category,
        tags: my_nft.tags,
        votes: my_nft.votes,
        transaction_history: my_nft.transaction_history,
        creator_metamask_id: my_nft.creator_metamask_id,
        owner_metamask_id: my_nft.owner_metamask_id,
        price_timeline: my_nft.price_timeline,
        trend_number: my_nft.trend_number,
        image_feature_representation: my_nft.image_feature_representation,
        date_created: my_date_string,
        media_type: my_nft.media_type,
        view_count: my_nft.view_count,
        comments: my_nft.comments,

        image_url: `https://gateway.pinata.cloud/ipfs/${my_nft.IPFS_hash}`,
        user_profile_img_url: "https://cdn.pixabay.com/photo/2018/11/13/22/01/avatar-3814081_960_720.png",
      })
    }
    get_and_set_NFT_details();
  }, []);


  if (!(Object.keys(nftDetail).length > 0)) {
    return (<center><h1>Loading</h1></center>);
  } else {
    return (
      <div className="gradient-bg-hero" style={{ minHeight: "110vh", }}>
        <div className="">
          <Header />
        </div>
        <center>
          <div style={{width:"70%"}}>
          <NFTDetailSection nftDetail={nftDetail} />
          <br />
          <NFTChartSection data={
            [[nftDetail["date_created"],nftDetail["price"]],...(nftDetail.price_timeline)].map(d=>({x:d[0],y:d[1]}))
            }/>
          <br />
          <NFTCommentSection />
          <br />
          </div>
        </center>
      </div>
    );
  }
}

export default NftDetailPage;