import React, { useState } from 'react';
import CpHackGame from './cphack/CpHackGame'
import FalloutGame from './fallout/FalloutGame';

function App() {
  const [selectedGame, setSelectedGame] = useState(0);
  const options = [
    {name: "Cyberpunk 2077", component: CpHackGame},
    {name: "Fallout 3/NV/4", component: FalloutGame}
  ]
  return <>
    <div className='game-list'>
      {options.map((opt, i) => <button key={i} onClick={() => setSelectedGame(i)}>{opt.name}</button>)}
      <button onClick={() => window.location.href = "https://tangerine-salamander-c4c622.netlify.app/"}>Substitution</button>
    </div>
    <div className='game-container'>
      {React.createElement(options[selectedGame].component)}
    </div>
  </>
}

export default App;
