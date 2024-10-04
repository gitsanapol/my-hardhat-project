// Importing the Hardhat Runtime Environment
const hre = require("hardhat");

async function main() {
  // Deploying the contract with predefined candidate IDs
  const candidateIds = [6604062857026, 6604062857042, 6604062857107, 6604062857115]; // Candidate IDs used in the contract
  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy(candidateIds);

  await voting.deployed();

  console.log("Voting contract deployed to:", voting.address);
}

// Handling errors in async functions
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
