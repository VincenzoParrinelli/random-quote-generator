import React, {useState, useEffect} from "react";
import './App.scss';
import colorArray from "./colorsArr";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTwitter} from "@fortawesome/free-brands-svg-icons";

let url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'


function App() {

  const [currentQuote, setcurrentQuote] = useState("Start");
  const [author, setAuthor] = useState("Start");
  const [randomColor, setRandomColor] = useState("#282c34");

  useEffect(() => {
    getQuote()
  }, []);

  const getQuote = () => {
    fetch(url)
    .then(res => res.json())
    .then(data => {
      let dataQuotes = data.quotes;
      let randomIndex = Math.floor(dataQuotes.length * Math.random())
      let randomQuote = dataQuotes[randomIndex]
      setcurrentQuote(randomQuote.quote);
      setRandomColor(colorArray[randomIndex]);
      setAuthor(randomQuote.author);
      console.log(currentQuote);
    })

  }

  const handleClick = () => {
    getQuote()
  }


  return (
    
    <div className="App">
      <header className="App-header" style={{backgroundColor: randomColor}}>
        <div id="quote-box" style={{color: randomColor}}>
        <p id="text">{currentQuote}</p>
        <p id="author">- {author}</p>

        <div className="tweetBtn">
        <a id="tweet-quote" style={{backgroundColor: randomColor}} href={encodeURI(`http://www.twitter.com/intent/tweet?text=${currentQuote} -${author}`)}><FontAwesomeIcon icon={faTwitter}/></a>ra
        <button id="new-quote" style={{backgroundColor: randomColor}} onClick={handleClick}>GenerateQuote</button>
        </div>
        </div>
      </header>
    </div>
  );
}

export default App;
