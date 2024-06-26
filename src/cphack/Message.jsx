import Timer from "../common/Timer";

function Message({ currentGame, gameStarted, time, onTimeout }) {
  const init = 0;
  let completed = currentGame.sequences.reduce((acc, seq) => {
    let val = currentGame.buffer.join(" ").includes(seq.join(" ")) ? 1 : 0;
    return acc + val;
  }, init);
  function getClass() {
    let className = "";
    const required = currentGame.sequences.length;

    if (!gameStarted) {
        if (completed == 0)
            className += "bad";
        else if (completed < required)
            className += "okay";
        else className += "good";
    }
    
    return className;
  }
  return (
    <div className={"block content " + getClass()}>
      {gameStarted ? (
        <Timer startTime={time} onTimeout={onTimeout} text={"breach time remaining:"}/>
      ) : (
        `completed: ${completed}/${currentGame.sequences.length}`
      )}
    </div>
  );
}

export default Message;
