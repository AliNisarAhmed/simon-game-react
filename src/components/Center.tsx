import React from 'react'
import classNames from 'classnames';

export default function Center({ runSequence, changeGameState, gameState, count }) {
  
  const sliderClass = classNames({
    onOff__slider: true,
    left: gameState !== 1,
    right: gameState === 1
  })

  return (
    <div className="center">
      <h2 className="center__heading">Simon</h2>
      <div className="controls">
        <div className="controls__screen"><span>{count === 0 ? "- -" : count}</span></div>
        <div className="controls__start">
          <button onClick={() => runSequence()}  className="controls__btn"></button>
          <span className="controls__label">Start</span>
        </div>
      </div>
      <div className="onOff">
        <span className="onOff__label">Off</span>
        <div className="onOff__box">
          <div onClick={changeGameState} className={sliderClass}></div>
        </div>
        <span className="onOff__label">On</span>
      </div>
    </div>
  )
}
