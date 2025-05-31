import { sample } from '../../utils';
import { WORDS } from '../../data';
import GuessInput from "../GuessInput";
import {useState} from "react";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [words, setWords] = useState<string[]>([]);
  return <>
    <div className="guess-results">
      { words.map((word, i) =>
          <p key={i} className="guess">{ word }</p>)
      }
    </div>
    <GuessInput setWord={(newWord) => {
      setWords([...words, newWord]);
    }}/>
  </>;
}

export default Game;
