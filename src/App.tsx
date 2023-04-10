import { ThemeProvider } from 'styled-components';

import { defaultTheme } from '@styles/themes/default';

export default function App() {
  return <ThemeProvider theme={defaultTheme}></ThemeProvider>;
}
