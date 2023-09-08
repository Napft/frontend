import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "./createNft.css"

function CreateNFT() {
  // Component State Variables
  /// Form Fields
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [imgBase64, setImgBase64] = useState(null);
  const [tags, setTags] = useState("");

  // Local Helper functions
  /// 1. Image Change Event Handler
  const change_image = async (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
    reader.onload = (readerEvent) => {
      const file = readerEvent.target.result;
      setImgBase64(file);
      setFileUrl(e.target.files[0]);
    };
  };
  /// 2. CLose Model Butten onCLick Event Handler
  const close_modal = () => {
    reset_form();
  };
  /// 3. To reset the fields of the form
  const reset_form = () => {
    setFileUrl("");
    setImgBase64(null);
    setTitle("");
    setPrice("");
    setDescription("");
  };
  /// 4. (Handle Submission) Submit button onCLick Event Handler
  const handle_submission = async (e) => {
    e.preventDefault();
    if (!title || !price || !description) return;
  };

  return (
    <div
      className={` w-full h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300`}
    >
      <div className="box bg-[rgb(21,28,37)]  rounded-xl py-6  px-64">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold text-5xl text-gray-400">Add NFT</p>
            <div className="flex flex-row justify-center items-center rounded-xl mt-5">
              <div className="shrink-0 rounded-xl overflow-hidden h-44 w-54">
                <img
                  alt="NFT"
                  className="h-full w-full object-cover cursor-pointer"
                  src={
                    imgBase64 ||
                    "data:image/jpeg;base64,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"
                  }
                />
              </div>
            </div>
          </div>
          {/* Selected Image */}

          {/* ============================================================================================================================================================================================= */}
          {/* Form field 1 (File): Input Field to choose NFT Image  */}
          <div className="flex flex-row text-2xl justify-between items-center bg-gray-800 p-4 rounded-xl mt-5">
            <label className="block">
              <span className="text-xl sr-only">Choose profile photo</span>
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg, image/webp"
                className="block w-full text-2xl text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#19212c] file:text-gray-400 hover:file:bg-[#1d2631] cursor-pointer focus:ring-0 focus:outline-none"
                onChange={change_image}
                required
              />
            </label>
          </div>
          {/* Form field 2 (text):  Title */}
          <div className="flex p-4 flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
            <input
              className="block w-full text-2xl text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0"
              type="text"
              name="title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div>
          {/* Form field 3 (number) : Ammount*/}
          <div className="flex p-4 flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
            <input
              className="block w-full text-2xl text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0"
              type="number"
              step={0.01}
              min={0.01}
              name="price"
              placeholder="Price (Matic)"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>
          {/* Form field 4 (text):  Tags */}
          <div className="flex p-4 flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
            <input
              className="block w-full text-2xl text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0"
              type="text"
              name="tags"
              placeholder="Chain"
              onChange={(e) => setTags(e.target.value)}
              value={tags}
            />
          </div>
          {/* Form field 4 (text) : Description */}
          <div className="flex p-4 flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
            <textarea
              className="block w-full text-2xl resize-none text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0 h-20"
              type="text"
              name="description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>
          </div>
          {/* Input Field = Description */}

          {/* Minting Function */}
          <button
            type="submit"
            onClick={handle_submission}
            className="flex flex-row justify-center items-center w-full text-white text-2xl bg-[#e32970] hover:bg-[#bd255f] py-2 px-5 rounded-full drop-shadow-xl border border-transparent hover:bg-transparent hover:text-[#e32970] border-red hover:border-red-700  mt-5"
          >
            Mint Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateNFT;
