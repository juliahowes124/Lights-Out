import React, {useState} from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  const [dimensions, setDimensions] = useState({rows: "", cols: ""});
  const [inGame, setInGame] = useState(false);

  function handleChange(evt) {
    const {name, value} = evt.target;
    setDimensions(d => ({...d, [name]: value}));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setInGame(true);
  }

  function handleReset() {
    setInGame(false);
    setDimensions({rows: "", cols: ""});
  }

  return (
      <div className="App">
        <h1>Lights Out!</h1>
        <button onClick={handleReset}>Reset</button>
        {inGame ? (
          <Board nrows={dimensions.rows} ncols={dimensions.cols}/>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="rows"># Rows</label>
            <input name="rows" value={dimensions.rows} onChange={handleChange}/>
            <label htmlFor="cols"># Columns</label>
            <input name="cols" value={dimensions.cols} onChange={handleChange}/>
            <button>Go!</button>
          </form>
        )}
      </div>
  );
}

export default App;
