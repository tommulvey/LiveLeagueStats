// In this file, we create a React component which contains components provided by Material-UI.
import React, {Component} from 'react'
import styled, {injectGlobal} from 'styled-components'
import { useTheme, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {deepOrange500} from 'material-ui/styles/colors'
import { red } from '@material-ui/core/colors'
import RaisedButton from 'material-ui/RaisedButton'; // add
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import baseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import * as Colors from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator'
import Video from './components/Video'
import HeaderMain from './components/HeaderMain'
import { DarkRawTheme } from 'material-ui/styles';

import './styles/Main.css'


injectGlobal`
  h1, h2 {
  font-family: 'Roboto', sans-serif;
  }
`

const Div = styled.div`
  padding-top: 2px;
`

interface PaletteColor {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
}

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#26292C',
      light: 'rgb(81, 91, 95)',
      dark: 'rgb(26, 35, 39)',
      contrastText: '#ffffff',
    },
    secondary: {
    main: '#FFB74D',
      light: 'rgb(255, 197, 112)',
      dark: 'rgb(200, 147, 89)',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    titleBar: {
      main: '#555555',
      contrastText: '#ffffff',
    },
    error: {
      main: red.A400,
	},
	background: {
		paper: '#121212', 
		default: '#121212'
	}
  },
})

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
	  main: '#ff4400'
	  // dark: pallete.primary.main
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
	},
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

export default class Main extends Component {
  constructor(properties) {
    super(properties)
	console.log('constructah')
    this.theme = darkTheme

    this.state = {
      open: false
	}
	
	console.log('yo ', darkTheme)
  }

  handleRequestClose = () => this.setState({
    open: false
  })

  handleClick = () => this.setState({
    open: true
  })

  render = () => {
	return(
	  <ThemeProvider theme={darkBaseTheme} >
        <HeaderMain />
        <Video />
      </ThemeProvider>
	)
  }
    
}
