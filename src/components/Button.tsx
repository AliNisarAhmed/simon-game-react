import React from 'react'

import { Power } from '../enums/Power';


interface ButtonProps {
  handleClick: any;
  color: string;
  activeButton: string,
  power: Power;
}

class Button extends React.Component<ButtonProps> {

  onButtonClick = () => {
    this.props.handleClick(this.props.color);
  }

  render () {
    const { handleClick, color, activeButton, power } = this.props;
    return (
      <React.Fragment>
        <button
          disabled={(power === Power.Off)}
          onClick={this.onButtonClick}
          className={`btn btn--${color} ${activeButton === color ? 'active': ''}`}
          name={color}
        ></button>
      </React.Fragment>
    );
  }
}

export default Button;
