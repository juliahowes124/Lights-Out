import React, {useState} from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  const initialState = {rows: "4", cols: "4"};
  const [dimensions, setDimensions] = useState(initialState);
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
    setDimensions(initialState);
  }

  return (
      <div className="App">
        <h1>Lights Out!</h1>
        {inGame ? (
          <>
          <button onClick={handleReset}>Reset</button>
          <Board nrows={dimensions.rows} ncols={dimensions.cols} chanceLightStartsOn={.7}/>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-input">
              <label htmlFor="rows">Number of Rows</label>
              <input required id="rows" name="rows" value={dimensions.rows} onChange={handleChange} autoFocus={true}/>
            </div>
            <div className="form-input">
              <label htmlFor="cols">Number of Columns</label>
              <input required id="cols" name="cols" value={dimensions.cols} onChange={handleChange}/>
            </div>
              <div>
                <button>Start</button>
              </div>
          </form>
        )}
        
      </div>
  );
}

export default App;
