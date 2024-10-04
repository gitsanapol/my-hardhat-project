// scripts/verifyCandidates.js

async function main() {
    const [deployer] = await ethers.getSigners();
    const votingContractAddress = "0x3aa5ebb10dc797cac828524e59a333d0a371443c"; // Replace with your deployed contract address

    // Load the Voting contract using ABI and address
    const Voting = await ethers.getContractFactory("Voting");
    const votingContract = await Voting.attach(votingContractAddress);

    // Test valid candidates
    const isValid1 = await votingContract.validCandidate(1);
    console.log("Is candidate 1 valid?", isValid1); // Should return true if initialized properly

    const isValid2 = await votingContract.validCandidate(2);
    console.log("Is candidate 2 valid?", isValid2); // Should return true if initialized properly

    const isValid4 = await votingContract.validCandidate(4);
    console.log("Is candidate 4 valid?", isValid4); // Should return false if not initialized
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
