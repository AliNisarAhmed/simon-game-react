import React from 'react'
import classNames from 'classnames';
import formatCount from '../helperFunctions/formatCount';

import { GameState } from '../enums/gameState';


export default function Center({ startGame, changePower, power, count, gameState }) {
  
  function handleStartGame () {
    if (power && gameState === GameState.AwaitingGameStart) {
      startGame();
    }
  }

  const sliderClass = classNames({
    onOff__slider: true,
    left: power !== 1,
    right: power === 1
  })

  return (
    <div className="center">
      <h2 className="center__heading">Simon</h2>
      <div className="controls">
        <div className="controls__screen">
          <span>
            {
              power === 0 ? "" : (
                count === 0 ? "- -" : formatCount(count)
              )
            }
          </span>
        </div>
        <div className="controls__start">
          <button onClick={handleStartGame}  className="controls__btn"></button>
          <span className="controls__label">Start</span>
        </div>
      </div>
      <div className="onOff">
        <span className="onOff__label">Off</span>
        <div className="onOff__box">
          <div onClick={changePower} className={sliderClass}></div>
        </div>
        <span className="onOff__label">On</span>
      </div>
    </div>
  )
}
