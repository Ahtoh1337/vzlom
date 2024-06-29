import { useState } from "react";
import Settings from "./Settings";
import { randInt, words } from "../utils";
import Message from "./Message";
import Selector from "./Selector";
import "./fallout.css";

function FalloutGame() {
  const [settings, setSettings] = useState({
    duration: 60,
    attempts: 4,
    length: 5,
    numOfWords: 10,
    highlight: false,
  });

  const [currentGame, setCurrentGame] = useState(initGame());

  const [gameStarted, setGameStarted] = useState(false);

  const [log, setLog] = useState([]);

  function initGame() {
    let currentWords = Array(0);

    for (let i = 0; i < settings.numOfWords; i++) {
      let newWord =
        words[settings.length][randInt(words[settings.length].length)];
      while (currentWords.includes(newWord)) {
        newWord =
          words[settings.length][randInt(words[settings.length].length)];
      }
      currentWords.push(newWord);
    }

    return {
      currentWords,
      correctWord: currentWords[randInt(currentWords.length)],
      attemptsLeft: settings.attempts,
      solved: false,
    };
  }

  function handleWordClick(e) {
    const word = e.target.innerText;
    let toLog = word.toUpperCase();
    let stop = false;

    if (word.toLowerCase() === currentGame.correctWord) {
      setCurrentGame({ ...currentGame, solved: true });
      setGameStarted(false);
      toLog += " Correct!";
      stop = true;
    }

    if (!stop) {
      setCurrentGame({
        ...currentGame,
        attemptsLeft: currentGame.attemptsLeft - 1,
      });
      const correctLetters = word.split("").reduce((acc, l, i) => {
        if (currentGame.correctWord[i] === l.toLowerCase()) {
          return acc + 1;
        }
        return acc;
      }, 0);
      toLog += ` ${correctLetters}/${settings.length} correct.`;
      if (currentGame.attemptsLeft > 1) {
        stop = true;
      }
    }

    setLog(log.concat([toLog]));

    if (!stop) setGameStarted(false);
  }

  return (
    <div id="fallout">
      <div className="terminal">
        <Settings
          settings={settings}
          gameStarted={gameStarted}
          onChange={(newSettings) => setSettings(newSettings)}
          onStartButtonClicked={() => {
            if (!gameStarted) {
              setCurrentGame(initGame());
              setLog([]);
            }

            setGameStarted(!gameStarted);
          }}
        />
        <div className="block line">
          Attempts left:{" "}
          {Array.from({ length: currentGame.attemptsLeft }, () => " X")}
        </div>
        <div className="selector-log-container">
          <Selector
            length={settings.length}
            highlight={settings.highlight}
            gameStarted={gameStarted}
            currentGame={currentGame}
            onWordButtonClicked={handleWordClick}
          />
          <div className="block line log">
            {log.map((m, i) => (
              <span key={i}>
                {m}
                <br />
              </span>
            ))}
          </div>
        </div>
        <Message
          time={settings.duration}
          currentGame={currentGame}
          gameStarted={gameStarted}
          onTimeout={() => setGameStarted(false)}
        />
      </div>
    </div>
  );
}

export default FalloutGame;
