import Quizz from './components/Quizz';
import './style.css';
import React  from 'react';

function App() {

  const [newGame, setNewGame] = React.useState(false)

  function createNewGame()
  {
    setNewGame(true)
  }

  const welcome = 
  <div className='welcome-sreen'> 
      <h1>Quizzical</h1>
      <h2>Some description if needed</h2>
      <button className='button-main' onClick={createNewGame}>Start quiz</button>
  </div> 

  return (<main>{!newGame ? welcome : <Quizz/>}</main>
    )
}

export default App;
