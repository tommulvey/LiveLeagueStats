import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function Schedule(setGameId) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  // const [gameId, setGameId] = React.useState("104174992730350841")
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };


  const handleClose = (event) => {
    // console.log('event is :', event)
    // setGameId(event.target.value)
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    // console.log('id is :', gameId)
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Choose a Game
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose} value="104174992730350841">104174992730350841</MenuItem>
                    <MenuItem onClick={handleClose} value="104174992730350842">104174992730350842</MenuItem>
                    <MenuItem onClick={handleClose} value="104174992730350843">104174992730350843</MenuItem>
                    <MenuItem onClick={handleClose} value="104174992730350844">104174992730350844</MenuItem>
                    <MenuItem onClick={handleClose} value="104174992730350845">104174992730350845</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}

// export const Schedule = ({props}) => {

//   return (
//     <h3> Schedule Page. </h3>
//   )
  
// }

// Schedule.propTypes = {
//   gameId: PropTypes.string,
//   setGameId: PropTypes.function
// }

// export default Schedule