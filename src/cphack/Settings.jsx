function Settings({ settings, onChange, gameStarted, onStartButtonClicked }) {
  function handleChange(event) {
    let newSettings = { ...settings };
    newSettings[event.target.name] =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    onChange(newSettings);
  }

  return (
    <div className="block content">
      <label>
        duration:
        <input
          disabled={gameStarted}
          name="duration"
          type="range"
          min="30"
          max="300"
          step="15"
          value={settings.duration}
          onChange={handleChange}
        />
        {Math.floor(settings.duration / 60)}m {settings.duration % 60}s
      </label>
      <br />
      <label>
        complexity:
        <input
          disabled={gameStarted}
          name="complexity"
          type="range"
          min="2"
          max="10"
          value={settings.complexity}
          onChange={handleChange}
        />
        {settings.complexity}
      </label>
      <br />
      <label>
        columns:
        <input
          disabled={gameStarted}
          name="columns"
          type="range"
          min="5"
          max="8"
          value={settings.columns}
          onChange={handleChange}
        />
        {settings.columns}
      </label>
      <br />
      <label>
        rows:
        <input
          disabled={gameStarted}
          name="rows"
          type="range"
          min="5"
          max="8"
          value={settings.rows}
          onChange={handleChange}
        />
        {settings.rows}
      </label>
      <br />
      <label>
        buffer size:
        <input
          disabled={gameStarted}
          name="buffer"
          type="range"
          min="4"
          max="8"
          value={settings.buffer}
          onChange={handleChange}
        />
        {settings.buffer}
      </label>
      <br />
      <label>
        script sequences:
        <input
          disabled={gameStarted}
          name="sequences"
          type="range"
          min="1"
          max="3"
          value={settings.sequences}
          onChange={handleChange}
        />
        {settings.sequences}
      </label>
      <br />
      <label>
        max script length:
        <input
          disabled={gameStarted}
          name="maxSeqLength"
          type="range"
          min="3"
          max="6"
          step="1"
          value={settings.maxSeqLength}
          onChange={handleChange}
        />
        {settings.maxSeqLength}
      </label>
      <br />
      <label>
        script length favor:
        <input
          disabled={gameStarted}
          name="lengthFavor"
          type="range"
          min="-2"
          max="2"
          step="1"
          value={settings.lengthFavor}
          onChange={handleChange}
        />
        {settings.lengthFavor}
      </label>
      <br />
      <input
        type="button"
        value={gameStarted ? "stop" : "start"}
        onClick={onStartButtonClicked}
      />
    </div>
  );
}

export default Settings;
