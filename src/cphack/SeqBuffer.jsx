import { numTextMap } from "./common";

function SeqBuffer({gameStarted, currentGame})
{
    return <div>
        Buffer: {currentGame.buffer.map(i => i > -1 ? " " + numTextMap[i] : " []")}
    </div>
}

export default SeqBuffer;