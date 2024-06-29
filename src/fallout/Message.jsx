import Timer from "../common/Timer";

function Message({ currentGame, gameStarted, time, onTimeout }) {
  function getClass() {
    if (gameStarted) return "";

    if (currentGame.solved) return "good";

    return "bad";
  }

  return (
    <div className={"block " + getClass()}>
      {gameStarted ? (
        <Timer startTime={time} onTimeout={onTimeout} text={"Time left:"}/>
      ) : currentGame.solved ? (
        "Access granted. Logging in..."
      ) : (
        "Access denied. Terminal locked."
      )}
    </div>
  );
}

export default Message;