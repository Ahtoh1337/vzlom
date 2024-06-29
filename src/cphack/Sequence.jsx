import { numTextMap } from "../utils";

function Sequence({ currentGame, gameStarted }) {
    let i = 0;

    function getClass(seq)
    {
        return currentGame.buffer.join(" ").includes(seq.join(" ")) ? "completed" : "";
    }
  return (
    <div className="block">
    <div className="header">sequence required to upload</div>
      <div>
        {currentGame.sequences.map(seq => <div key={i++} className={"seq " + getClass(seq)}>{seq.map(n => numTextMap[n]).join(" ")}</div>)}
      </div>
    </div>
  );
}

export default Sequence;
