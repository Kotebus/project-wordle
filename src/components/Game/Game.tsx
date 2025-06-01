import {sample} from '../../utils';
import {WORDS} from '../../data';
import GuessInput from "../GuessInput";
import {useEffect, useState} from "react";
import GuessResults from "../GuessResults";
import {checkGuess, type GuessResult} from "../../game-helpers";
import {NUM_OF_GUESSES_ALLOWED} from "../../constants";
import Banner from '../Banner/Banner';
import {type GameStatus} from "../types";

function Game({
                  restartCount,
                  gameStatus,
                  setGameStatus}:
              {
                  restartCount: number,
                  gameStatus: GameStatus,
                  setGameStatus: (value: GameStatus) => void
              }) {

    const [answer, setAnswer] = useState('');

    const resetGame = () => {
        setNewAnswer();
        setWords([]);
        setGameStatus('playing');
    }
    useEffect(resetGame, [restartCount]);

    const setNewAnswer = () => {
        const gameSessionAnswer = sample(WORDS);
        setAnswer(gameSessionAnswer);
        console.info({gameSessionAnswer});
    }

    const [words, setWords] = useState<GuessResult[][]>([]);

    const processNewWord = (newWord: string) => {
        const processedWord = checkGuess(newWord, answer);
        if (processedWord !== null) {
            const nextWords = [...words, processedWord]
            setWords(nextWords);
            if (newWord === answer) {
                setGameStatus('won');
            } else if (nextWords.length === NUM_OF_GUESSES_ALLOWED) {
                setGameStatus('lost');
            }
        }
    }

    const getGameBody = ({status}: { status: GameStatus }) => {
        switch (status) {
            case 'playing':
                return <GuessInput setWord={processNewWord}/>;
            case 'won':
                return (
                    <Banner bannerType={'happy'}>
                        <strong>Congratulations!</strong> Got it in
                        {' '}
                        <strong>{words.length === 1 ? '1 guess' : `${words.length} guesses`}</strong>.
                    </Banner>
                );
            case 'lost':
                return (
                    <Banner bannerType={'sad'}>
                        <p>Sorry, the correct answer is <strong>{answer}</strong>.</p>
                    </Banner>
                );
            default: {
                console.error(`Unknown game status: ${status}`);
                return null;
            }
        }
    };

    return (
        <>
            <GuessResults guessesList={words}/>
            {getGameBody({status: gameStatus})}
        </>
    );
}

export default Game;
