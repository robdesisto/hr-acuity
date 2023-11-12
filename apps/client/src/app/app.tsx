import { CircularProgress, CssBaseline, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useMemo } from 'react';

import { useAuth } from '@hr-acuity/ui/auth';
import { Http } from '@hr-acuity/ui/http';

import { getToken } from '../utils';
import { Account } from './account';
import { Authenticated } from './authenticated';

export function App() {
  const darkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode],
  );

  const { loading, user, logout } = useAuth();

  useEffect(() => {
    Http.init(getToken, logout);
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {
        loading ? <CircularProgress /> : user ? <Authenticated /> : <Account />
      }
    </ThemeProvider>
  );
}
