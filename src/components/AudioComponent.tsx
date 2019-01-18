import React, { PureComponent } from 'react'
import audioSources from '../audioSources/audioSources';

interface AudioProps {
  audioToPlay: string;
}

export default class AudioComponent extends PureComponent<AudioProps>{  // using pure component so that the AudioCOmponent does not udpate every time the parent component, App, is updated.
  sounds: any;
  constructor(props) {
    super(props);
    this.sounds = {};
  }

  componentDidUpdate() {
    console.log('audio component updated');
    if (this.props.audioToPlay) {
      this.sounds[this.props.audioToPlay].play();
    }
  }
  
  render() {
    return (
      <React.Fragment>
        <audio src={audioSources['red']} ref={el => this.sounds.red = el}></audio>
        <audio src={audioSources['green']} ref={el => this.sounds.green = el}></audio>
        <audio src={audioSources['blue']} ref={el => this.sounds.blue = el}></audio>
        <audio src={audioSources['yellow']} ref={el => this.sounds.yellow = el}></audio>
      </React.Fragment>
    )
  }
}
