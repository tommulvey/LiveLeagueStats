import React, { useEffect, useState } from "react"
import '../../styles/Video.css'
import FaceIcon from '@material-ui/icons/Face';
import MonetizationOn from '@material-ui/icons/MonetizationOn'
import { ReactComponent as top } from '../logos/top.svg';
import { ReactComponent as jg } from '../logos/jg.svg';
import { ReactComponent as mid } from '../logos/mid.svg';
import { ReactComponent as bot } from '../logos/bot.svg';
import { ReactComponent as sup } from '../logos/sup.svg';
// import { purple500, purple600, purple700, 
//   purple800, purple900} from '@material-ui/core/colors'
// https://ddragon.leagueoflegends.com/cdn/10.19.1/img/champion/Annie.png
// what does url look like with space in champ name????
// ans: https://ddragon.leagueoflegends.com/cdn/10.19.1/img/champion/TwistedFate.png
// 

const icons = {
  5: "https://am-a.akamaihd.net/image/?resize=375:&f=https%3A%2F%2Flolstatic-a.akamaihd.net%2Fesports-assets%2Fproduction%2Fplayer%2Fbroken-blade-jal9l7d2.png",
  6: "https://am-a.akamaihd.net/image/?resize=375:&f=https%3A%2F%2Flolstatic-a.akamaihd.net%2Fesports-assets%2Fproduction%2Fplayer%2Fspica-899o1j6u.png",
  7: "https://am-a.akamaihd.net/image/?resize=375:&f=https%3A%2F%2Flolstatic-a.akamaihd.net%2Fesports-assets%2Fproduction%2Fplayer%2Fbjergsen-d8v00kci.png",
  8: "https://am-a.akamaihd.net/image/?resize=375:&f=https%3A%2F%2Flolstatic-a.akamaihd.net%2Fesports-assets%2Fproduction%2Fplayer%2Fdoublelift-3d0pxw6l.png",
  9: "https://am-a.akamaihd.net/image/?resize=375:&f=https%3A%2F%2Flolstatic-a.akamaihd.net%2Fesports-assets%2Fproduction%2Fplayer%2Fbiofrost-6h6ohg2m.png",
  0: "https://am-a.akamaihd.net/image/?resize=375:&f=http%3A%2F%2Fstatic.lolesports.com%2Fplayers%2F1591816633576_fly-solo.png",
  1: "https://am-a.akamaihd.net/image/?resize=375:&f=http%3A%2F%2Fstatic.lolesports.com%2Fplayers%2F1591816627101_fly-santorin.png",
  2: "https://am-a.akamaihd.net/image/?resize=375:&f=http%3A%2F%2Fstatic.lolesports.com%2Fplayers%2F1591816615416_fly-powerofevil.png",
  3: "https://am-a.akamaihd.net/image/?resize=375:&f=http%3A%2F%2Fstatic.lolesports.com%2Fplayers%2F1591816644418_fly-wildturtle.png",
  4: "https://am-a.akamaihd.net/image/?resize=375:&f=http%3A%2F%2Fstatic.lolesports.com%2Fplayers%2F1591816604180_fly-ignar.png"
}

const P1 = [ // players from team 1 (blu)
  { name: 'Solo', pos:'top' ,second:'Brkoen Blade',kda:1.1,secondKda:1.2},
  { name: 'Santorin', pos:'jg' ,second:'Spica',kda:1.2,secondKda:1.1},
  { name: 'PowerOfEvil', pos:'mid',second:'Bjergsen',kda:1.1,secondKda:1.2},
  { name: 'WildTurtle', pos:'bot' ,second:'Doublelift',kda:1.1,secondKda:1.2},
  { name: 'Ignar', pos:'sup',second:'BinFrost' ,kda:1.2}
]

const P2 = { // players from team 2 (red/purpl)
  'top': {},
  'jg': {},
  'mid': {},
  'bot': {},
  'sup': {}
}

const ROWS = [ 
  [P1['top'], P2['top']], 
  [P1['jg'],  P2['jg']], 
  [P1['mid'], P2['mid']], 
  [P1['bot'], P2['bot']], 
  [P1['sup'], P2['sup']], 
];

const getTime = (time) => {
  return (time).toFixed()-243+""
}

// const getMatchMetadata = (id, setPlayerInfo) => {
  
// }

