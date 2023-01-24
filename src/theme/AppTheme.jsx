import { CssBaseline, ThemeProvider } from '@mui/material';
import { skyTheme } from './';

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={skyTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
