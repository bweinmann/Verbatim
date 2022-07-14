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

  const [words, setWords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://random-words5.p.rapidapi.com/getRandom', options);
      const random = await res.text();
      setWords(random)
    }
    fetchData()
  }, []);

  return (
    <div className="App">
      {words}
    </div>
  );
}

export default App;
