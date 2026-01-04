// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    mapping(address => bool) public hasVoted;
    bytes32[] public voteHashes;

    function castVote(bytes32 voteHash) public {
        require(!hasVoted[msg.sender], "Already voted");
        hasVoted[msg.sender] = true;
        voteHashes.push(voteHash);
    }

    function getTotalVotes() public view returns (uint) {
        return voteHashes.length;
    }
}
