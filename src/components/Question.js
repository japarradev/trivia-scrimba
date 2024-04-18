import React from "react";
import { nanoid } from 'nanoid';

export default function Question(props)
{
   
    return(
        <div className="question">
            <h2 className="title-question">{props.question}</h2>
            <div className="answers">
                {props.answers.map((item, index) => {
                    const id = nanoid()
                    return(
                    <div className="button-answer" key={index}>
                        <input type="radio" id={id} name={props.id} onClick={()=> props.handlerChangeAnswer(props.id, item)}/>
                        <label  htmlFor={id}>{item}</label>
                    </div>
                    )
                })}
            </div>  
        </div>
    )
} 