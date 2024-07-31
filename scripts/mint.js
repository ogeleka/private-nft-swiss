//const hre = require("hardhat");
const {
  ethers,
  network,
} = require("hardhat");

//const HttpNetworkConfig = require("hardhat/types");

const {
  encryptDataField,
  decryptNodeResponse,
} = require("@swisstronik/swisstronik.js");


const sendShieldedTransaction = async (signer, destination, data, value) => {

  const rpcLink = network.config.url;

  const [encryptedData] = await encryptDataField(rpcLink, data);

  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {

  const contractAddress = "0x4C7274E04D219EC07CB9F1eb82db349D7bce71c8";

  const [signer] = await ethers.getSigners();

  const contractFactory = await ethers.getContractFactory("TestNFT");
  const contract = contractFactory.attach(contractAddress);

  const functionName = "mintNFT";
  const recipientAddress = signer.address;
  const mintToken = await sendShieldedTransaction(
    signer,
    contractAddress,
    contract.interface.encodeFunctionData(functionName, [recipientAddress]),
    0
  );

  await mintToken.wait();

  console.log("Mint Transaction Hash: ", mintToken.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
