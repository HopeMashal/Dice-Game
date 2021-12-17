import React from 'react';
import Song from './audio/song.mp3'

class Audio extends React.Component {
  state={count:0,audiotext:'Play Audio'};
  playAudio=()=> {
    const audioEl = document.getElementsByClassName("audio-element")[0]
    if(this.state.count%2===0){
      audioEl.play();
      this.setState({audiotext:'Pause Audio'});
    }
    else{
      audioEl.pause();
      this.setState({audiotext:'Play Audio'});
    }
    this.setState({count: this.state.count+1})
  }

  render() {
    return (
      <div>
        <button onClick={this.playAudio}>
          <span><ion-icon name="play-circle-outline"></ion-icon>{this.state.audiotext}</span>
        </button>
        <audio className="audio-element">
          <source src={Song}></source>
        </audio>
      </div>
    )
  }
}

export default Audio;