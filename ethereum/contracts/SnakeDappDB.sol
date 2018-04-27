pragma solidity ^0.4.22;

contract SnakeDappDB {
    mapping(address => bool) playerAddresses;
    mapping(address => string) playerNames;
    
    struct Score {
        string name;
        address playerAddress;
        uint score;
    }
    Score[] public scoresComplete;
    uint[] public scores;
    
    function setName(address playerAddress, string playerName) public {
        require(playerAddresses[playerAddress] == false);
        
        playerAddresses[playerAddress] = true;
        playerNames[playerAddress] = playerName;
    }
    
    function getName(address playerAddress) public view returns (string) {
        return playerNames[playerAddress];
    }
    
    function setScore(address playerAddress, uint score) public {
        require(playerAddresses[playerAddress] == true);
        
        Score memory newScore = Score({
            name: playerNames[playerAddress],
            playerAddress: playerAddress,
            score: score
        });
        
        scoresComplete.push(newScore);
        scores.push(score);
    }
    
    function scores() public view returns (uint[]) {
        return scores;
    }
}