export const PlayerRows = ({ gameId, time} ) => {
  const id = '104174992730350841';
  const [ data, setData ] = useState({})
  const [ playerInfo, setPlayerInfo ] = useState({})
  const [ playerPics, setPlayerPics ] = useState([])

  console.log('time is...', time)
  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch('http://127.0.0.1:5000/prettyPlayerStats/'+id+'/'+getTime(time))
      .then(async response => {
        const res = await response.json();
        // check for error response
        if (!response) {
            // get error message from body or default to response statusText
            console.error('errrrr')
        }
        // console.log('res is ', response)
        console.log('yooo', res)
        setData(res)
      })
      .catch(error => {
          this.setState({ errorMessage: error.toString() });
          console.error('There was an error!', error);
      });
      // 37:57 end
      // 32:10 ded
      // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [time]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/matchMetadata/'+id)
      .then(async response => {
        const res = await response.json();
        // check for error response
        if (!response) {
            // get error message from body or default to response statusText
            console.error('errrrr')
        }
        // console.log('res is ', response)
        console.log('metadata is ', res)
        setPlayerInfo(res)
      })
      .catch(error => {
          this.setState({ errorMessage: error.toString() });
          console.error('There was an error!', error);
      });
      
      // get player pics and map to the data o names
      
      // fetch('http://127.0.0.1:5000/idToIcon/'+id)
      // .then(async response => {
      //   const res = await response.json();
      //   // check for error response
      //   if (!response) {
      //       // get error message from body or default to response statusText
      //       console.error('errrrr')
      //   }
      //   // console.log('res is ', response)
      //   console.log('metadata is ', res)
      //   setPlayerInfo(res)
      // })
      // .catch(error => {
      //     this.setState({ errorMessage: error.toString() });
      //     console.error('There was an error!', error);
      // });

  }, [])

  // we got 10 players, 5 rows
  console.log('data is....', data)
  console.log(data[9])
  console.log(data[9])
  return (
    <div className="rows">

      <div className="top basePlayer" style={{width: "37.5vw"}}>
        <div className="playerLeft">
          <img 
            src={icons[0]}
            width={"25%"}
            height={"25%"}
            alt="Top T1"
            id="leftImg"
          />
          <MonetizationOn colorPrimary="#FFD700" size="1.5em"/>
          { data[0] ? data[0].gold : '--' }
          <img src="./../icons/kda.svg" alt="kda logo" />
          { data[0] ? data[0].kda : '--'}
        </div>
        <div className="playerRight">
          { data[5] ? data[5].kda : '--'}
          <img src="./../icons/kda.svg" alt="kda logo" />
          { data[5] ? data[5].gold : '--' }
          <MonetizationOn colorPrimary="#FFD700" size="1.5em"/>
          <img 
            src={icons[5]}
            width={"25%"}
            height={"25%"}
            alt="Top T2"
            id="rightImg"
          />
        </div>
      </div>

      <div className="jg basePlayer" style={{width: "37.5vw"}}>
        <div className="playerLeft">
         <p> { data[1] ? data[1].gold : '--' } { data[1] ? data[1].kda : '--'} </p>
        </div>
        <div className="playerRight">
          <p> { data[6] ? data[6].gold : '--' } { data[6] ? data[6].kda : '--'} </p>
        </div>
      </div>

      <div className="mid basePlayer" style={{width: "37.5vw"}}>
        <div className="playerLeft">
          <p> { data[2] ? data[2].gold : '--' } { data[2] ? data[2].kda : '--'} </p>
        </div>
        <div className="playerRight">
          <p> { data[7] ? data[7].gold : '--' } { data[7] ? data[7].kda : '--'} </p>
        </div>
      </div>

      <div className="bot basePlayer" style={{width: "37.5vw"}}>
        <div className="playerLeft">
          <p> { data[3] ? data[3].gold : '--' } { data[3] ? data[3].kda : '--'} </p>
        </div>
        <div className="playerRight">
         <p> { data[8] ? data[8].gold : '--' } { data[8] ? data[8].kda : '--'} </p>
        </div>
      </div>

      <div className="sup basePlayer" style={{width: "37.5vw"}}>
        <div className="playerLeft">
          <p> { data[4] ? data[4].gold : '--' } { data[4] ? data[4].kda : '--'} </p>
        </div>
        <div className="playerRight">
          <p> { data[9] ? data[9].gold : '--' } { data[9] ? data[9].kda : '--'} </p>
        </div>
      </div>
      {
        //   <div class="rows">
        //     <div class={stats.pos}> <FaceIcon className="playerIcons" /> </div>
        //     <span style={{marginLeft:100+'px',color:'#eeb80f'}}>{stats.kda}k</span>
        //     <span style={{marginLeft:50+'px',color:'#03DAC6'}}>kda</span>
        //     <span style={{marginLeft:50+'px',color:'#03DAC6'}}>kda</span>
        // <span style={{marginLeft:50+'px',color:'#eeb80f'}}>{stats.secondKda}k</span>
        //     <div style={{marginLeft:400+'px',marginTop:-45+'px',color:'#c158dc'}} > <FaceIcon className="playerIcons" /> </div>
        //     <div class="playername"> 
        //         <p> {stats.name} </p>
        //     </div>
        //     <div style={{marginLeft:390+'px',marginTop:-15+'px'}} class="playername"> 
        //         <p> {stats.second} </p>
        //     </div>

        //   </div>
        
      }
    </div>
  )

}
