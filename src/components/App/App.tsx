import Game from '../Game';
import Header from '../Header';
import {useEffect, useState} from "react";
import type {GameStatus} from "../types.ts";

function App() {
    const [restartCount, setRestartCount] = useState(0);
    const [gameStatus, setGameStatus] = useState<GameStatus>('playing');

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if ((e.key === 'Enter' && gameStatus !== 'playing') || e.key === 'Escape') {
                setRestartCount(restartCount + 1);
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameStatus]);

    return (
        <div
            className="wrapper"
            onClickCapture={() => gameStatus !== 'playing' && setRestartCount(restartCount + 1)}
        >
            <Header/>
            <div className="game-wrapper">
                <p>
                    { gameStatus === 'playing' ?
                        <>For restart press <kbd>Esc</kbd>.</> :
                        <>For restart press <kbd>Enter</kbd>, <kbd>Esc</kbd> or click anywhere.</>}
                </p>
                <Game
                    gameStatus={gameStatus}
                    setGameStatus={setGameStatus}
                    restartCount={restartCount}/>
            </div>
        </div>
    );
}

export default App;
