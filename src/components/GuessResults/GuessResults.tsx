import {range} from "../../utils";
import {NUM_OF_GUESSES_ALLOWED, NUM_OF_LETTERS_ALLOWED} from "../../constants";

function GuessResults({guessesList}:{guessesList:string[]} ) {
  const matrix = [...guessesList];
  for (let i=0; i < NUM_OF_GUESSES_ALLOWED - guessesList.length; i++) {
    matrix.push('');
  }
  const emptyWordArray = range(0, NUM_OF_LETTERS_ALLOWED).map(() => '');

  const getArrayFromWord = (word:string) => {
    const array = word.length === 0 ?
        emptyWordArray :
        word.split('');

    return array.map((letter, i) =>
        <span key={i} className="cell">{letter}</span>);
  }

  return (
      <div className="guess-results">
        {matrix.map((word, i) =>
            <p key={i} className="guess">
              { getArrayFromWord(word) }
            </p>)}
      </div>
  );
}

export default GuessResults;
