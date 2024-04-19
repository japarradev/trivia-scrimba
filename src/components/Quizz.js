import React from 'react';
import Question from './Question';
import Answer from './Answer.js';
import {decode} from 'html-entities';

export default function Quizz()
{
    const [questionsQuizz, setQuestionQuizz] = React.useState([]);
    const [endGame, setEndGame] = React.useState(false);
    const [correctAnswer, setCorrectAnswer] = React.useState(0);
    const [numberGames, setNumberGames] = React.useState(0);
    

    React.useEffect(()=>{
        const tempCorrectAnwser = questionsQuizz.filter((item) => item.correct_answer === item.answer).length
        setCorrectAnswer(tempCorrectAnwser);
    },[questionsQuizz])

    React.useEffect(()=>{ 
      
            (async()=>{
    
                const response = await fetch("https://opentdb.com/api.php?amount=5")
                const data = await response.json()
                const questions = await data.results
                const newQuestions =  Array.isArray(questions) &&  questions.map((item, index) =>
                    {
                        let answers = [decode(item.correct_answer), ...decodeArray(item.incorrect_answers)] 
                        answers = item.type === 'boolean' ? ['True', 'False'] : shuffle(answers);
            
                        return(
                            {
                               
                                id:index,
                                ...item,
                                answers,
                                question:(decode(item.question)),
                            }
                        )
            
                    })
                    newQuestions.length > 0 && setQuestionQuizz(newQuestions);
            })();
        
    },[numberGames])

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

      function newGame()
      {
        setNumberGames((prev => prev + 1))
        setEndGame(false);
        setCorrectAnswer(0);
      }
      function decodeArray(array)
      {
        return array.map(item => decode(item))
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
    )
}