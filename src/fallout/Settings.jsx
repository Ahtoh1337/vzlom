function Settings({ settings, gameStarted, onChange, onStartButtonClicked }) {
  function handleChange(event) {
    let newSettings = { ...settings };
    newSettings[event.target.name] =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    onChange(newSettings);
  }

  return (
    <div className="block line">
      <label>
        Duration:
        <input
          disabled={gameStarted}
          name="duration"
          type="range"
          min="60"
          max="300"
          step="60"
          value={settings.duration}
          onChange={handleChange}
        />
        {Math.floor(settings.duration / 60)}m
      </label>
      <br />
      <label>
        Attempts:
        <input
          disabled={gameStarted}
          name="attempts"
          type="range"
          min="4"
          max="8"
          value={settings.attempts}
          onChange={handleChange}
        />
        {settings.attempts}
      </label>
      <br />
      <label>
        Length:
        <input
          disabled={gameStarted}
          name="length"
          type="range"
          min="5"
          max="9"
          step="2"
          value={settings.length}
          onChange={handleChange}
        />
        {settings.length}
      </label>
      <br />
      <label>
        Number of Words:
        <input
          disabled={gameStarted}
          name="numOfWords"
          type="range"
          min="5"
          max="15"
          value={settings.numOfWords}
          onChange={handleChange}
        />
        {settings.numOfWords}
      </label>
      <br />
      <label>
        Highlight:{" "}
        <input
          disabled={gameStarted}
          name="highlight"
          type="checkbox"
          checked={settings.highlight}
          onChange={handleChange}
        />
      </label>
      <br />
      <input
        type="button"
        value={gameStarted ? "x Stop x" : "- Start -"}
        onClick={onStartButtonClicked}
      />
    </div>
  );
}

export default Settings;
