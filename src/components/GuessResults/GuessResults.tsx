import {range} from "../../utils";
import {NUM_OF_GUESSES_ALLOWED, NUM_OF_LETTERS_ALLOWED} from "../../constants";
import type {GuessResult} from "../../game-helpers.tsx";

function GuessResults({guessesList}: { guessesList: GuessResult[][] }) {

    const getLetter = (
        {index, letter}: { index: number, letter?: GuessResult }
    ) =>
        (<span key={index} className={`cell ${letter?.status}`}>
            {letter?.letter}
        </span>);

    const getRow = (
        {index, dataList}: { index: number, dataList?: GuessResult[] }
    ) =>
        (<p key={index} className="guess">
            {
                dataList ?
                    dataList.map((item, i) =>
                        getLetter({index: i, letter: item})) :
                    range(NUM_OF_LETTERS_ALLOWED).map((_, i) =>
                        getLetter({index: i}))
            }
        </p>);

    const output = range(NUM_OF_GUESSES_ALLOWED)
        .map((_, i) => getRow({index: i, dataList: guessesList[i]}));

    return (
        <div className="guess-results">
            {output}
        </div>
    );
}

export default GuessResults;
