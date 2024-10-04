const hre = require("hardhat");

async function main() {
  console.log("Starting the script...");
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  console.log("Greeter contract fetched.");

  const greeter = await Greeter.deploy("Hello, Hardhat!");
  console.log("Greeter contract deployed. Waiting for it to be mined...");

  // Since the contract is being deployed, you can wait for it to be deployed
  await greeter.deployTransaction.wait(); // Wait for the transaction to be mined
  console.log("Greeter deployed to:", greeter.address);
}

main()
  .then(() => console.log("Script finished."))
  .catch((error) => {
    console.error("Error in script:", error);
  });
