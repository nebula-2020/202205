import { createTheme } from '@material-ui/core/styles';

const themeLight = createTheme({
  palette: {
    type: 'light',
    mode: 'light',
    primary: {
      main: '#9966ff',
      light: '#bc99ff',
      dark: '#7733ff',
      contrastText: '#fff8f0',
    },
    secondary: {
      main: '#ffbb00',
      light: '#ffdd00',
      dark: '#ff9900',
    },
    invert: {
      main: '#212121',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8f8f8',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(34,17,0,0.85)',
      secondary: 'rgba(34,17,0,0.75)',
      disabled: 'rgba(32,24,0,0.35)',
      hint: 'rgba(32,24,0,0.35)',
    },
    error: {
      main: '#ff3333',
      dark: '#e60000',
      light: '#ff8080',
      contrastText: '#eeffff',
    },
    divider: 'rgba(34,17,0,0.12)',
    warning: {
      main: '#ff33cc',
      light: '#ff80df',
      dark: '#e600ac',
      contrastText: '#e5ffe5',
    },
    info: {
      main: '#33a0ff',
      light: '#80c3ff',
      dark: '#007ae5',
      contrastText: '#fff5e5',
    },
    success: {
      main: '#66cccc',
      light: '#9fdfdf',
      dark: '#39acac',
      contrastText: '#ffe5e5',
    },
  },
  shape: {
    borderRadius: 6,
  },
});
const themeDark = createTheme({
  palette: {
    type: 'dark',
    mode: 'dark',
    primary: {
      main: '#9966ff',
      light: '#bc99ff',
      dark: '#7733ff',
      contrastText: '#fff8f0',
    },
    secondary: {
      main: '#ffbb00',
      light: '#ffdd00',
      dark: '#ff9900',
    },
    invert: {
      main: '#f8f8f8',
      contrastText: '#000000',
    },
    background: {
      default: '#212121',
      paper: '#424242',
    },
    text: {
      primary: 'rgba(255,255,224,0.85)',
      secondary: 'rgba(255,255,224,0.75)',
      disabled: 'rgba(255,255,224,0.35)',
      hint: 'rgba(255,255,224,0.35)',
    },
    error: {
      main: '#ff3333',
      dark: '#e60000',
      light: '#ff8080',
      contrastText: '#eeffff',
    },
    warning: {
      main: '#ff33cc',
      light: '#ff80df',
      dark: '#e600ac',
      contrastText: '#e5ffe5',
    },
    info: {
      main: '#33a0ff',
      light: '#80c3ff',
      dark: '#007ae5',
      contrastText: '#fff5e5',
    },
    success: {
      main: '#66cccc',
      light: '#9fdfdf',
      dark: '#39acac',
      contrastText: '#ffe5e5',
    },
  },
  shape: {
    borderRadius: 6,
  },
})
const theme = { light: themeLight, dark: themeDark };
export default theme;
