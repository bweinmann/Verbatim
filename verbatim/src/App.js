import './App.css';
import { useEffect, useState } from 'react';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'b1583183e4mshbac800953b86b23p16f609jsn7913d01b1356',
    'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
  }
};

function App() {

  const [words, setWords] = useState('hello');
  const [inputs, setInputs] = useState(Array(6).fill(null))
  const [currentInput, setCurrentInput] = useState('')
  const [end, setEnd] = useState(false)

  useEffect(() => {
    const handleInput = (e) => {
      if (end) return;
      //to handle user submission
      if(e.key === 'Enter') {
        if (currentInput.length !== 5) return;

        const newInput = [...inputs];
        newInput[inputs.findIndex(item => item == null)] = currentInput;
        setInputs(newInput);
        setCurrentInput('')

        const correctAnswer = words === currentInput;
        if (correctAnswer) setEnd(true);
      }

      if (e.key === 'Backspace') {
        setCurrentInput(currentInput.slice(0, -1));
        return;
      }

      if (currentInput.length >= 5) return;
      //will handle other non-alpha inputs later
      //may modify currentinput with a function, could be affected by the dependency array
      setCurrentInput(currentInput + e.key)
    };

    window.addEventListener('keydown', handleInput);
    return () => window.removeEventListener('keydown', handleInput);
  }, [currentInput, end, words]);


  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://random-words5.p.rapidapi.com/getRandom?wordLength=5', options);
      const random = await res.text();
      // setWords(random)
    }
    fetchData()
  }, []);

  return (
    <div className="App">
       <div className = "header">
        <h1>VERBATIM</h1>
       </div>
      <div className = "inputGrid">
        {inputs.map((input, i) => {
          //check if the index we are on is the correct one, ex. if box1 is null then we are on the first box
          const inputChecker = i === inputs.findIndex(val => val == null);
          return (
            <Row 
            input = {inputChecker ? currentInput : (input || '')}
            submission={!inputChecker && input != null}
            words = {words}
            />
          )
        })}
    </div>
  </div>
  );
}

const Row = ({words, input, submission}) => {
  const boxes = [];

  //for loop is used instead of map because input could be null (empty string as the input)
  for (let i = 0; i < 5; i++) {
    const char = input[i];
    //if the user input is Enter
    let className = 'box';
    
    if(submission) {
      if (char === words[i]) {
        className += ' right'
      } else if (words.includes(char)) {
        className += ' partial';
      } else {
        className += ' wrong';
      }
    }

    boxes.push(
    <div key={i} 
    className={className}>
      {char}
      </div>
      )
  }

  return <div className = "row">
    {boxes}
  </div>
}

export default App;
