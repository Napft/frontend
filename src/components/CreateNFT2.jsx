import {
    useGlobalState,
    setGlobalState,
    setLoadingMsg,
    setAlert,
} from '../store'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { create } from 'ipfs-http-client'
import { mintNFT } from '../Blockchain.Services'
import axios from "axios";
// const JWT = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjMTEzNzRlNS0xODI3LTRmY2EtYjBhMC1kZjAyZmMwODY1NDIiLCJlbWFpbCI6InBtYWxsaWthcmp1bjMwN0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiY2FmMmUwYTI2NmMzNTNkMDhkODYiLCJzY29wZWRLZXlTZWNyZXQiOiIyNGRlZGQwZmYyN2ZkZWYxNzUwNTczNGE0ZGNkYmQ3NGVhNWE1ZDFmZmYzZjliYTYwNjNjNzcwZDY3ZTViMjgzIiwiaWF0IjoxNjcyNTUzNjQwfQ.rczXP0QMIFktqpNjeuso4iy1OoxqfUdEOZu-6AQrYgU`
const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjMTEzNzRlNS0xODI3LTRmY2EtYjBhMC1kZjAyZmMwODY1NDIiLCJlbWFpbCI6InBtYWxsaWthcmp1bjMwN0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiY2FmMmUwYTI2NmMzNTNkMDhkODYiLCJzY29wZWRLZXlTZWNyZXQiOiIyNGRlZGQwZmYyN2ZkZWYxNzUwNTczNGE0ZGNkYmQ3NGVhNWE1ZDFmZmYzZjliYTYwNjNjNzcwZDY3ZTViMjgzIiwiaWF0IjoxNjcyNTUzNjQwfQ.rczXP0QMIFktqpNjeuso4iy1OoxqfUdEOZu-6AQrYgU"

//COmponent 
const CreateNFT2 = () => {
    //===============================================
    const [modal] = useGlobalState('modal')
    const [imgBase64, setImgBase64] = useState(null)
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    // const [fileUrl, setFileUrl] = useState('')

    const closeModal = () => {
        setGlobalState('modal', 'scale-0')
        resetForm()
    }
    //===============================================

    const [selectedFile, setSelectedFile] = useState();

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmission = async () => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('file', selectedFile)
        const metadata = JSON.stringify({ name: title, price: price, description: description });
        formData.append('pinataMetadata', metadata);
        const options = JSON.stringify({ cidVersion: 0, })
        formData.append('pinataOptions', options);

        try {
            console.log("uploading file")
            const res = await axios.post(
                "https://api.pinata.cloud/pinning/pinFileToIPFS",
                formData,
                {
                    maxBodyLength: "Infinity",
                    headers: {
                        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                        // Authorization: JWT
                        "pinata_api_key": "876f96d717a13c38c251",
                        "pinata_secret_api_key": "e8f069ef36868569842dc969b0288d321477816c11baff0e10a0a4888c32edb4",
                    }
                });
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${modal}`}>
            <div className="bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between items-center">
                        <p className="font-semibold text-gray-400">Add NFT</p>
                        <button type="button" onClick={closeModal} className="border-0 bg-transparent focus:outline-none">
                            <FaTimes className="text-gray-400" />
                        </button>
                    </div>

                    <div className="flex flex-row justify-center items-center rounded-xl mt-5">
                        <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
                            <img
                                alt="NFT"
                                className="h-full w-full object-cover cursor-pointer"
                                src={
                                    imgBase64 ||
                                    'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80'
                                }
                            />
                        </div>
                    </div>

                    <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
                        <label className="block">
                            <span className="sr-only">Choose profile photo</span>
                            <input
                                type="file"
                                accept="image/png, image/gif, image/jpeg, image/webp"
                                className="block w-full text-sm text-slate-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-[#19212c] file:text-gray-400
                      hover:file:bg-[#1d2631]
                      cursor-pointer focus:ring-0 focus:outline-none"
                                onChange={changeHandler}
                                required
                            />
                        </label>
                    </div>

                    <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
                        <input
                            className="block w-full text-sm
                    text-slate-500 bg-transparent border-0
                    focus:outline-none focus:ring-0"
                            type="text"
                            name="title"
                            placeholder="Title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            required
                        />
                    </div>

                    <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
                        <input
                            className="block w-full text-sm
                    text-slate-500 bg-transparent border-0
                    focus:outline-none focus:ring-0"
                            type="number"
                            step={0.01}
                            min={0.01}
                            name="price"
                            placeholder="Price (Eth)"
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            required
                        />
                    </div>

                    <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
                        <textarea
                            className="block w-full text-sm resize-none
                    text-slate-500 bg-transparent border-0
                    focus:outline-none focus:ring-0 h-20"
                            type="text"
                            name="description"
                            placeholder="Description"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            required
                        ></textarea>
                    </div>

                    <button onClick={handleSubmission}
                        className="flex flex-row justify-center items-center
                  w-full text-white text-md bg-[#e32970]
                  hover:bg-[#bd255f] py-2 px-5 rounded-full
                  drop-shadow-xl border border-transparent
                  hover:bg-transparent hover:text-[#e32970]
                  hover:border hover:border-[#bd255f]
                  focus:outline-none focus:ring mt-5"
                    >
                        Mint Now
                    </button>
                </div>
            </div>
        </div>
    )

    // return (
    //     <>
    //         <label class="form-label">Choose File</label>
    //         <input type="file" onChange={changeHandler} />
    //         <button onClick={handleSubmission}>Submit</button>
    //     </>
    // )
}

export default CreateNFT2;