// Import necessary modules from Hardhat and SwisstronikJS
const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");

// Function to send a shielded query using the provided provider, destination, and data
const sendShieldedQuery = async (provider, destination, data) => {
  // Get the RPC link from the network configuration
  const rpcLink = hre.network.config.url;

  // Encrypt the call data using the SwisstronikJS function
  const [encryptedData, usedEncryptionKey] = await encryptDataField(rpcLink, data);

  // Execute the call/query using the provider
  const response = await provider.call({
    to: destination,
    data: encryptedData,
  });

  // Decrypt the call result using the SwisstronikJS function
  return await decryptNodeResponse(rpcLink, response, usedEncryptionKey);
};

async function main() {
  // Address of the deployed contract
  const replace_contractAddress = "0x7FE53b5DB091AE47322E3D215b61F75682adA14d";

  // Get the signer (your account)
  const [signer] = await hre.ethers.getSigners();

  // Create a contract instance
  const replace_contractFactory = await hre.ethers.getContractFactory("TestNFT");
  const contract = replace_contractFactory.attach(replace_contractAddress);

  // Send a shielded query to retrieve balance data from the contract
  const replace_functionName = "balanceOf";
  const replace_functionArgs = ["0x937A69b4CBC94be3e8DA893775f9969311356a67"];
  const responseMessage = await sendShieldedQuery(signer.provider, replace_contractAddress, contract.interface.encodeFunctionData(replace_functionName, replace_functionArgs));

  // Decode the Uint8Array response into a readable string
  console.log("Decoded response:", contract.interface.decodeFunctionResult(replace_functionName, responseMessage)[0]);
}

// Using async/await pattern to handle errors properly
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
