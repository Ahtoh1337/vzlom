import { hashCode, RNG } from "../utils";

function Selector({ length, highlight, currentGame, gameStarted, onWordButtonClicked }) {
  const rng = new RNG(Math.abs(hashCode(currentGame.currentWords.join(""))));
  function getJunkString(length) {
    const junkSymbols = [
      ":",
      ";",
      "@",
      "{",
      "}",
      "+",
      "-",
      "#",
      "&",
      "$",
      "%",
      "*",
      "/",
      "\\",
      "^",
      "!",
      "(",
      ")",
    ];
    return Array.from({ length }, () => {
      return junkSymbols[rng.nextInt() % junkSymbols.length];
    }).join("");
  }

  const rows = currentGame.currentWords.map((w, i) => {
    const junk = 16 - length;
    const left = (rng.nextInt() % junk) + 1;
    const right = junk - left;
    return (
      <span key={i} className={highlight ? "dark" : ""}>
        {getJunkString(left)}
        <button
          className="word-button"
          disabled={!gameStarted}
          onClick={onWordButtonClicked}
        >
          {w.toUpperCase()}
        </button>
        {getJunkString(right)}
        <br />
      </span>
    );
  }).concat(Array.from({length: 32 - currentGame.currentWords.length}, (_, i) => <span className={highlight ? "dark" : ""} key={"_" + i}>{getJunkString(16)}<br/></span>))

  rng.shuffle(rows);

  return (
    <div className="block line selector">
      {rows}
    </div>
  );
}

export default Selector;
