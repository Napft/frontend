import "./nftPage.css"
import nft from "../assets/n-1.jpeg"

function Nftpage() {
    return (
      <div className="page  w-full h-screen flex justify-center">
        <div className="nft  flex flex-row h-4/5 w-10/12 bg-transparent">
          <div className="left rounded-xl flex h-full justify-center items-center w-1/3 bg-gray-800">
            <div className="image flex rounded-xl">
              <img className="rounded-xl" src={nft} />
            </div>
          </div>
          <div className="right p-16 justify-start flex flex-col justify-start inherit rounded-xl h-full w-2/3 bg-gray-800">
            <h2 className="font-bold mb-24 text-5xl text-gray-500">NFT Name</h2>
            <div className="flex text-left font-semibold text-2xl  text-gray-400  ">
              nftpara graphg jldfgfj dflgd flgjdsfasfgj ergjkper gkperkgh ergkp
              erkgpe gkpeggd fgdfgdgd fgdgdsg dsgerge rgdsgga gdfsg sgasgas
            </div>

            <div className="buttons flex  justify-end ">
              <button className="b-1  bg-red-600 hover:bg-red-700 mt-36 text-xl text-white font-bold py-2 px-6 border border-red-700 rounded-xl">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Nftpage;