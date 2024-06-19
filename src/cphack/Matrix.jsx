import { numTextMap } from "./common";

function Matrix({ currentGame, gameStarted, onCellButtonClicked }) {
  let r = 0;

  function isCellEnabled(r, c) {
    if (!gameStarted) return false;

    if (currentGame.clickedCells[r][c]) return false;

    if (currentGame.isRow && r == currentGame.line) return true;

    if (!currentGame.isRow && c == currentGame.line) return true;

    return false;
  }

  function onCellClicked(id) {
    const [r, c] = id.split(" ");
    let newIsRow = !currentGame.isRow;

    let newLine = newIsRow ? r : c;

    let newClickedCells = currentGame.clickedCells.map((row) =>
      row.map((col) => col)
    );
    newClickedCells[r][c] = true;

    let newBuffer = currentGame.buffer.map((i) => i);
    newBuffer[currentGame.bufferIndex] = currentGame.matrix[r][c];

    let newBufferIndex = currentGame.bufferIndex + 1;

    let finishGame = newBufferIndex >= newBuffer.length || currentGame.sequences.every(seq => newBuffer.join(' ').includes(seq.join(' ')));

    onCellButtonClicked({
      ...currentGame,
      isRow: newIsRow,
      line: newLine,
      clickedCells: newClickedCells,
      buffer: newBuffer,
      bufferIndex: newBufferIndex,
    }, finishGame);
  }

  function displayCellText(col, r, c) {
    if (currentGame.clickedCells[r][c]) return "--";
    return numTextMap[col];
  }

  function setCellClass(r, c) {
    if (!gameStarted) return "";

    let cellClass = "";
    if (currentGame.isRow && r == currentGame.line) cellClass += "current-line";
    if (!currentGame.isRow && c == currentGame.line)
      cellClass += "current-line";

    return cellClass;
  }

  return (
    <div>
      <table>
        <tbody>
          {currentGame.matrix.map((row) => {
            let c = -1;
            return (
              <tr key={++r}>
                {row.map((col) => {
                  let key = `${r} ${++c}`;
                  return (
                    <td key={key}>
                      <button
                        id={key}
                        disabled={!isCellEnabled(r, c)}
                        onClick={(e) => onCellClicked(e.currentTarget.id)}
                        className={setCellClass(r, c)}
                      >
                        {displayCellText(col, r, c)}
                      </button>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Matrix;
