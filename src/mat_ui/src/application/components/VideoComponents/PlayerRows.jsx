import React from "react"
import '../../styles/Video.css'
import FaceIcon from '@material-ui/icons/Face';
// import { purple500, purple600, purple700, 
//   purple800, purple900} from '@material-ui/core/colors'
// https://ddragon.leagueoflegends.com/cdn/10.19.1/img/champion/Annie.png
// what does url look like with space in champ name????
// ans: https://ddragon.leagueoflegends.com/cdn/10.19.1/img/champion/TwistedFate.png
// 
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

export default class PlayerRows extends React.Component {
  
  render() {
    return (
      <div class="player-rows">
        {
          P1.map((p, index) => (
            <div class="rows">
              <div class={p.pos}> <FaceIcon className="playerIcons" /> </div>
              <span style={{marginLeft:100+'px',color:'#eeb80f'}}>{p.kda}k</span>
              <span style={{marginLeft:50+'px',color:'#03DAC6'}}>kda</span>
              <span style={{marginLeft:50+'px',color:'#03DAC6'}}>kda</span>
          <span style={{marginLeft:50+'px',color:'#eeb80f'}}>{p.secondKda}k</span>
              <div style={{marginLeft:400+'px',marginTop:-45+'px',color:'#c158dc'}} > <FaceIcon className="playerIcons" /> </div>
              <div class="playername"> 
                 <p> {p.name} </p>
              </div>
              <div style={{marginLeft:390+'px',marginTop:-15+'px'}} class="playername"> 
                 <p> {p.second} </p>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}
