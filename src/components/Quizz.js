import React from 'react';
import Question from './Question';
import questions from '../questions.js'
import Answer from './Answer.js';


export default function Quizz()
{
    const [questionsQuizz, setQuestionQuizz] = React.useState([]);
    const [endGame, setEndGame] = React.useState(false);
    const [correctAnswer, setCorrectAnswer] = React.useState(0);

    React.useEffect(()=>{
        const tempCorrectAnwser = questionsQuizz.filter((item) => item.correct_answer === item.answer).length
        setCorrectAnswer(tempCorrectAnwser);
    },[questionsQuizz])

    
    function handlerChangeAnswer(questionId, answer)
    {
        setQuestionQuizz((prevQuestionQuizz) =>
        {
            return prevQuestionQuizz.map((item=>{
                if(item.id === questionId)
                {
                    return {...item, answer:answer}
                }
                else
                {
                    return item
                }
            }))
        })
    }  
    function checkAnswers()
    {
        setEndGame(true);
    }
    const welcome = 
            <div className='welcome-sreen'> 
                <h1>Quizzical</h1>
                <h2>Some description if needed</h2>
                <button className='button-main' onClick={newGame}>Start quiz</button>
            </div> 


    const game = 
    <div className='game'>
        {questionsQuizz.map((item, index)=>{
            return !endGame 
            ? <Question key={index} question={item.question} answers={[...item.answers]} id={item.id} type ={item.type} handlerChangeAnswer={handlerChangeAnswer} />
            : <Answer key={index} question={item.question} answers={[...item.answers]} id={item.id} type ={item.type} answer={item.answer} correct_answer={item.correct_answer}/>
        })}
       
        {   !endGame ?
            <button className ="btn-default" onClick={checkAnswers}>  Check answers</button> : 
            <div className='section-check-answer'><span>{`You scored ${correctAnswer}/5 correct answers`}</span><button className ="btn-default" onClick={newGame}>Play again</button></div> 
            }
    </div>


      function newGame()
      {
        setEndGame(false);
        setCorrectAnswer(0);
        const newQuestions = questions.map(item =>
        {
            let answers = [item.correct_answer, ...item.incorrect_answers] 
            answers = item.type === 'boolean' ? ['True', 'False'] : shuffle(answers);

            return(
                {
                    ...item,
                    answers
                }
            )

        })
        setQuestionQuizz(newQuestions);
      }

      function shuffle(array) {
        let currentIndex = array.length;
        const tempArray = array
        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
      
          // Pick a remaining element...
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [tempArray[currentIndex], tempArray[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return tempArray
      }

    return(
        <main>
            {/* <img className='image-background1' alt ='imagen de fondo' src='/images/blobs1.png'/> */}
            {questionsQuizz.length === 0 ? welcome : game}
            {/* <img className='image-background2' alt ='imagen de fondo' src='/images/blobs2.png'/> */}
        </main>
    )
}