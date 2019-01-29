import React from 'react'
import classNames from 'classnames';
import formatCount from '../helperFunctions/formatCount';


export default function Center({ startGame, changePower, power, count, gameState, toggleStrict, strict }) {
  
  function handleStartGame () {
    if (power && gameState === "AwaitingGameStart") {
      startGame();
    }
  }

  function handleToggleStrict () {
    if (power && gameState === "AwaitingGameStart") {
      toggleStrict();
    }
  }

  const sliderClass = classNames({
    onOff__slider: true,
    left: power !== "Off",
    right: power === "On"
  });

  const indicatorClass = classNames({
    controls__indicator: true,
    on: strict,
  })

  return (
    <div className="center">
      <h2 className="center__heading">Simon</h2>
      <div className="controls">
        <div className="controls__screen">
          <span>
            {
              power === "Off" ? "" : (
                formatCount(count, gameState)
              )
            }
          </span>
        </div>
        <div className="controls__start">
          <div className={indicatorClass}></div>
          <button onClick={handleStartGame} className="controls__btn"></button>
          <button onClick={handleToggleStrict} className="controls__btn controls__btn--strict"></button>
          <span className="controls__label">Start</span>
          <span className="controls__label controls__label--strict">Strict</span>
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
