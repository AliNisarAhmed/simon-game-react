import React from 'react'

interface ButtonProps {
  handleClick: any;
  color: any;
}

const Button: React.SFC<ButtonProps> = ({ handleClick, color}) => {
  return (
    <React.Fragment>
      <button
        onClick={handleClick}
        className={`btn btn--${color}`}
        name={color}
      ></button>
    </React.Fragment>
  )
}

export default Button;
