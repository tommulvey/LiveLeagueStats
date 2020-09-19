import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
const paperStyle = {
  height: '85%',
  width: '85%',
  margin: '7%',
  textAlign: 'center',
  display: 'inline-block'
};

export default class HeaderMain extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      show: null
    }
  }
  handleToggle = () => this.setState({ open: !this.state.open });

  showBar = () => {
    this.setState({ show: 'bar', open: false });
  };

  showFoo = () => {
    this.setState({ show: 'foo', open: false });
  };


  render() {
    let content = null;

    switch (this.state.show) {
      case 'foo':
        content = <h1> foo </h1>;
        break;

      case 'bar':
        content = <h1> bar </h1>;
        break;

      default:
        content = <h1>Waiting</h1>;
    }

    return (
      <div className="App">
        <h1> Live League Stats </h1>
        {/* <AppBar
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          title="Live League Stats"
          onLeftIconButtonClick={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
        <AppBar title="AppBar" />
          <MenuItem id="showFooId" onClick={this.showFoo}>
            Show Foo
          </MenuItem>
          <MenuItem id="showBarId" onClick={this.showBar}>
            Show Bar
          </MenuItem>
        </Drawer>
        <Paper style={paperStyle} zDepth={5}>
          <Toolbar style={{ justifyContent: 'center' }}>
              <ToolbarTitle text="Material UI" />
          </Toolbar>
          {content}
          <p>
            Click the icon on the AppBar to open the Drawer and then
            pick a menu item. The text above should change.
          </p>
        </Paper> */}
      </div>
    );
  }
}
