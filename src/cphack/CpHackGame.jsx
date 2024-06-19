import Settings from "./Settings";
import SeqBuffer from "./SeqBuffer";
import Matrix from "./Matrix";
import Sequence from "./Sequence";
import Message from "./Message";
import { useState, useEffect } from "react";

function CpHackGame() {
  const [settings, setSettings] = useState({
    duration: 60,
    complexity: 4,
    columns: 5,
    rows: 5,
    buffer: 4,
    sequences: 3,
    maxSeqLength: 4,
    lengthFavor: 0,
  });

  const [gameStarted, setGameStarted] = useState(false);

  const [currentGame, setCurrentGame] = useState(initGame(false));

  function initGame(random = true) {
    let newMatrix = random ? getRandomMatrix() : getDefaultMatrix(0);
    let newClickedCells = getDefaultMatrix();
    let newMainSequence = getMainSequence(newMatrix);

    return {
      matrix: newMatrix,
      clickedCells: newClickedCells,
      line: 0,
      isRow: true,
      buffer: Array.from({ length: settings.buffer }, () => -1),
      bufferIndex: 0,
      mainSequence: newMainSequence,
      sequences: getSequences(newMainSequence),
    };
  }

  function finishGame() {
    setGameStarted(false);
  }

  function getRandomMatrix() {
    return Array.from({ length: settings.rows }, () =>
      Array.from({ length: settings.columns }, () =>
        randInt(settings.complexity)
      )
    );
  }

  function getDefaultMatrix(value = false) {
    return Array.from({ length: settings.rows }, () =>
      Array.from({ length: settings.columns }, () => value)
    );
  }

  function getMainSequence(matrix) {
    let clicked = getDefaultMatrix();
    let line = 0;
    let isRow = true;
    let sequence = Array(0);

    const seqLength = 8;
    for (let i = 0; i < seqLength; i++) {
      const maxLength = isRow ? settings.columns : settings.rows;
      let cellIndex = randInt(maxLength);

      if (isRow) {
        while (clicked[line][cellIndex]) cellIndex = randInt(maxLength);
        sequence.push(matrix[line][cellIndex]);
        clicked[line][cellIndex] = true;
      } else {
        while (clicked[cellIndex][line]) cellIndex = randInt(maxLength);
        sequence.push(matrix[cellIndex][line]);
        clicked[cellIndex][line] = true;
      }

      line = cellIndex;
      isRow = !isRow;
    }

    return sequence;
  }

  function getSequences(mainSequence) {
    let start = 0,
      length = 2;
    let sequences = Array(0);

    for (let i = 0; i < settings.sequences; i++) {
      const maxLength = parseInt(settings.maxSeqLength);
      if (settings.lengthFavor == 0) {
        length = randInt(maxLength + 1, 2);
      } else {
        length = weightedRandInt(maxLength + 1, 2, Math.abs(settings.lengthFavor), settings.lengthFavor < 0);
      }

      if (start + length >= mainSequence.length) {
        start = randInt(mainSequence.length - length);
      }

      let seq = mainSequence.slice(
        start,
        Math.min(mainSequence.length, start + length)
      );

      sequences.push(seq);
      start += length - randInt(2);
    }

    shuffleArray(sequences);

    return sequences;
  }

  function randInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function weightedRandInt(max, min = 0, weightFactor = 1, favorLower = true) {
    const weights = [...Array(max - min)].map((_, i) =>
      favorLower ? 1 / (i + 1) ** weightFactor : (i + 1) ** weightFactor
    );
    const totalWeight = weights.reduce((acc, val) => acc + val, 0);
    const normalizedWeights = weights.map((val) => val / totalWeight);

    const rand = Math.random();

    let sum = 0;

    for (let i = 0; i < max - min; i++) {
      sum += normalizedWeights[i];
      if (sum >= rand) {
        return i + min;
      }
    }

    return max - 1 + min;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  return (
    <>
      <Settings
        settings={settings}
        onChange={(newSettings) => setSettings(newSettings)}
        gameStarted={gameStarted}
        onStartButtonClicked={() => {
          if (!gameStarted) {
            setCurrentGame(initGame());
          }

          setGameStarted(!gameStarted);
        }}
      />
      <SeqBuffer currentGame={currentGame} gameStarted={gameStarted} />
      <Matrix
        currentGame={currentGame}
        gameStarted={gameStarted}
        onCellButtonClicked={(game, finish) => {
          setCurrentGame(game);
          if (finish) finishGame();
        }}
      />
      <Sequence currentGame={currentGame} gameStarted={gameStarted} />
      <Message
        currentGame={currentGame}
        gameStarted={gameStarted}
        time={settings.duration}
        onTimeout={() => finishGame()}
      />
    </>
  );
}

export default CpHackGame;
