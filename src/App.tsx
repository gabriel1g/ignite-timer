import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import { PomodoroContextProvider } from '@contexts/PomodoroContext';
import { Router } from '@routes/Router';
import { GlobalStyle } from '@styles/global';
import { defaultTheme } from '@styles/themes/default';

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <PomodoroContextProvider>
          <Router />
        </PomodoroContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
