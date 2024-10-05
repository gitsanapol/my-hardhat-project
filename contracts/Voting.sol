// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    address public admin;
    mapping(uint => uint) public votesReceived;
    uint[] public candidateIds;

    struct Vote {
        uint candidateId;
        string studentId;
    }

    Vote[] public voteLog; // Array to store the vote log
    mapping(string => bool) public hasVoted; // Track if a student ID has voted

    constructor(uint[] memory candidateIds_) {
        admin = msg.sender; // Set the deployer as the admin
        candidateIds = candidateIds_;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    function vote(uint candidateId, string memory studentId) public onlyAdmin {
        require(validCandidate(candidateId), "Invalid candidate ID");
        require(!hasVoted[studentId], "Student has already voted"); // Check if user has voted
        votesReceived[candidateId] += 1;
        voteLog.push(Vote(candidateId, studentId)); // Log the vote with studentId
        hasVoted[studentId] = true; // Mark the student as having voted
        emit VoteRecorded(candidateId, studentId);
    }

    function totalVotesFor(uint candidateId) public view returns (uint) {
        require(validCandidate(candidateId), "Invalid candidate ID");
        return votesReceived[candidateId];
    }

    function validCandidate(uint candidateId) public view returns (bool) {
        for (uint i = 0; i < candidateIds.length; i++) {
            if (candidateIds[i] == candidateId) {
                return true;
            }
        }
        return false;
    }

    function getVoteLog() public view returns (Vote[] memory) {
        return voteLog;
    }

    function hasStudentVoted(string memory studentId) public view returns (bool) {
        return hasVoted[studentId];
    }

    event VoteRecorded(uint candidateId, string studentId); // Event to emit when a vote is recorded
}
