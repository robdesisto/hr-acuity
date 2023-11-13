import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PropsWithChildren } from 'react';

export function TestingProviders({ children }: PropsWithChildren) {
  const theme = createTheme({
    palette: {
      mode: 'light'
    },
  })

  return (
    <ThemeProvider theme={theme}>
      { children }
    </ThemeProvider>
  );
}
