const axios = require("axios");
const FormData = require("form-data");
const Dot = require("dotenv").config();
const fs = require("fs");
const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const formidable = require("express-formidable")
app.options("/generate", cors());

router.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post(
  "/generate",
  (req, res) => {
    console.log(req.body)
       run(
      req.body.img,
      req.body.image_name,
      req.body.name,
      req.body.description,
      req.body.to
    );
    res.status(200);
  }
);
app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const starton = axios.create({
  baseURL: "https://api.starton.io/v2",
  headers: {
    "x-api-key": process.env.STARTON_API_KEY,
  },
});

// The image variable should be a buffer
async function uploadImageOnIpfs(image, name) {
  let data = new FormData();
  data.append("file", image, name);
  data.append("isSync", "true");

  const ipfsImg = await starton.post("/pinning/content/file", data, {
    maxBodyLength: "Infinity",
    headers: {
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
    },
  });
  return ipfsImg.data;
}

async function uploadMetadataOnIpfs(imgCid, nftName, nftDescription) {
  const metadataJson = {
    name: `${nftName}`,
    description: `${nftDescription}`,
    image: `ipfs://ipfs/${imgCid}`,
  };
  const ipfsMetadata = await starton.post("/pinning/content/json", {
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
  const nft = await starton.post(
    `/smart-contract/${SMART_CONTRACT_NETWORK}/${SMART_CONTRACT_ADDRESS}/call`,
    {
      functionName: "safeMint",
      signerWallet: WALLET_IMPORTED_ON_STARTON,
      speed: "low",
      params: [receiverAddress, metadataCid],
    }
  );
  return nft.data;
}

async function run(img, imgName, name, description, to) {
    const imgBuffer = img;
  const ipfsImg = await uploadImageOnIpfs(imgBuffer, imgName);
  const ipfsMetadata = await uploadMetadataOnIpfs(
    ipfsImg.pinStatus.pin.cid,
    name,
    description
  );
  const nft = await mintNft(to, ipfsMetadata.pinStatus.pin.cid);
}
