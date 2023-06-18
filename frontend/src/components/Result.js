import React, { useEffect } from 'react'
import '../styles/Result.css';
import '../styles/App.css'
import { Link } from 'react-router-dom';
import Score from "react-score-indicator";

import ResultTable from './ResultTable';
import { useDispatch, useSelector } from 'react-redux';
import { attempts_Number, earnPoints_Number, flagResult } from '../helper/helper';

/** import actions  */
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';
import { usePublishResult } from '../hooks/setResult';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'



export default function Result() {
    const { width, height } = useWindowSize()
    const dispatch = useDispatch()
    const { questions : { queue ,answers}, result : { result, userId}}  = useSelector(state => state)

    const totalPoints = queue.length * 10; 
    const attempts = attempts_Number(result);
    const earnPoints = earnPoints_Number(result, answers, 10)
    const flag = flagResult(totalPoints, earnPoints)

    function ScoreIndicator({ value, maxValue }) {
        const val = (value / maxValue) * 100;
        const deg = (180 / 100) * val;
        return (
          <div className="indicator">
            <span className="bar" style={{ transform: `rotate(${deg}deg)` }} />
            <span className="result">
              <span>{value}</span>/<span>{maxValue}</span>
            </span>
          </div>
        );
      }

     function renderConfetti(){
        console.log(flag)
        if(flag){
           return <Confetti width={width} height={height}/>
        }
      }
      
    /** store user result */
    usePublishResult({ 
        result, 
        username : userId,
        attempts,
        points: earnPoints,
        achived : flag ? "Passed" : "Failed" });

    function onRestart(){
        dispatch(resetAllAction())
        dispatch(resetResultAction())
    }

  return (
    <div className='questions'>
      {renderConfetti()}
        <h2 className='questions-text flexbox marB30'>Your result</h2>
        <div className='flexbox'>
        <Score
            value={earnPoints}
            maxValue={totalPoints}
            borderWidth={30}
            gap={3}
            maxAngle={260}
            rotation={90}
            colors={[
              "#d12000",
              "#ed8d00",
              "#f1bc00",
              "#84c42b",
              "#53b83a",
              "#3da940",
              "#3da940",
              "#3da940"
            ]}
          />
         </div>
         <div className='flexbox w-100'>
         <ul className='marTB25 w-100'>
            <li>
            <span style={{ color : `${flag ? "#2aff95" : "#ff2a66" }` }} className='bold quiz-result flexbox'>{flag ? "Passed" : "Failed"}</span>
            </li>
         </ul>
         </div>
        <div className="start">
            <Link className='btn' to={'/'} onClick={onRestart}>Restart</Link>
        </div>
    </div>
  )
}
