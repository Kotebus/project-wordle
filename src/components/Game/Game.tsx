import { sample } from '../../utils';
import { WORDS } from '../../data';
import GuessInput from "../GuessInput";
import {useState} from "react";
import GuessResults from "../GuessResults";

// Pick a random word on every page load.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [words, setWords] = useState<string[]>([]);
  return <>
    <GuessResults guessesList={words}/>
    <GuessInput setWord={(newWord) => {
      setWords([...words, newWord]);
    }}/>
  </>;
}

export default Game;
