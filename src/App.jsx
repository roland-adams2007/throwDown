import { useState,useEffect } from 'react';

function App() {
  const choices = ['rock', 'paper', 'scissors'];



  const [outcome, setOutcome] = useState('');
  const [userChoice, setUserChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameOver,setGameOver] = useState(false);
  const [winner,setWinner]=useState('');

  const roundsToWin = 10;
  useEffect(() => {
    if (playerScore >= roundsToWin || computerScore >= roundsToWin) {
      setGameOver(true);
      setWinner(playerScore > computerScore ? 'Player' : 'Computer');
    }
  }, [playerScore, computerScore]);


  const handleUserChoice = (userChoice) => {
    if(!gameOver){
      const computerChoice = handleRandomChoice();
      setOutcome(determineResult(userChoice, computerChoice));
      setUserChoice(userChoice);
      setComputerChoice(computerChoice);
    }
  };

  const handleRandomChoice = () => {
    return choices[Math.floor(Math.random() * choices.length)];
  };

  const determineResult = (userChoice, computerChoice) => {
    if (computerChoice === userChoice) {
      return "It's a tie!";
    }

    switch (userChoice) {
      case 'rock':
        if (computerChoice === 'scissors') {
          setPlayerScore((prevScore) => prevScore + 1);
          return 'Rock beats scissors, you win!';
        } else {
          setComputerScore((prevScore) => prevScore + 1);
          return 'Paper beats rock, you lose!';
        }
      case 'paper':
        if (computerChoice === 'rock') {
          setPlayerScore((prevScore) => prevScore + 1);
          return 'Paper beats rock, you win!';
        } else {
          setComputerScore((prevScore) => prevScore + 1);
          return 'Scissors beats paper, you lose!';
        }
      case 'scissors':
        if (computerChoice === 'paper') {
          setPlayerScore((prevScore) => prevScore + 1);
          return 'Scissors beats paper, you win!';
        } else {
          setComputerScore((prevScore) => prevScore + 1);
          return 'Rock beats scissors, you lose!';
        }
      default:
        return '';
    }
  };

  const resetGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setUserChoice('');
    setComputerChoice('');
    setOutcome('');
    setGameOver(false);
    setWinner('');
  };


  return (
    <>
      {/* Game Container */}
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg text-white text-center">
        <h1 className="text-2xl font-bold mb-4">ThrowDown Game</h1>

        {gameOver ? 
        <>
          <div className="game-over text-2xl font-semibold mt-6">
          <p>{winner} wins the game!</p>
          <button onClick={resetGame} className="mt-4 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700">
            Play Again
          </button>
        </div>
        </>:
         <>
         {/* Score Display */}
         <div className="flex justify-between text-lg mb-6">
          <div>
            <p className="font-semibold">Player Score</p>
            <p id="player-score" className="text-4xl">{playerScore}</p>
            <progress
                max={roundsToWin}
                value={playerScore}
                className="w-full mt-2 bg-red-500"
              ></progress>
          </div>
          <div>
            <p className="font-semibold">Computer Score</p>
            <p id="computer-score" className="text-4xl">{computerScore}</p>
            <progress
                max={roundsToWin}
                value={computerScore}
                className="w-full mt-2 bg-red-500"
              ></progress>
          </div>
        </div>

        <div className="flex justify-around items-center">
          <button className="choice bg-blue-500 hover:bg-blue-600 p-4 rounded-lg transform hover:scale-105" onClick={() => handleUserChoice('rock')}>
            <img src="https://img.icons8.com/ios-filled/50/ffffff/hand-rock.png" alt="Rock" />
          </button>
          <button className="choice bg-green-500 hover:bg-green-600 p-4 rounded-lg transform hover:scale-105" onClick={() => handleUserChoice('paper')}>
            <img src="https://img.icons8.com/ios-filled/50/ffffff/hand.png" alt="Paper" />
          </button>
          <button className="choice bg-red-500 hover:bg-red-600 p-4 rounded-lg transform hover:scale-105" onClick={() => handleUserChoice('scissors')}>
            <img src="https://img.icons8.com/ios-filled/50/ffffff/hand-scissors.png" alt="Scissors" />
          </button>
        </div>

        {/* Result Display */}
        <p className="mt-8 text-xl font-semibold animate-pulse">
            {outcome ? outcome : 'Choose Rock, Paper, or Scissors!'}
          </p>
          <div className="mt-4 text-lg">
            <span>Player's choice: {userChoice || 'None'}</span> | <span>Computer's choice: {computerChoice || 'None'}</span>
          </div>
        </>}
        
       
        
        {/* Choices */}

      </div>
    </>
  );
}

export default App;
