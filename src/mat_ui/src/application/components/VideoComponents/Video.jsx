import React from "react"
import '../../styles/Video.css'
import 'react-player'
import ReactPlayer from "react-player"
import '../../styles/Video.css'

export const fmtMSS = (s) => { return(s-(s%=60))/60+(9<s?':':':0')+s }

function isInProgress (ts) {
  console.log('val is: ', ts)
  const d = Date.parse('01/01/2011 10:20:45')
  if (ts < '4:03') { return false}
  else if ( (Date.parse('01/01/2011 10:20:45') > Date.parse('01/01/2011 10:20:45'+' 4:03:00')) && (ts <= '22:45')) {return true} // pause
  else if ( (ts > '22:45') && (ts <= '23:13')) {return false} // post pasue
  else if ( (ts > fmtMSS('23:13')) && (fmtMSS(ts) <= fmtMSS('37:59'))) {return true} // post pasue
  else if (fmtMSS(ts) > '37:59') {return false}
  else {return true}
}
export default class Video extends React.Component {
  state = {
    url: 'https://www.youtube.com/watch?v=bXFTmt-Pb2M?', // https://www.youtube.com/watch?v=bXFTmt-Pb2M?start=257
    pip: false,
    playing: true,
    controls: true,
    light: false,
    volume: 0.1,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    elapsed: 0
  }

  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false
    })
  }

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  handleStop = () => {
    this.setState({ url: null, playing: false })
  }

  handleToggleControls = () => {
    const url = this.state.url
    this.setState({
      controls: !this.state.controls,
      url: null
    }, () => this.load(url))
  }

  handleToggleLight = () => {
    this.setState({ light: !this.state.light })
  }

  handleToggleLoop = () => {
    this.setState({ loop: !this.state.loop })
  }

  handleVolumeChange = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }

  handleToggleMuted = () => {
    this.setState({ muted: !this.state.muted })
  }

  handleSetPlaybackRate = e => {
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }

  handleTogglePIP = () => {
    this.setState({ pip: !this.state.pip })
  }

  handlePlay = () => {
    console.log('onPlay')
    this.setState({ playing: true })
  }

  handleEnablePIP = () => {
    console.log('onEnablePIP')
    this.setState({ pip: true })
  }

  handleDisablePIP = () => {
    console.log('onDisablePIP')
    this.setState({ pip: false })
  }

  handlePause = () => {
    console.log('onPause')
    this.setState({ playing: false })
  }

  handleSeekMouseDown = e => {
    this.setState({ seeking: true })
  }

  handleSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }

  handleSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }

  handleProgress = state => {
    console.log('onProgress', state)
    this.setState(() => ( { elapsed: state.playedSeconds }))
    this.props.setTime(parseFloat(state.playedSeconds))
    console.log('el: ', fmtMSS(this.state.elapsed))

    if (this.state.playing){
      // fetch('http://localhost:5000/time' , {
      //   method: 'POST',
      //   headers: {
      //     'Accept': 'text/plain',
      //     'Content-Type': 'text/plain'
      //   },
      //   body: fmtMSS(this.state.elapsed)
      // }).then(function(response) {
      //   return response.json();
      // }).then(response => {
      //   this.setState({ time: response });
      //   console.log('we are calculting time to be...', this.state.time)
      // });
      console.log('we are calculting time to be...', parseFloat(state.playedSeconds))
      console.log('in_progress?', isInProgress(fmtMSS(this.state.elapsed)))
    }

    // console.log('elapsed = ', fmtMSS(state.playedSeconds))
    // console.log('elapsed: ', fmtMSS(this.state.elapsed))
    // We only want to update time slider if we are not currently seeking
    // this.state.elapsed = state.played * this.state.duration
    if (!this.state.seeking) {
      // const duration = this.state.duration;  const played = state.played;
      // const el = played * duration;
      // const elapsed = { ...this.state.elapsed, el }
      this.setState(state)
    }
  }

  handleEnded = () => {
    console.log('onEnded')
    this.setState({ playing: this.state.loop })
  }

  handleDuration = (duration) => {
    console.log('onDuration', duration)
    this.setState({ duration })
  }

  handleClickFullscreen = () => {
    screenfull.request(findDOMNode(this.player))
  }

  getDuration = () => {
    return this.state.duration*this.state.played
  }

  render() {
    return (
      <div id = "video">
       <ReactPlayer
          ref={this.ref}
          className='react-player'
          width='100%'
          height='100%'
          url={this.state.url}
          pip={this.state.pip}
          playing={this.state.playing}
          controls={true}
          light={this.state.light}
          loop={this.state.loop}
          playbackRate={this.state.playbackRate}
          volume={this.state.volume}
          muted={this.state.muted}
          onReady={() => console.log('onReady')}
          onStart={() => console.log('onStart')}
          onPlay={this.handlePlay}
          onEnablePIP={this.handleEnablePIP}
          onDisablePIP={this.handleDisablePIP}
          onPause={this.handlePause}
          onBuffer={() => console.log('onBuffer')}
          onSeek={e => console.log('onSeek', e)}
          onEnded={this.handleEnded}
          onError={e => console.log('onError', e)}
          onProgress={this.handleProgress}
          onDuration={this.handleDuration}
       />
      </div>
    )
  }
}

/* ex iframe vid
<iframe width="560" height="315" src="https://www.youtube.com/embed/bXFTmt-Pb2M?start=257" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

*/