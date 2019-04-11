pragma solidity 0.5.7;


contract SnakeDappDB {

    mapping(address => bool) private playerAddressMap;
    mapping(address => uint256) private playerNameMap;
    
    struct Score {
        uint256 name;
        address playerAddress;
        uint256 score;
    }
    
    Score[3] private scoresList;
    
    function setName(address playerAddress, uint256 playerName) public {
        require(playerAddressMap[playerAddress] == false);
        
        playerAddressMap[playerAddress] = true;
        playerNameMap[playerAddress] = playerName;
    }
    
    function getName(address playerAddress) public view returns (uint256) {
        return playerNameMap[playerAddress];
    }
    
    function setScore(address playerAddress, uint score) public {
        assert(playerAddressMap[playerAddress]);
        
        Score memory newScore = Score({
            name: playerNameMap[playerAddress],
            playerAddress: playerAddress,
            score: score
        });
        
        if (newScore.score >= scoresList[0].score) {
            scoresList[2] = scoresList[1];
            scoresList[1] = scoresList[0];
            scoresList[0] = newScore;
        } else if (newScore.score >= scoresList[1].score) {
            scoresList[2] = scoresList[1];
            scoresList[1] = newScore;
        } else if (newScore.score >= scoresList[2].score) {
            scoresList[2] = newScore;
        }
        
    }
    
    function getPlayerNames() public view returns (uint256[3] memory) {
        uint256[3] memory justNames;
        
        justNames[0] = scoresList[0].name;
        justNames[1] = scoresList[1].name;
        justNames[2] = scoresList[2].name;
        
        return justNames;
    }
    
    function getPlayerAddresses() public view returns (address[3] memory) {
        address[3] memory justAddresses;
        
        justAddresses[0] = scoresList[0].playerAddress;
        justAddresses[1] = scoresList[1].playerAddress;
        justAddresses[2] = scoresList[2].playerAddress;
        
        return justAddresses;
    }
    
    function getPlayerScores() public view returns (uint256[3] memory) {
        uint256[3] memory justScores;
        
        justScores[0] = scoresList[0].score;
        justScores[1] = scoresList[1].score;
        justScores[2] = scoresList[2].score;
        
        return justScores;
    }
}
