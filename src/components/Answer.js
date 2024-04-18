import React from "react";

export default function Answer(props)
{

    return(
        <div className="question">
            <h2 className="title-question">{props.question}</h2>
            <div className="answers">
                {props.answers.map((item, index) => {

                    let style = {}
                    if(item === props.correct_answer)
                    {
                        style = 
                        {
                            backgroundColor: '#94D7A2',
                            color: '#293264',                            border: 'none'
                        }
                    }
                    else if(item === props.answer)
                    {
                        style = 
                        {
                            backgroundColor: '#F8BCBC',

                            border: 'none'
                        }
                    }
                    return(
                        <div className="button-answer-check" key={index}>
                            <label style={style}>{item}</label>
                        </div>
                    )
                })}
            </div>  
        </div>
    )
} 