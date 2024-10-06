// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract zkSTARKVotingVerifier {
    event VoteCast(address indexed voter, uint256 candidateId, uint256 zkProof);
    
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    mapping(uint256 => Candidate) public candidates;
    mapping(address => bool) public hasVoted;

    uint256 public candidatesCount;

    constructor() {
        addCandidate("Alice");
        addCandidate("Bob");
    }

    function addCandidate(string memory name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, name, 0);
    }

    function vote(uint256 candidateId, uint256 zkProof) public {
        require(!hasVoted[msg.sender], "You have already voted.");
        require(candidateId > 0 && candidateId <= candidatesCount, "Invalid candidate ID.");

        // Verificação do zkProof deve ser implementada aqui
        // require(verifyZkProof(zkProof), "Invalid zkProof.");

        hasVoted[msg.sender] = true;
        candidates[candidateId].voteCount++;
        emit VoteCast(msg.sender, candidateId, zkProof);
    }

    function getCandidate(uint256 candidateId) public view returns (Candidate memory) {
        require(candidateId > 0 && candidateId <= candidatesCount, "Invalid candidate ID.");
        return candidates[candidateId];
    }
}