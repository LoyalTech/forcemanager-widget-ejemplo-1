import { createMuiTheme } from '@material-ui/core';

const materialTheme = createMuiTheme({
  overrides: {
    MuiFormControl: {
      root: {
        height: 30,
        width: 120,
      },
    },
    MuiIconButton: {
      root: {
        padding: 5,
      },
    },
    MuiSvgIcon: {
      root: {
        width: 12,
        height: 12,
      },
    },
    MuiSwitch: {
      colorPrimary: {
        '&.Mui-disabled.Mui-checked': {
          color: '#fec27a',
        },
        '&.Mui-checked + .MuiSwitch-track': {
          backgroundColor: '#FF8C00',
        },
      },
    },
    MuiInputBase: {
      root: {
        color: '#788590',
      },
    },
    MuiInput: {
      underline: {
        '&:before': {
          borderBottom: '1px solid #dce3eb',
        },
        '&:hover:not(.Mui-disabled):before': {
          borderBottom: '1px solid #dce3eb',
        },
        '&.Mui-disabled:before': {
          borderBottomStyle: 'solid',
          borderColor: '#e1e1e1',
        },
        '&:after': {
          borderBottom: '1px solid #FF8C00',
        },
      },
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  palette: {
    primary: {
      light: '#FF8C00',
      main: '#FF8C00',
      dark: '#FF8C00',
    },
  },
  typography: {
    useNextVariants: true,
    fontSize: 11,
    fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
  },
});

export default materialTheme;
