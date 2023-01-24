import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const skyTheme = createTheme({
  palette: {
    primary: {
      main: '#22b8cf',
    },
    secondary: {
      main: '#543884',
    },
    error: {
      main: red.A700,
    },
  },
});
