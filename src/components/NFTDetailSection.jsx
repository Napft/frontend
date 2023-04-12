import React from 'react'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsEye } from 'react-icons/bs';


const MyLikeButton = ({ likes_count = 0, is_liked_bool = false, like_function = () => { } }) => {
    return (<button
        className='likeButton'
        style={{ fontSize: "30px", display: "flex", alignItems: "center", gap: "10px", height: "80%", padding: "2px 15px", borderRadius: "100px" }}
        onClick={like_function}>
        {likes_count}<span>{is_liked_bool ? <AiFillHeart /> : <AiOutlineHeart />}</span>
    </button>);
}

const MyChip = React.memo(({ name, data }) => {
    return (<div style={{ fontSize: "17px", borderWidth: "2px", padding: "5px 10px", borderRadius: "20px", backgroundColor: "#fff3" }}>
        <h4>{name}</h4>
        <h3 style={{ fontSize: "25px", fontWeight: "bold" }}>{data}</h3>
    </div>);
})




const NFTDetailSection = ({ nftDetail }) => {
    return (
        <div style={{ width: "100%", display: "flex", minHeight: "550px", borderRadius: "20px", backgroundColor: "#ddd5" }}>
            <div style={{ height: "inherit", width: "50%", borderRadius: "20px", overflow: "hidden", margin: "10px" }}>
                <img src={nftDetail.image_url} alt="" style={{ height: "100%", width: "100%", objectFit: "cover", userSelect: "none", border: "none" }} onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "http://www.lyon-ortho-clinic.com/files/cto_layout/img/placeholder/book.jpg";
                }} />
            </div>
            <div style={{ height: "100%", width: "50%", margin: "10px", textAlign: "left", padding: "10px", color: "white" }}>
                <div style={{ display: "flex", justifyContent: "space-between", paddingRight: "10px" }}>
                    <h1 style={{ fontSize: "40px", fontWeight: "bold" }}>{nftDetail.title}</h1>
                    <MyLikeButton />
                </div>
                <hr style={{ borderWidth: "1px", borderColor: "white" }} />
                <br />
                <h3 style={{ fontSize: "30px", fontWeight: "normal", }}>ETH {nftDetail.price}</h3>
                <br />
                <div style={{ width: "100%", display: "flex", justifyContent: "space-between", padding: "0px 30px 0px 0px", flexWrap: "wrap", rowGap: "20px", columnGap: "5px" }}>
                    <MyChip name="Blockchain" data="Etherium" />
                    <MyChip name="Date created" data={(nftDetail.date_created)} />
                    <MyChip name="Token ID" data={`#${nftDetail.NFT_token_ID}`} />
                    <MyChip name={<span style={{ display: "flex", alignItems: "center", gap: "10px" }}>Views <BsEye /></span>} data={nftDetail.view_count} />
                </div>
                <br />
                <div style={{ width: "60%", display: "flex", alignItems: "center", justifyContent: "left", gap: "10px" }}>
                    <img src={nftDetail.user_profile_img_url} alt="" style={{ width: "45px", height: "45px", borderRadius: "100px", overflow: "hidden", borderWidth: "2px", borderColor: "white", padding: "2px" }} />
                    <div style={{ height: "100%", fontSize: "22px", }}>{nftDetail.owner_metamask_id.slice(0, 15)}...</div>
                </div>
                <br />
                <div style={{ fontSize: "20px" }}>{nftDetail.description}</div>
            </div>
        </div>
    )
}

export default NFTDetailSection