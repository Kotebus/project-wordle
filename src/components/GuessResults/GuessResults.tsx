import {range} from "../../utils";
import {NUM_OF_GUESSES_ALLOWED, NUM_OF_LETTERS_ALLOWED} from "../../constants";
import type {GuessResult} from "../../game-helpers.tsx";

function GuessResults({guessesList}:{guessesList:GuessResult[][]} ) {

    const getLetter = (ind: number, item?: GuessResult) =>
        (<span key={ind} className={`cell ${item?.status}`}>
            {item?.letter}
        </span>);

    const getRow = (ind: number, list?: GuessResult[]) =>
        (<p key={ind} className="guess">
            {
                list ?
                    list.map((item, i) => getLetter(i, item)) :
                    range(NUM_OF_LETTERS_ALLOWED).map((_, i) => getLetter(i))
            }
        </p>);

    const output = range(NUM_OF_GUESSES_ALLOWED)
        .map((_, i) => getRow(i, guessesList[i]));

    return (
        <div className="guess-results">
            {output}
        </div>
    );
}

export default GuessResults;
