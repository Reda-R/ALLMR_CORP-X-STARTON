const axios = require("axios");
const FormData = require("form-data");
const Dot = require("dotenv").config();
const fs = require("fs");
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


const starton = axios.create({
    baseURL: "https://api.starton.io/v2",
    headers: {
        "x-api-key": process.env.STARTON_API_KEY,
    },
});

function createBufferFile(path) {
    return fs.readFileSync(path);
}

// The image variable should be a buffer
async function uploadImageOnIpfs(image, name) {
    let data = new FormData();
    data.append("file", image, name);
    data.append("isSync", "true");
    
    const ipfsImg = await starton.post("/pinning/content/file", data, {
        maxBodyLength: "Infinity",
        headers: { "Content-Type": `multipart/form-data; boundary=${data._boundary}` },
    });
    return ipfsImg.data;
}

async function uploadMetadataOnIpfs(imgCid, nftName, nftDescription) {
    const metadataJson = {
        name: `${nftName}`,
        description: `${nftDescription}`,
        image: `ipfs://ipfs/${imgCid}`,
    };
    const ipfsMetadata = await starton.post("/pinning/content/json",
    {
        name: "My NFT metadata Json",
        content: metadataJson,
        isSync: true,
    });
    return ipfsMetadata.data;
}

const SMART_CONTRACT_NETWORK = "polygon-mumbai";
const SMART_CONTRACT_ADDRESS = "0xA0Ca3667Fa4483764065ACf989f41DADC3a441d0";
const WALLET_IMPORTED_ON_STARTON = "0x614ACFfC68508d8F0C01Bd235Ee8ae622F8E2558";
async function mintNft(receiverAddress, metadataCid) {
    const nft = await starton.post(`/smart-contract/${SMART_CONTRACT_NETWORK}/${SMART_CONTRACT_ADDRESS}/call`,
{
    functionName: "safeMint",
    signerWallet: WALLET_IMPORTED_ON_STARTON,
    speed: "low",
    params: [receiverAddress, metadataCid],
});
    return nft.data;
}

async function run(path, imgName, name, description, to) {
    const imgBuffer = createBufferFile(path);
    const ipfsImg = await uploadImageOnIpfs(imgBuffer, imgName)
    console.log(ipfsImg)
    const ipfsMetadata = await uploadMetadataOnIpfs(ipfsImg.pinStatus.pin.cid, name, description)
    console.log(ipfsMetadata)
    const nft = await mintNft(to, ipfsMetadata.pinStatus.pin.cid)
    console.log(nft)
}

// run("./hashira.jpg", "pilier", "corp", "ok", "0x77B35735Bbb7e7B523B18Eae37D62965eB1d45fe");

// recup nft on opensea testnet and enter the Smart contract into the