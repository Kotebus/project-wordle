import { sample } from '../../utils';
import { WORDS } from '../../data';
import GuessInput from "../GuessInput";
import {useState} from "react";
import GuessResults from "../GuessResults";
import {checkGuess, type GuessResult} from "../../game-helpers.tsx";
import {NUM_OF_GUESSES_ALLOWED} from "../../constants.tsx";

// Pick a random word on every page load.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function HappyBanner({numOfGuesses}:{numOfGuesses:number}) {
  return (
      <div className="happy banner">
        <p>
          <strong>Congratulations!</strong> Got it in <strong>{numOfGuesses} guesses</strong>.
        </p>
      </div>
  );
}

function SadBanner() {
  return (
      <div className="sad banner">
        <p>Sorry, the correct answer is <strong>LEARN</strong>.</p>
      </div>
  );
}

type GameStatus = 'playing' | 'won' | 'lost';

function Game() {
  const [words, setWords] = useState<GuessResult[][]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');

  const processNewWord = (newWord: string) => {
    const processedWord = checkGuess(newWord, answer);
    if (processedWord !== null) {
      const nextWords = [...words, processedWord]
      setWords(nextWords);
      if (processedWord.every((item) => item.status === 'correct')) {
        setGameStatus('won');
      }
      if (nextWords.length === NUM_OF_GUESSES_ALLOWED) {
        setGameStatus('lost');
      }
    }
  }

  return (
      <>
        <GuessResults guessesList={words}/>
        {gameStatus === 'lost' && <SadBanner/>}
        {gameStatus === 'won' && <HappyBanner numOfGuesses={words.length}/>}
        {gameStatus === 'playing' && <GuessInput setWord={processNewWord}/>}
      </>
  );
}

export default Game;
