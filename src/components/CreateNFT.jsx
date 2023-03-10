import {
  useGlobalState,
  setGlobalState,
  setLoadingMsg,
  setAlert,
} from "../store";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { create } from "ipfs-http-client";
import { mintNFT2 } from "../Blockchain.Services";
import axios from "axios";

////// Unused Code...
// const auth =
//   "Basic " +
//   Buffer.from(
//     process.env.REACT_APP_INFURIA_PID + ":" + process.env.REACT_APP_INFURIA_API
//   ).toString("base64");

// const client = create({
//   host: "ipfs.infura.io",
//   port: 5001,
//   protocol: "https",
//   headers: {
//     authorization: auth,
//   },
// });
//////

// CreateNFT Component
const CreateNFT = () => {
  // Temporary Variables Of the Component
  const [modal] = useGlobalState("modal");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [imgBase64, setImgBase64] = useState(null);

  // Local Helper functions of the function
  // 1. Image Change Event Handler
  const changeImage = async (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
    reader.onload = (readerEvent) => {
      const file = readerEvent.target.result;
      setImgBase64(file);
      setFileUrl(e.target.files[0]);
    };
  };
  //2. CLose Model Butten onCLick Event Handler
  const closeModal = () => {
    setGlobalState("modal", "scale-0");
    resetForm();
  };
  //3. To reset the fields of the form
  const resetForm = () => {
    setFileUrl("");
    setImgBase64(null);
    setTitle("");
    setPrice("");
    setDescription("");
  };
  //4. (Handle Submission) Submit button onCLick Event Handler
  const handleSubmission = async (e) => {
    e.preventDefault();
    if (!title || !price || !description) return;

    setGlobalState("modal", "scale-0");
    setGlobalState("loading", { show: true, msg: "Uploading IPFS data..." });

    const formData = new FormData();
    formData.append("file", fileUrl);
    const metadata = JSON.stringify({
      name: title,
      keyvalues: { price: price, description: description },
    });
    formData.append("pinataMetadata", metadata);
    const options = JSON.stringify({ cidVersion: 0 });
    formData.append("pinataOptions", options);

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            // Authorization: JWT
            pinata_api_key: "876f96d717a13c38c251",
            pinata_secret_api_key: "e8f069ef36868569842dc969b0288d321477816c11baff0e10a0a4888c32edb4",
          },
        }
      );
      // ** Completed Uploading to the Pinata and Got the Hash Value

      const IpfsHash = res.data.IpfsHash;
      // console.log("Hello from Create NFT.");
      // console.log("Create NFT: ",{IpfsHash,price,title,description});

      const tokenID = await mintNFT2({IpfsHash,price,title:title,description:description});
    } catch (error) {
      console.log(error);
      setAlert("Minting failed...", "red");
    }
    setGlobalState("loading", { show: false });
  };

  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${modal}`} >

      <div className="bg-[rgb(21,28,37)] shadow-xl shadow-[#e32970] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">

        <div className="flex flex-col">
          {/* Close Button */}
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold text-gray-400">Add NFT</p>
            <button type="button" onClick={closeModal} className="border-0 bg-transparent focus:outline-none" >
              <FaTimes className="text-gray-400" />
            </button>
          </div>
          {/* Selected Image */}
          <div className="flex flex-row justify-center items-center rounded-xl mt-5">
            <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
              <img alt="NFT" className="h-full w-full object-cover cursor-pointer" src={imgBase64 || "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"} />
            </div>
          </div>
          {/* Input Field to choose NFT Image  */}
          <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input type="file" accept="image/png, image/gif, image/jpeg, image/webp" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#19212c] file:text-gray-400 hover:file:bg-[#1d2631] cursor-pointer focus:ring-0 focus:outline-none" onChange={changeImage} required />
            </label>
          </div>
          {/* Input Field = Title */}
          <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
            <input className="block w-full text-sm text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0" type="text" name="title" placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} required />
          </div>
          {/* Input Field = Ammount*/}
          <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
            <input className="block w-full text-sm text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0" type="number" step={0.01} min={0.01} name="price" placeholder="Price (Eth)" onChange={(e) => setPrice(e.target.value)} value={price} required />
          </div>
          {/* Input Field = Description */}
          <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
            <textarea className="block w-full text-sm resize-none text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0 h-20" type="text" name="description" placeholder="Description" onChange={(e) => setDescription(e.target.value)} value={description} required ></textarea>
          </div>
          {/* Minting Function */}
          <button type="submit" onClick={handleSubmission} className="flex flex-row justify-center items-center w-full text-white text-md bg-[#e32970] hover:bg-[#bd255f] py-2 px-5 rounded-full drop-shadow-xl border border-transparent hover:bg-transparent hover:text-[#e32970] hover:border hover:border-[#bd255f] focus:outline-none focus:ring mt-5" >
            Mint Now
          </button>

        </div>

      </div>

    </div>
  );
};

export default CreateNFT;
