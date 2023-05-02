import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// Constants
import { main_express_backend_bace_url } from "../utils/constants.js";
// Components
import "./NftDetailPage.css";
import Header from "../components/Header";
import NFTDetailSection from "../components/NFTDetailSection";

// Sections of the page
import NFTCommentSection from "../components/NFTCommentSection";
import NFTChartSection from "../components/NFTChartSection";

const NftDetailPage = () => {
  const { tokenid } = useParams();
  const [nftDetail, setNftDetail] = useState({});
  // componentDidMount behaviour
  useEffect(() => {
    console.log(tokenid);
    const target_endpoint = main_express_backend_bace_url + "/api/nft/nft_detail";
    try{
      axios.post(target_endpoint, {
        NFT_token_ID : tokenid,
      })
      .then(response => {
        setNftDetail(response.data.nft);
      })
      .catch(error => {
        console.error(error);
      });
    }catch(e){
      console.log("Error Fetching Data from Backend",e);
    }
    return () => {};
  }, []);
  if (!(Object.keys(nftDetail).length > 0)) {
    return (
      <center>
        <h1>Loading</h1>
      </center>
    );
  } else {
    return (
      <div className="gradient-bg-hero" style={{ minHeight: "110vh" }}>
        <div className="">
          <Header />
        </div>
        <center>
          <div style={{ width: "70%" }}>
            <NFTDetailSection nftDetail={nftDetail} />
            <br />
            <NFTChartSection
              timeline={nftDetail.section_price_info.price_timeline}
            />
            <br />
            <NFTCommentSection />
            <br />
          </div>
        </center>
      </div>
    );
  }
};

export default NftDetailPage;
