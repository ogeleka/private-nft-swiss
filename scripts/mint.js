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

  const contractAddress = "0x7FE53b5DB091AE47322E3D215b61F75682adA14d";

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
