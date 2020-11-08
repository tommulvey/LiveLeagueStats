import React, { useState } from "react"
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

const P2 = [ // players from team 2 (red/purpl)
  { name: 'Broken Blade', pos:'top' },
  { name: 'Spica', pos:'jg' },
  { name: 'Bjergsen', pos:'mid' },
  { name: 'Doublelift', pos:'bot' },
  { name: 'BioFrost', pos:'sup' }
]

const ROWS = [ 
  [P1['top'], P2['top']], 
  [P1['jg'],  P2['jg']], 
  [P1['mid'], P2['mid']], 
  [P1['bot'], P2['bot']], 
  [P1['sup'], P2['sup']], 
];

export const PlayerRows = () => {
  const [playerData, setPlayerData] = useState(ROWS)

  return (
    <div className="player-rows">
      {/* {
        P1.map((p, index) => (
          <div className="rows">
            <div className={p.pos}> <FaceIcon className="playerIcons" /> </div>
            <div className="playername"> <p> {p.name} </p> </div>
          </div>
        ))
      } */
        // idea is 5 rows, 2 players per row. same pos on same row
        playerData.map((players, index) => {
          return (
            <div className="rows">
              <p> yo </p>
            </div>
        )})
      }
    </div>
  )
}

export default PlayerRows;
