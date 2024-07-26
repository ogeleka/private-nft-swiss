const { ethers } = require("hardhat");

async function main() {
  const erc721 = await ethers.deployContract("TestNFT");
  await erc721.waitForDeployment();

  console.log(`ERC-721 was deployed to ${erc721.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
