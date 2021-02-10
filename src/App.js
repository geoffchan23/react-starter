import { useState } from 'react';
import './App.css';

function App() {
  const [inputVal, setInputVal] = useState("");
  const [list, setList] = useState([]);

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  }

  const handleButtonClick = () => {
    const newList = list;
    newList.push(inputVal);
    setList(newList);
    setInputVal("");
  }

  return (
    <div className="App">
      <div style={{
        display: "flex",
        flexDirection: "row"
      }}>
        <input value={inputVal} onChange={handleInputChange} />
        <button onClick={handleButtonClick}>ADD</button>
      </div>
      <ul>
        { list.map((item, index) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
