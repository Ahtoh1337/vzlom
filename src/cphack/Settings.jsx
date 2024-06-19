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
    <div>
      <label>
        Duration:
        <input
          disabled={gameStarted}
          name="duration"
          type="number"
          min="30"
          max="300"
          step="15"
          value={settings.duration}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Complexity:
        <input
          disabled={gameStarted}
          name="complexity"
          type="number"
          min="2"
          max="10"
          value={settings.complexity}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Columns:
        <input
          disabled={gameStarted}
          name="columns"
          type="number"
          min="5"
          max="10"
          value={settings.columns}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Rows:
        <input
          disabled={gameStarted}
          name="rows"
          type="number"
          min="5"
          max="10"
          value={settings.rows}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Buffer Size:
        <input
          disabled={gameStarted}
          name="buffer"
          type="number"
          min="4"
          max="8"
          value={settings.buffer}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Script Sequences:
        <input
          disabled={gameStarted}
          name="sequences"
          type="number"
          min="1"
          max="3"
          value={settings.sequences}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Max Script Length:
        <input
          disabled={gameStarted}
          name="maxSeqLength"
          type="number"
          min="3"
          max="6"
          step="1"
          value={settings.maxSeqLength}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Script Length Favor:
        <input
          disabled={gameStarted}
          name="lengthFavor"
          type="number"
          min="-2"
          max="2"
          step="1"
          value={settings.lengthFavor}
          onChange={handleChange}
        />
      </label>
      <br />
      <input
        type="button"
        value={gameStarted ? "Stop" : "Start"}
        onClick={onStartButtonClicked}
      />
    </div>
  );
}

export default Settings;
