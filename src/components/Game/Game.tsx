import {sample} from '../../utils';
import {WORDS} from '../../data';
import GuessInput from "../GuessInput";
import {type ReactNode, useState} from "react";
import GuessResults from "../GuessResults";
import {checkGuess, type GuessResult} from "../../game-helpers.tsx";
import {NUM_OF_GUESSES_ALLOWED} from "../../constants.tsx";

// Pick a random word on every page load.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({answer});

type GameStatus = 'playing' | 'won' | 'lost';

function Banner({bannerType, children}: { bannerType: 'happy' | 'sad', children: ReactNode }) {
    return (
        <div className={`${bannerType} banner`}>
            {children}
        </div>
    );
}

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

    const getGameBody = ({status}: { status: GameStatus }) => {
        switch (status) {
            case 'playing':
                return <GuessInput setWord={processNewWord}/>;
            case 'won':
                return (
                    <Banner bannerType={'happy'}>
                        <strong>Congratulations!</strong> Got it in <strong>{words.length} guesses</strong>.
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
