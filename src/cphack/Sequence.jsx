import { numTextMap } from "./common";

function Sequence({ currentGame, gameStarted }) {
    let i = 0;

    function getClass(seq)
    {
        return currentGame.buffer.join(" ").includes(seq.join(" ")) ? "completed" : "";
    }
  return (
    <div>
      <ul>
        {currentGame.sequences.map(seq => <li key={i++} className={getClass(seq)}>{seq.map(n => numTextMap[n]).join(" ")}</li>)}
      </ul>
    </div>
  );
}

export default Sequence;
