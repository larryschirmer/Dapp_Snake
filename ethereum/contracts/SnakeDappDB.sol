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

    function setName(string playerName) public {
        address playerAddress = msg.sender;
        require(playerAddresses[playerAddress] == false);
        
        playerAddresses[playerAddress] = true;
        playerNames[playerAddress] = playerName;
    }
    
    function getName() public view returns (string) {
        address playerAddress = msg.sender;
        return playerNames[playerAddress];
    }
    
    function setScore(uint score) public {
        address playerAddress = msg.sender;
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