import "./connectWallet.css";

function Connect() {
  return (
    <div className="connect">
      <div className="wallet">
        <h1>Connect Your Wallet</h1>
        <div className="wallets">
          <div className="w1">
            <img
              className="image"
              src="https://res.cloudinary.com/practicaldev/image/fetch/s--PlANpFjM--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ums1l7awe2cxdnqzp39j.png"
            />
            <div className="c1">Connect to MetaMask</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Connect;
