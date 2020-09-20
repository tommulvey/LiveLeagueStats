import React from "react"
import '../../styles/Video.css'
import FaceIcon from '@material-ui/icons/Face';
// import { purple500, purple600, purple700, 
//   purple800, purple900} from '@material-ui/core/colors'

const P1 = [ // players from team 1 (blu)
  { name: 'Solo', pos:'top' },
  { name: 'Santorin', pos:'jg' },
  { name: 'PowerOfEvil', pos:'mid' },
  { name: 'WildTurtle', pos:'bot' },
  { name: 'Ignar', pos:'sup' }
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
              <div class="playername"> <p> {p.name} </p> </div>
            </div>
          ))
        }
      </div>
    )
  }
}
