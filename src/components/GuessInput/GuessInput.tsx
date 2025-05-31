import {FormEvent, useState} from "react";

function GuessInput({setWord}: { setWord: (value: string) => void }) {
  const [guess, setGuess] = useState('');

  const onGuessSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const wordForSubmit = guess.trim();
    if (wordForSubmit.length !== 5) {
      return;
    }
    setWord(guess.toUpperCase());
    setGuess('');
  }

  return (<form className="guess-input-wrapper" onSubmit={onGuessSubmit}>
    <label htmlFor="guess-input">Enter guess:</label>
    <input id="guess-input"
           type="text"
           value={guess}
           onChange={(e) => setGuess(e.target.value)}
           maxLength={5}
           placeholder={'* * * * *'}
           pattern="^[a-zA-Z]{5}$"/>
  </form>);
}

export default GuessInput;
