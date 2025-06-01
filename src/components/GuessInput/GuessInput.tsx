import {type FormEvent, useState} from "react";
import {NUM_OF_LETTERS_ALLOWED} from "../../constants";

function GuessInput({setWord}: { setWord: (value: string) => void }) {
    const [guess, setGuess] = useState('');

    const handleGuessSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const wordForSubmit = guess.trim();
        if (wordForSubmit.length !== NUM_OF_LETTERS_ALLOWED) {
            return;
        }
        setWord(guess.toUpperCase());
        setGuess('');
    }

    return (
        <form className="guess-input-wrapper" onSubmit={handleGuessSubmit}>
            <label htmlFor="guess-input">Enter guess:</label>
            <input id="guess-input"
                   type="text"
                   required
                   minLength={NUM_OF_LETTERS_ALLOWED}
                   maxLength={NUM_OF_LETTERS_ALLOWED}
                   value={guess}
                   onChange={(e) => setGuess(e.target.value)}
                   placeholder={'* * * * *'}
                   pattern={`^[a-zA-Z]{${NUM_OF_LETTERS_ALLOWED}}$`}
                   title={`Must be ${NUM_OF_LETTERS_ALLOWED} letters`}/>
        </form>
    );
}

export default GuessInput;
