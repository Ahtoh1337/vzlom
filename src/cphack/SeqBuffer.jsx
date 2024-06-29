import { numTextMap } from "../utils";

function SeqBuffer({gameStarted, currentGame})
{
    return <div className="block">
        <div className="header">buffer</div>
        <div className="content">{currentGame.buffer.map(i => i > -1 ? " " + numTextMap[i] : " []")}</div>
    </div>
}

export default SeqBuffer;