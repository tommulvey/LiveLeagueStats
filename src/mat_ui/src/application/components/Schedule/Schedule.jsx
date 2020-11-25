import React from "react";
import LOLEvents from "./ScheduleComponents/LOLEvents"

export const SchedulePage = ({setView}) => {

    return(
      // <LOLEvents setGameId={setGameId} setView={setView} />
      <LOLEvents setView={setView} />
    )

}

export default SchedulePage;
