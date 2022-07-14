import './App.css';
import { useEffect, useState } from 'react';

// const options = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': 'b1583183e4mshbac800953b86b23p16f609jsn7913d01b1356',
//     'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
//   }
// };

const inputLength = 5;

function App() {

  // const [words, setWords] = useState([]);
  const [inputs, setInput] = useState(Array(6).fill(null))

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch('https://random-words5.p.rapidapi.com/getRandom', options);
  //     const random = await res.text();
  //     setWords(random)
  //   }
  //   fetchData()
  // }, []);

  return (
    <div className="App">

       <div className = "header">
        <h1>Verbatim</h1>
       </div>
      {
        inputs.map(input => {
          return (
            <Row input = {input || ''}/>
          )
        })
      }
    </div>
  );
}

const Row = ({input}) => {
  const boxes = [];

  //for loop is used instead of map because input could be null (empty string as the input)
  for (let i = 0; i < inputLength; i++) {
    const char = input[i];
    boxes.push(<div className="box">{char}</div>)
  }

  return <div className = "row">
    {boxes}
  </div>
}

export default App;
